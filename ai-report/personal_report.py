# personal_report.py
import os, argparse, json, math
from datetime import date, datetime
import psycopg
from psycopg.rows import dict_row
from jinja2 import Template
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

DB_URL = (
    f"host={os.getenv('DB_HOST','localhost')} "
    f"port={os.getenv('DB_PORT','')} "
    f"dbname={os.getenv('DB_NAME','students')} "
    f"user={os.getenv('DB_USER','postgres')} "
    f"password={os.getenv('DB_PASSWORD','')}"
)

MODEL = os.getenv("MODEL", "gpt-5")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# ---------------- UI Template ----------------
HTML_TPL = Template(r"""
<!doctype html><html lang="ko"><meta charset="utf-8">
<title>{{ title }}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
:root{--muted:#6b7280;--chip:#eef2ff;--chip2:#f1f5f9;--good:#16a34a;--warn:#f59e0b;--bad:#dc2626;}
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;margin:24px;line-height:1.55;color:#111827}
h1{font-size:26px;margin:0 0 10px}
h2{font-size:18px;margin:18px 0 8px}
.kpis{display:flex;gap:12px;flex-wrap:wrap;margin:12px 0}
.kpi{min-width:120px;padding:12px 14px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.kpi .v{font-weight:700}
.small{color:var(--muted);font-size:12px}
table{border-collapse:collapse;width:100%;margin:8px 0;background:#fff}
td,th{border:1px solid #e5e7eb;padding:10px;text-align:center}
.badge{display:inline-block;padding:2px 10px;border-radius:999px;background:var(--chip);font-weight:600}
.summary{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.card{border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#fff}
.list{margin:0;padding-left:18px}
.list li{margin:4px 0}
.pill{display:inline-block;padding:2px 8px;border-radius:999px;background:var(--chip2);font-size:12px}
.pill.good{background:#ecfdf5;color:var(--good);font-weight:700}
.pill.mid{background:#fefce8;color:var(--warn);font-weight:700}
.pill.bad{background:#fef2f2;color:var(--bad);font-weight:700}
.kv{display:flex;gap:8px;align-items:center;justify-content:space-between;border-top:1px dashed #e5e7eb;padding:8px 0}
.kv:first-child{border-top:0}
.mono{font-variant-numeric:tabular-nums}
</style>
<body>
<h1>{{ title }}</h1>
<div class="small">생성일: {{ today }}</div>

<div class="kpis">
  <div class="kpi"><div>이름</div><div class="v">{{ d.name }}</div></div>
  <div class="kpi"><div>나이</div><div class="v">{{ d.age }}세</div></div>
  <div class="kpi"><div>훈련 날짜</div><div class="v mono">{{ d.training_date }}</div></div>
  <div class="kpi"><div>난이도</div><div class="v"><span class="badge">{{ d.difficulty }}</span></div></div>
</div>

<h2>시나리오 세부내용</h2>
<p>
  위치: <b>{{ d.loc }}</b> /
  요인: <b>{{ d.factor }}</b> /
  원인: <b>{{ d.cause }}</b>
</p>

<h2>핵심 지표</h2>
<table>
  <tr>
    <th></th>
    <th>해당 학생</th>
    <th>동일 난이도 평균(타 사용자)</th>
  </tr>
  <tr>
    <td>시나리오 완료 소요 시간</td>
    <td class="mono">{{ d.student_time_hm }}</td>
    <td class="mono">{{ d.others_time_hm }}</td>
  </tr>
  <tr>
    <td>퀴즈 정답률</td>
    <td class="mono">{{ "%.2f%%"|format(d.quiz_accuracy) }}</td>
    <td class="mono">{{ d.others_quiz_pct_str }}</td>
  </tr>
</table>

<h2>요약</h2>
<div class="summary">
  <div class="card">
    <div class="kv"><div>완료 시간 비교</div><div class="pill {{ cmp.speed_class }}">{{ cmp.speed_label }}</div></div>
    <div class="kv"><div>정답률 비교</div><div class="pill {{ cmp.acc_class }}">{{ cmp.acc_label }}</div></div>
    <div class="kv"><div>시간 차이</div><div class="mono">{{ cmp.delta_time }}</div></div>
    <div class="kv"><div>정답률 차이</div><div class="mono">{{ cmp.delta_acc }}</div></div>
  </div>
  <div class="card">
    <ul class="list">
      {% for it in insights %}
        <li>{{ it }}</li>
      {% endfor %}
    </ul>
  </div>
</div>

{% if llm_html %}
<h2 style="margin-top:16px">세부 분석 & 인사이트</h2>
<div>{{ llm_html|safe }}</div>
{% endif %}

</body></html>
""")


