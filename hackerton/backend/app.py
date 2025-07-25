from flask import Flask, request, jsonify, send_from_directory
import os
import uuid
import subprocess
import traceback

app = Flask(__name__, static_url_path='/uploads', static_folder='uploads')
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')  # ✅ backend/uploads 경로
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_and_process():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "파일이 업로드되지 않았습니다."}), 400

    # 1. 세션 디렉토리 생성
    session_id = str(uuid.uuid4())
    session_path = os.path.join("backend", "uploads", session_id)
    frame_dir = os.path.join(session_path, "frames")
    result_dir = os.path.join(session_path, "result")
    os.makedirs(frame_dir, exist_ok=True)
    os.makedirs(result_dir, exist_ok=True)

    # 2. 파일 저장
    video_path = os.path.join(session_path, file.filename)
    file.save(video_path)
    print(f"[UPLOAD] 저장된 비디오 경로: {video_path}")

    # 3. 환경변수 설정
    stitched_path = os.path.abspath(os.path.join(result_dir, "result_image.jpg"))
    equi_path = stitched_path.replace("result_image.jpg", "result_equi.jpg")
    frame_dir_abs = os.path.abspath(frame_dir)
    yolo_out = os.path.abspath(os.path.join(result_dir, "yolo_output"))

    os.environ["PIPELINE_INPUT_VIDEO"] = os.path.abspath(video_path)
    os.environ["PIPELINE_FRAME_DIR"] = frame_dir_abs
    os.environ["PIPELINE_STITCH_RESULT"] = stitched_path
    os.environ["PIPELINE_EQUI_RESULT"] = equi_path
    os.environ["YOLO_MODEL_PATH"] = os.path.abspath("backend/best_250723.pt")
    os.environ["YOLO_OUTPUT_DIR"] = yolo_out
    os.environ["FRAME_INTERVAL"] = "30"

    # 4. 파이프라인 실행
    try:
        base_dir = os.path.dirname(__file__)
        pipeline_path = os.path.join(base_dir, "run_pipeline.py")
        print(f"[RUN] 파이프라인 실행: {pipeline_path}")
        result = subprocess.run(
            ['python', pipeline_path],
            capture_output=True, text=True, check=True
        )
        print("[PIPELINE] 성공\n", result.stdout)
    except subprocess.CalledProcessError as e:
        print("❌ 파이프라인 실패:")
        print("stdout:\n", e.stdout)
        print("stderr:\n", e.stderr)
        return jsonify({
            "error": "파이프라인 실패",
            "stdout": e.stdout,
            "stderr": e.stderr
        }), 500
    except Exception as e:
        print("[❌ 예외 발생]")
        traceback.print_exc()
        return jsonify({
            "error": "예외 발생",
            "message": str(e)
        }), 500

    # 5. 클라이언트에 결과 경로 반환
    stitched_url = f"/uploads/{session_id}/result/result_image.jpg"
    equi_url = f"/uploads/{session_id}/result/result_equi.jpg"
    json_url = f"/uploads/{session_id}/result/result_equi.json"

    return jsonify({
        "message": "처리 완료",
        "session": session_id,
        "result_image_url": stitched_url,
        "equirect_url": equi_url,
        "json_result_url": json_url
    })

# 업로드 폴더 파일 직접 제공 (정적 라우팅 보조용)
@app.route('/uploads/<path:filename>')
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)