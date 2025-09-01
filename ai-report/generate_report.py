import os, math, argparse, statistics, json
from datetime import date
from jinja2 import Template
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from openai import OpenAI

load_dotenv()

DB_CFG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "")),
    "dbname": os.getenv("DB_NAME", "trainingdb"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", ""),
}

MODEL = os.getenv("MODEL", "gpt-5-mini")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

HTML_SHELL = Template(r"""
<!doctype html><html lang="ko"><meta charset="utf-8">
<title>{{ title }}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial; margin:24px; line-height:1.5}
h1{font-size:26px;margin:0 0 16px}
h2{font-size:18px;margin:20px 0 8px}
.kpis{display:flex;gap:12px;flex-wrap:wrap;margin:12px 0}
.kpi{padding:12px 14px;border:1px solid #eee;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.kpi .v{font-weight:700;font-size:18px}
table{border-collapse:collapse;width:100%;margin:8px 0}
td,th{border:1px solid #eee;padding:8px;text-align:center;font-size:14px}
.small{color:#666;font-size:12px}
</style>
<body>
<h1>{{ title }}</h1>
<div class="small">기간: {{ period }}, 생성일: {{ today }}</div>

<div class="kpis">
  <div class="kpi"><div>학생 수</div><div class="v">{{ kpi.total_students }}</div></div>
  <div class="kpi"><div>평균 소요시간</div><div class="v">{{ kpi.avg_time_hm }}</div></div>
  <div class="kpi"><div>평균 정답률</div><div class="v">{{ "%.2f%%"|format(kpi.avg_quiz*100) }}</div></div>
  <div class="kpi"><div>평균 완료 시나리오</div><div class="v">{{ "%.1f"|format(kpi.avg_completed) }}</div></div>
</div>

<h2>요약/인사이트</h2>
<div>{{ llm_html|safe }}</div>

<h2>상위 5명 (정답률)</h2>
<table>
  <tr><th>이름</th><th>나이</th><th>최근 훈련일</th><th>소요시간</th><th>정답률</th><th>완료 수</th></tr>
  {% for r in top5 %}
  <tr>
    <td>{{ r.name }}</td><td>{{ r.age }}</td><td>{{ r.last_training_date }}</td>
    <td>{{ r.hm }}</td><td>{{ "%.2f%%"|format(r.quiz_accuracy*100) }}</td><td>{{ r.completed_scenarios }}</td>
  </tr>
  {% endfor %}
</table>

<h2>하위 5명 (정답률)</h2>
<table>
  <tr><th>이름</th><th>나이</th><th>최근 훈련일</th><th>소요시간</th><th>정답률</th><th>완료 수</th></tr>
  {% for r in bottom5 %}
  <tr>
    <td>{{ r.name }}</td><td>{{ r.age }}</td><td>{{ r.last_training_date }}</td>
    <td>{{ r.hm }}</td><td>{{ "%.2f%%"|format(r.quiz_accuracy*100) }}</td><td>{{ r.completed_scenarios }}</td>
  </tr>
  {% endfor %}
</table>

</body></html>
""")

SYSTEM = """당신은 데이터 리포트 작성 보조자입니다.
규칙:
- 제공된 수치만 사용하세요. 임의의 수치/계산을 만들지 마세요.
- 간결한 한국어로 씁니다.
- 구조: 1) 핵심 요약(한 단락) 2) 관찰된 인사이트 3) 리스크/주의 4) 다음 액션 3가지.
- 시간은 사람이 읽기 쉬운 단위(분/초)로, 이미 변환된 텍스트가 있으면 그대로 사용하세요.
"""

def hm(sec: int|float|None):
    if sec is None: return "-"
    s = int(round(sec))
    m = s//60; ss = s%60
    return f"{m}분 {ss}초"

def fetch_data():
    with psycopg.connect(row_factory=dict_row, **DB_CFG) as con:
        cur = con.cursor()
        cur.execute("SELECT * FROM training_reports ORDER BY id;")
        rows = cur.fetchall()
    # 전처리
    for r in rows:
        # 숫자 스케일 (quiz_accuracy가 0~100 형식이면 0~1로 변환)
        if r["quiz_accuracy"] is not None and r["quiz_accuracy"] > 1.0:
            r["quiz_accuracy"] = float(r["quiz_accuracy"])/100.0
        r["hm"] = hm(r["scenario_time_sec"])
    return rows