# ---------------- System Prompt ----------------
SYSTEM_PROMPT = """당신은 '화재 대피 훈련 개인 리포트 전문가'입니다.
목표: 제공된 확정 데이터만으로 **아주 간결한 요약**을 생성합니다.
금지: 새로운 수치/추정 생성, 장문 서술, 불필요한 접속사.  
허용: 짧은 구, 키-값 라벨, 불릿 목록.

[스타일 규칙]
- 전보체/키워드 위주. 문장 종결어 최소화.
- 각 항목은 최대 1줄. 불릿은 항목당 최대 12단어(또는 30자 내).
- 시간은 제공된 ‘O분 O초’ 표현 그대로 사용. (초 변환 금지)
- 평균 값이 없으면 ‘기록 부족’ 또는 ‘비교 불가’ 명시.
- 비교 표현은 ‘빠름/보통/느림’, ‘높음/유사/낮음’ 중 선택.

[필수 포함 항목]
1) 이름
2) 나이
3) 훈련 날짜
4) 시나리오 세부내용(위치·요인·원인)
5) 시나리오 난이도(상/중/하)
6) 시나리오 완료 소요 시간(예: 4분 20초)
7) 동일 난이도 타 사용자 평균 완료 시간(예: 5분 10초)
8) 퀴즈 정답률(0~100%)
9) 동일 난이도 타 사용자 평균 정답률(0~100%)
10) 요약/인사이트(시나리오 난이도·완료 소요 시간·퀴즈 정답률 기반, 3~4개의 짧은 불릿)

[비교 로직]
- 완료 시간: 학생_완료_시간_초 vs 타평균_완료_시간_초
  - 학생 ≤ 평균×0.95 → ‘빠름’
  - 평균×0.95 < 학생 < 평균×1.05 → ‘보통’
  - 학생 ≥ 평균×1.05 → ‘느림’
  - 평균 없음 → ‘비교 불가’
- 정답률: 학생_정답률 vs 타평균_정답률
  - 학생 ≥ 평균+3 → ‘높음’
  - |학생-평균| < 3 → ‘유사’
  - 학생 ≤ 평균-3 → ‘낮음’
  - 평균 없음 → ‘비교 불가’

[데이터 제약]
- 제공된 키만 사용. 수치 가공/추정 금지.
- 값이 NULL/미제공이면 해당 자리 ‘기록 부족’ 표기.
"""

MODEL_COMMENT_PROMPT = """당신은 '화재 대피 훈련 데이터 해석가'입니다.
목표: 제공된 통계 요약(라벨과 차이값)을 근거로 '세부 분석 & 인사이트'를 간결하고 전문적으로 제시합니다.

규칙
- 제공된 값만 사용. 새로운 수치/추정/재계산 금지.
- 이미 화면에 나온 원자료(이름/날짜/원시 수치) 반복 금지.
- 1줄=1인사이트. 불필요한 수식어 최소화.
- 평균 데이터가 없으면 해당 항목은 '데이터 부족/비교 불가' 맥락만 간단히 언급.

출력 형식(HTML 조각만):
<div class="analysis">
  <ul>
    <li><b>속도</b>: 평균 대비 {{빠름/보통/느림|비교 불가}} {{(+Δt 또는 '데이터 부족')}} → 해석 1줄</li>
    <li><b>정답률</b>: 평균 대비 {{높음/유사/낮음|비교 불가}} {{(+Δp 또는 '데이터 부족')}} → 해석 1줄</li>
    <li><b>본인 평균 대비</b>: 속도 {{빠름/보통/느림|비교 불가}} {{(+Δself_t)}}, 정답률 {{높음/유사/낮음|비교 불가}} {{(+Δself_p)}} → 해석 1줄</li>
    <li><b>난이도 강약</b>: 속도 강점={{강점_난이도_속도}}/약점={{약점_난이도_속도}}, 정답률 강점={{강점_난이도_정답률}}/약점={{약점_난이도_정답률}} → 코칭 포인트 1줄</li>
    <li><b>리스크</b>: 데이터 부족/속도 지연/정답률 저하 중 해당 시 1줄</li>
    <li><b>권장 액션</b>: 2~3개, 콤마 구분(예: 오답 복습, 느린 구간 재현, 동일 난이도 1회 추가)</li>
  </ul>
</div>
"""


