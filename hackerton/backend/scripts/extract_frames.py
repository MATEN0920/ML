import os
import cv2
import sys
import shutil

def extract_frames_from_video(video_path, output_dir, interval=30):
    print(f"[EXTRACT] Input: {video_path}")
    print(f"[EXTRACT] Output dir: {output_dir}")
    print(f"[EXTRACT] Interval: {interval}")

    # ✅ 기존 프레임 디렉토리 삭제
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

        # ✅ 가로형 영상이면 세로로 회전 처리
        h, w = frame.shape[:2]
        if w > h:
            print(f"[INFO] 가로형 프레임 감지됨 → 세로로 회전")
            frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)

        if frame_index % interval == 0:
            frame_filename = f"{frame_index:05d}.jpg"
            frame_path = os.path.join(output_dir, frame_filename)
            cv2.imwrite(frame_path, frame)
            print(f"[FRAME] Saved: {frame_path}")
            saved_count += 1

        frame_index += 1

    cap.release()

    if saved_count == 0:
        print("[ERROR] No frames were saved.")
        sys.exit(1)
    else:
        print(f"[DONE] Saved {saved_count} frames to {output_dir}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("사용법: python extract_frames.py <video_path> <output_dir> <interval>")
        sys.exit(1)

    video_path = sys.argv[1]
    output_dir = sys.argv[2]
    interval = int(sys.argv[3])

    extract_frames_from_video(video_path, output_dir, interval)