def summarise(rows):
    if not rows:
        return {
            "total_students": 0,
            "avg_time": 0,
            "avg_quiz": 0,
            "avg_completed": 0,
        }
    avg_time = statistics.fmean([r["scenario_time_sec"] for r in rows if r["scenario_time_sec"] is not None])
    avg_quiz = statistics.fmean([r["quiz_accuracy"] for r in rows if r["quiz_accuracy"] is not None])
    avg_completed = statistics.fmean([r["completed_scenarios"] for r in rows])
    return {
        "total_students": len(rows),
        "avg_time": avg_time,
        "avg_time_hm": hm(avg_time),
        "avg_quiz": avg_quiz,
        "avg_completed": avg_completed,
    }

def call_llm(payload: dict) -> str:
    """payload를 바탕으로 요약/인사이트 HTML(짧은 문단들) 생성"""
    if not OPENAI_API_KEY:
        # API키 없으면 템플릿 문구로 대체
        return (
            "<p><b>샘플 요약:</b> 전반적으로 평균 정답률이 안정적이며, "
            "소요시간은 연령대에 따라 차이가 있습니다. 하위 그룹을 대상으로 복습 퀴즈를 제안합니다.</p>"
            "<ul><li>인사이트: 상위권은 완료 시나리오 수도 높음</li>"
            "<li>리스크: 최근 훈련일이 오래된 학생이 일부 존재</li>"
            "<li>다음 액션: ① 하위 20% 대상 보충 학습 ② 2주 내 리마인드 ③ 느린 시나리오 튜토리얼 제공</li></ul>"
        )
    client = OpenAI(api_key=OPENAI_API_KEY)
    user = (
        "다음은 확정된 집계값입니다. 숫자를 새로 만들지 말고 제공된 텍스트만 근거로 요약/인사이트를 작성하세요.\n"
        + json.dumps(payload, ensure_ascii=False, indent=2)
    )
    rsp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role":"system","content":SYSTEM},
            {"role":"user","content":user}
        ],
        temperature=0.2,
    )
    return rsp.choices[0].message.content

def build_payload(rows, kpi, top5, bottom5):
    # LLM에 줄 최소 사실 집합(숫자만)
    return {
        "기간": "최근 2주 (데모)",
        "학생수": kpi["total_students"],
        "평균_소요시간_초": round(kpi["avg_time"], 2) if kpi["total_students"] else 0,
        "평균_정답률_0to1": round(kpi["avg_quiz"], 4) if kpi["total_students"] else 0,
        "평균_완료시나리오": round(kpi["avg_completed"], 2) if kpi["total_students"] else 0,
        "상위5_정답률": [
            {"이름": r["name"], "정답률": round(r["quiz_accuracy"], 4), "소요시간": r["scenario_time_sec"], "완료": r["completed_scenarios"]}
            for r in top5
        ],
        "하위5_정답률": [
            {"이름": r["name"], "정답률": round(r["quiz_accuracy"], 4), "소요시간": r["scenario_time_sec"], "완료": r["completed_scenarios"]}
            for r in bottom5
        ],
    }

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--outfile", default="report.html")
    parser.add_argument("--period", default="데모용 (전체)")
    args = parser.parse_args()

    rows = fetch_data()
    kpi = summarise(rows)
    # 정답률 기준 Top/Bottom 5
    rows_valid = [r for r in rows if r["quiz_accuracy"] is not None]
    top5 = sorted(rows_valid, key=lambda r: r["quiz_accuracy"], reverse=True)[:5]
    bottom5 = sorted(rows_valid, key=lambda r: r["quiz_accuracy"])[:5]

    payload = build_payload(rows, kpi, top5, bottom5)
    llm_html = call_llm(payload)

    html = HTML_SHELL.render(
        title="AI 훈련 리포트",
        period=args.period,
        today=str(date.today()),
        kpi={
            **kpi,
            "avg_time_hm": kpi.get("avg_time_hm", "-"),
            "avg_quiz": kpi.get("avg_quiz", 0.0),
            "avg_completed": kpi.get("avg_completed", 0.0),
            "total_students": kpi.get("total_students", 0),
        },
        top5=top5,
        bottom5=bottom5,
        llm_html=llm_html,
    )
    with open(args.outfile, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[OK] 리포트 생성: {args.outfile}")

if __name__ == "__main__":
    main()