# ---------------- SQL ----------------
SQL_BY_SESSION = """
/* 세션ID로 단일 리포트 데이터 수집 + (사용자 전체 평균, 개인 난이도별 평균) */
WITH s AS (
  SELECT se.session_id,
         se.completed_date,
         se.completion_sec,
         se.quiz_accuracy,
         bp.blueprint_id,
         bp.user_id,
         bp."난이도"        AS difficulty,
         bp."위치"          AS loc,
         bp."화재요인"      AS factor,
         bp."원인"          AS cause
  FROM sessions se
  JOIN scenario_blueprints_kor bp ON bp.blueprint_id = se.blueprint_id
  WHERE se.session_id = %(session_id)s
),
u AS (
  SELECT u.user_id, u.name, u.date_of_birth
  FROM users u
  JOIN s ON s.user_id = u.user_id
),
-- 동일 난이도 다른 사용자들 평균
others AS (
  SELECT
    AVG(se2.completion_sec)::numeric(10,2) AS others_avg_time_sec,
    AVG(se2.quiz_accuracy)::numeric(10,2)  AS others_avg_quiz
  FROM sessions se2
  JOIN scenario_blueprints_kor bp2 ON bp2.blueprint_id = se2.blueprint_id
  JOIN s ON TRUE
  WHERE bp2."난이도" = s.difficulty
    AND bp2.user_id <> s.user_id
),
-- (추가) 이 사용자 전체 평균(모든 난이도)
user_overall AS (
  SELECT
    AVG(se2.completion_sec)::numeric(10,2) AS user_overall_avg_time,
    AVG(se2.quiz_accuracy)::numeric(10,2)  AS user_overall_avg_quiz
  FROM sessions se2
  JOIN scenario_blueprints_kor bp2 ON bp2.blueprint_id = se2.blueprint_id
  JOIN s ON TRUE
  WHERE bp2.user_id = s.user_id
),
-- 난이도별 전반 집계(모든 사용자, 인사이트용)
difficulty_stats AS (
  SELECT bp2."난이도" AS difficulty,
         AVG(se2.completion_sec)::numeric(10,2) AS avg_time_sec,
         AVG(se2.quiz_accuracy)::numeric(10,2)  AS avg_quiz
  FROM sessions se2
  JOIN scenario_blueprints_kor bp2 ON bp2.blueprint_id = se2.blueprint_id
  GROUP BY bp2."난이도"
),
-- (추가) 개인 난이도별 평균(상/중/하에서 본인 평균)
user_diff_avgs AS (
  SELECT bp2."난이도" AS difficulty,
         AVG(se2.completion_sec)::numeric(10,2) AS avg_time_sec,
         AVG(se2.quiz_accuracy)::numeric(10,2)  AS avg_quiz
  FROM sessions se2
  JOIN scenario_blueprints_kor bp2 ON bp2.blueprint_id = se2.blueprint_id
  JOIN s ON TRUE
  WHERE bp2.user_id = s.user_id
  GROUP BY bp2."난이도"
)
SELECT
  u.name,
  DATE_PART('year', age(current_date, u.date_of_birth))::int AS age,
  s.completed_date AS training_date,
  s.loc, s.factor, s.cause, s.difficulty,
  s.completion_sec     AS student_time_sec,
  s.quiz_accuracy      AS student_quiz_pct,
  o.others_avg_time_sec,
  o.others_avg_quiz,
  -- 모든 사용자 난이도별 집계(JSON)
  (SELECT json_agg(json_build_object(
      'difficulty', d.difficulty,
      'avg_time_sec', d.avg_time_sec,
      'avg_quiz', d.avg_quiz
  ) ORDER BY d.difficulty)
   FROM difficulty_stats d) AS difficulty_stats_json,
  -- (추가) 사용자 전체 평균
  uo.user_overall_avg_time,
  uo.user_overall_avg_quiz,
  -- (추가) 개인 난이도별 평균(JSON)
  (SELECT json_agg(json_build_object(
      'difficulty', d.difficulty,
      'avg_time_sec', d.avg_time_sec,
      'avg_quiz', d.avg_quiz
  ) ORDER BY d.difficulty)
   FROM user_diff_avgs d) AS user_diff_avgs_json
FROM s
JOIN u  ON TRUE
LEFT JOIN others o      ON TRUE
LEFT JOIN user_overall uo ON TRUE
LIMIT 1;
"""


