import os
import cv2
import json
import subprocess
import sys
import shutil

def detect_objects_yolov5(image_path, model_path, output_dir, json_output_path=None):
    # ✅ 한 단계 위 폴더로 설정 (결과 이미지 이 위치에 복사됨)
    project_dir = os.path.abspath(os.path.join(output_dir, ".."))
    detect_name = os.path.basename(output_dir)

    os.makedirs(output_dir, exist_ok=True)

    # ✅ YOLOv5 detect.py 경로 (backend 기준)
    yolov5_detect = os.path.join("backend", "yolov5", "detect.py")

    # ✅ YOLOv5 명령어 실행
    command = [
        "python", yolov5_detect,
        "--weights", model_path,
        "--source", image_path,
        "--project", project_dir,
        "--name", detect_name,
        "--exist-ok",
        "--save-txt"
    ]

    print("[INFO] YOLOv5 객체 탐지 시작...")
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        print("[ERROR] YOLOv5 오류:\n", result.stderr)
        return

    print("[INFO] YOLOv5 탐지 완료 →", output_dir)

    # ✅ 탐지된 라벨 파일 위치 확인
    labels_path = os.path.join(output_dir, "labels")
    image_filename = os.path.splitext(os.path.basename(image_path))[0]
    txt_file = os.path.join(labels_path, image_filename + ".txt")

    if not os.path.exists(txt_file):
        print("[WARN] 탐지 결과 없음:", txt_file)
        return

    # ✅ 탐지 결과 bbox 계산
    h, w = cv2.imread(image_path).shape[:2]
    detections = []
    with open(txt_file, "r") as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) != 5:
                continue
            cls_id, cx, cy, bw, bh = map(float, parts)
            x1 = (cx - bw / 2) * w
            y1 = (cy - bh / 2) * h
            x2 = (cx + bw / 2) * w
            y2 = (cy + bh / 2) * h
            detections.append({
                "class_id": int(cls_id),
                "bbox": [round(x1), round(y1), round(x2), round(y2)]
            })

    # ✅ JSON 결과 저장
    if json_output_path:
        with open(json_output_path, "w", encoding="utf-8") as f:
            json.dump(detections, f, indent=2, ensure_ascii=False)
        print(f"[INFO] 탐지 JSON 저장 → {json_output_path}")
        print(f"[INFO] 탐지된 객체 수: {len(detections)}")

    # ✅ 박스가 그려진 이미지를 result/에 별도 이름으로 저장
    yolo_output_image = os.path.join(output_dir, image_filename + ".jpg")
    final_output_image = os.path.join(project_dir, image_filename + "_with_boxes.jpg")
    if os.path.exists(yolo_output_image):
        shutil.copy(yolo_output_image, final_output_image)
        print(f"[INFO] 박스 이미지 복사 완료 → {final_output_image}")
    else:
        print(f"[WARN] YOLO 결과 이미지 없음: {yolo_output_image}")

if __name__ == "__main__":
    print("[DEBUG] yolo.py 진입")
    image_path = sys.argv[1]
    model_path = sys.argv[2]
    output_dir = sys.argv[3]
    print(f"[DEBUG] 인자 확인: {image_path}, {model_path}, {output_dir}")
    json_path = image_path.replace(".jpg", ".json")
    detect_objects_yolov5(image_path, model_path, output_dir, json_path)