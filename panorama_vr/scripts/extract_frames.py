import os
import cv2
import sys
import shutil

def safe_imwrite(path, img):
    ext = os.path.splitext(path)[1] or ".jpg"
    ok, buf = cv2.imencode(ext, img)
    if not ok:
        return False
    try:
        # Windows 유니코드 경로에서도 안전
        buf.tofile(path)
        return True
    except Exception:
        return False

def extract_frames_from_video(video_path, output_dir, interval=30):
    print(f"[EXTRACT] Input: {video_path}")
    print(f"[EXTRACT] Output dir: {output_dir}")
    print(f"[EXTRACT] Interval: {interval}")

    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
        print(f"[CLEANUP] 기존 프레임 디렉토리 삭제됨: {output_dir}")
    os.makedirs(output_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[ERROR] Failed to open video: {video_path}")
        sys.exit(1)

    frame_index = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 가로형이면 세로로 회전
        h, w = frame.shape[:2]
        if w > h:
            print("[INFO] 가로형 프레임 감지됨 → 세로로 회전")
            frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)

        if frame_index % interval == 0:
            frame_filename = f"{frame_index:05d}.jpg"
            frame_path = os.path.join(output_dir, frame_filename)
            if safe_imwrite(frame_path, frame):
                print(f"[FRAME] Saved: {frame_path}")
                saved_count += 1
            else:
                print(f"[WARN] Save failed (unicode path issue?): {frame_path}")

        frame_index += 1

    cap.release()

    if saved_count == 0:
        print("[ERROR] No frames were saved.")
        sys.exit(1)
    else:
        print(f"[DONE] Saved {saved_count} frames to {output_dir}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    video_path = os.path.join(base_dir, "C:\\Users\\yjyoo\\OneDrive\\바탕 화면\\ML\\panorama_vr\\videos", "sample_video.mp4")
    output_dir = os.path.join(base_dir, "C:\\Users\\yjyoo\\OneDrive\\바탕 화면\\ML\\panorama_vr\\extracted_frames")
    interval = 30    
    project_root = os.path.dirname(base_dir)               # 프로젝트 루트


    print(f"[INFO] 기본 설정 사용: {video_path}, {output_dir}, interval={interval}")
    extract_frames_from_video(video_path, output_dir, interval)