SQL_LATEST_BY_USER_BP = """
/* 특정 사용자×시나리오에서 가장 최근 세션으로 리포트 */
WITH last_se AS (
  SELECT se.*
  FROM sessions se
  WHERE se.blueprint_id = %(blueprint_id)s
  ORDER BY se.completed_date DESC
  LIMIT 1
)
SELECT %(session_id)s AS dummy;  -- 파라미터 강제용(파이썬에서 이 쿼리는 사용 안 함)
"""

# ---------------- Helpers ----------------
def hm(sec):
    if sec is None:
        return "-"
    s = int(round(float(sec)))
    return f"{s//60}분 {s%60}초"

def fetch_by_session(session_id:int):
    with psycopg.connect(DB_URL, row_factory=dict_row) as con:
        cur = con.cursor()
        cur.execute(SQL_BY_SESSION, {"session_id": session_id})
        row = cur.fetchone()
        return row
def compare_speed(student_sec, others_sec):
    if others_sec is None:
        return {"label":"비교 불가","cls":"mid","delta":"-"}
    delta = student_sec - others_sec
    ratio = student_sec / others_sec
    if ratio <= 0.95: label, cls = "빠름", "good"
    elif ratio >= 1.05: label, cls = "느림", "bad"
    else: label, cls = "보통", "mid"
    sign = "+" if delta>0 else ""
    return {"label":label, "cls":cls, "delta":f"{sign}{hm(abs(delta)) if delta!=0 else '±0초'}"}

def compare_acc(student_pct, others_pct):
    if others_pct is None:
        return {"label":"비교 불가","cls":"mid","delta":"-"}
    diff = round(student_pct - others_pct, 2)
    if diff >= 3: label, cls = "높음", "good"
    elif diff <= -3: label, cls = "낮음", "bad"
    else: label, cls = "유사", "mid"
    sign = "+" if diff>0 else ""
    return {"label":label, "cls":cls, "delta":f"{sign}{abs(diff):.2f}p"}

def build_payload(row:dict):
    # LLM으로 넘길 '확정값'만 구성
    difficulty_stats = row.get("difficulty_stats_json") or []
    payload = {
        "학생": {
            "이름": row["name"],
            "나이": int(row["age"]),
            "훈련_날짜": str(row["training_date"])
        },
        "시나리오": {
            "난이도": row["difficulty"],
            "위치": row["loc"],
            "요인": row["factor"],
            "원인": row["cause"],
        },
        "성과": {
            "완료_시간_초": float(row["student_time_sec"]),
            "완료_시간_표현": hm(row["student_time_sec"]),
            "퀴즈_정답률_퍼센트": float(row["student_quiz_pct"])
        },
        "동일_난이도_타사용자_평균": {
            "완료_시간_초": float(row["others_avg_time_sec"]) if row["others_avg_time_sec"] is not None else None,
            "완료_시간_표현": hm(row["others_avg_time_sec"]) if row["others_avg_time_sec"] is not None else None,
            "퀴즈_정답률_퍼센트": float(row["others_avg_quiz"]) if row["others_avg_quiz"] is not None else None
        },
        "difficulty_stats": difficulty_stats
    }
    return payload

def call_llm(analysis_payload: dict) -> str:
    """
    요약 통계(라벨/차이/난이도/평균존재여부)만으로
    '세부 분석 & 인사이트' HTML 조각을 생성.
    키가 없거나 쿼터 초과여도 기본 코멘트 반환.
    """
    if not OPENAI_API_KEY:
        # 키/쿼터 없을 때도 보기 좋은 기본 코멘트
        speed = analysis_payload["속도_라벨"]
        acc   = analysis_payload["정답률_라벨"]
        dt    = analysis_payload["속도_차이표현"]
        dp    = analysis_payload["정답률_차이표현"]
        diff  = analysis_payload["난이도"]
        return (
            "<div class='analysis'><ul>"
            f"<li><b>속도</b>: 평균 대비 {speed} {dt} → 수행 속도 상태</li>"
            f"<li><b>정답률</b>: 평균 대비 {acc} {dp} → 이해도 상태</li>"
            f"<li><b>난이도 맥락</b>: 난이도={diff}에서 위 조합의 의미 해석</li>"
            "<li><b>권장 액션</b>: 오답 복습, 느린 구간 재현, 동일 난이도 1회 추가</li>"
            "</ul></div>"
        )

    client = OpenAI(api_key=OPENAI_API_KEY)
    user = (
        "아래는 개인 리포트용 통계 요약입니다. 원자료를 반복하거나 새로운 수치를 만들지 말고, "
        "이 요약값만으로 세부 분석과 인사이트를 작성하세요.\n"
        + json.dumps(analysis_payload, ensure_ascii=False, indent=2)
    )
    rsp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role":"system","content":MODEL_COMMENT_PROMPT},
            {"role":"user","content":user},
        ]
    )
    return rsp.choices[0].message.content


def main():
    ap = argparse.ArgumentParser(description="개인용 AI 리포트 (세션 기준)")
    ap.add_argument("--session_id", type=int, required=True, help="sessions.session_id")
    ap.add_argument("--outfile", default=None, help="저장 파일명(기본: report_{이름}_{session_id}.html)")
    args = ap.parse_args()

    row = fetch_by_session(args.session_id)
    if not row:
        raise SystemExit(f"[에러] session_id={args.session_id} 데이터를 찾지 못했습니다.")


    # ---------- 화면 표시용 기본 데이터 ----------
    data_for_tpl = {
        "name": row["name"],
        "age": int(row["age"]),
        "training_date": str(row["training_date"]),
        "difficulty": row["difficulty"],
        "loc": row["loc"],
        "factor": row["factor"],
        "cause": row["cause"],
        "student_time_hm": hm(row["student_time_sec"]),
        "others_time_hm": hm(row["others_avg_time_sec"]) if row["others_avg_time_sec"] is not None else "기록 부족",
        "quiz_accuracy": float(row["student_quiz_pct"]),
        "others_quiz_pct_str": f"{float(row['others_avg_quiz']):.2f}%" if row["others_avg_quiz"] is not None else "기록 부족",
    }

    # ---------- 타 사용자 평균 대비(상단 카드) ----------
    speed_cmp = compare_speed(
        student_sec=float(row["student_time_sec"]),
        others_sec=float(row["others_avg_time_sec"]) if row["others_avg_time_sec"] is not None else None
    )
    acc_cmp = compare_acc(
        student_pct=float(row["student_quiz_pct"]),
        others_pct=float(row["others_avg_quiz"]) if row["others_avg_quiz"] is not None else None
    )
    cmp_ctx = {
        "speed_label": speed_cmp["label"],
        "speed_class": speed_cmp["cls"],
        "acc_label":   acc_cmp["label"],
        "acc_class":   acc_cmp["cls"],
        "delta_time":  speed_cmp["delta"],
        "delta_acc":   acc_cmp["delta"],
    }

    # ---------- 본인 전체 평균 대비 ----------
    def _cmp_self_speed(student_sec, self_avg):
        return compare_speed(student_sec, float(self_avg) if self_avg is not None else None)
    def _cmp_self_acc(student_pct, self_avg):
        return compare_acc(student_pct, float(self_avg) if self_avg is not None else None)

    self_speed_cmp = _cmp_self_speed(float(row["student_time_sec"]), row["user_overall_avg_time"])
    self_acc_cmp   = _cmp_self_acc(float(row["student_quiz_pct"]),  row["user_overall_avg_quiz"])

    # ---------- 개인 난이도별 강/약 계산 (여기가 insights보다 먼저!) ----------
    user_diff_avgs = row.get("user_diff_avgs_json") or []
    speed_best = speed_worst = None
    quiz_best  = quiz_worst  = None
    for it in user_diff_avgs:
        d = it.get("difficulty")
        t = it.get("avg_time_sec")
        q = it.get("avg_quiz")
        if t is not None:
            if speed_best is None or float(t) < float(speed_best["avg_time_sec"]):
                speed_best = {"difficulty": d, "avg_time_sec": t}
            if speed_worst is None or float(t) > float(speed_worst["avg_time_sec"]):
                speed_worst = {"difficulty": d, "avg_time_sec": t}
        if q is not None:
            if quiz_best is None or float(q) > float(quiz_best["avg_quiz"]):
                quiz_best = {"difficulty": d, "avg_quiz": q}
            if quiz_worst is None or float(q) < float(quiz_worst["avg_quiz"]):
                quiz_worst = {"difficulty": d, "avg_quiz": q}

    # ---------- 간단 인사이트(중복 최소화) ----------
    insights = [
        f"속도: {speed_cmp['label']} ({data_for_tpl['student_time_hm']} vs {data_for_tpl['others_time_hm']})",
        f"정답률: {acc_cmp['label']} ({data_for_tpl['quiz_accuracy']:.2f}% vs {data_for_tpl['others_quiz_pct_str']})",
    ]
    if row["user_overall_avg_time"] is not None:
        insights.append(f"본인 평균 대비(시간): {self_speed_cmp['label']} ({self_speed_cmp['delta']})")
    if row["user_overall_avg_quiz"] is not None:
        insights.append(f"본인 평균 대비(정답률): {self_acc_cmp['label']} ({self_acc_cmp['delta']})")
    if speed_best and speed_worst:
        insights.append(f"난이도 강약(속도): 강점={speed_best['difficulty']}, 약점={speed_worst['difficulty']}")
    if quiz_best and quiz_worst:
        insights.append(f"난이도 강약(정답률): 강점={quiz_best['difficulty']}, 약점={quiz_worst['difficulty']}")

    # ---------- LLM용 요약 통계 페이로드 ----------
    analysis_payload = {
        "난이도": row["difficulty"],
        "속도_라벨": cmp_ctx["speed_label"],
        "속도_차이표현": cmp_ctx["delta_time"],
        "정답률_라벨": cmp_ctx["acc_label"],
        "정답률_차이표현": cmp_ctx["delta_acc"],
        "평균_시간_존재": (row["others_avg_time_sec"] is not None),
        "평균_정답률_존재": (row["others_avg_quiz"] is not None),

        "자기평균_속도_라벨": self_speed_cmp["label"],
        "자기평균_속도_차이표현": self_speed_cmp["delta"],
        "자기평균_정답률_라벨": self_acc_cmp["label"],
        "자기평균_정답률_차이표현": self_acc_cmp["delta"],

        "개인_난이도별_평균": user_diff_avgs,
        "강점_난이도_속도": speed_best["difficulty"] if speed_best else None,
        "약점_난이도_속도": speed_worst["difficulty"] if speed_worst else None,
        "강점_난이도_정답률": quiz_best["difficulty"] if quiz_best else None,
        "약점_난이도_정답률": quiz_worst["difficulty"] if quiz_worst else None,
    }

    # ---------- LLM 호출 & 렌더 ----------
    llm_html = call_llm(analysis_payload)

    html = HTML_TPL.render(
        title=f"개인 리포트 (세션 {args.session_id}) - {row['name']}",
        today=str(date.today()),
        d=data_for_tpl,
        cmp=cmp_ctx,
        insights=insights,
        llm_html=llm_html
    )



    out = args.outfile or f"report_{row['name']}_{args.session_id}.html"
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[OK] 생성: {out}")

if __name__ == "__main__":
    main()
