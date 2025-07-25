import os
import cv2
import json

SRC = os.environ.get("PIPELINE_STITCH_RESULT", "./viewer/result_image.jpg")
DST = os.environ.get("PIPELINE_EQUI_RESULT", "./viewer/result_equi.jpg")

img = cv2.imread(SRC)
if img is None:
    print(f"[ERROR] 이미지 로딩 실패: {SRC}")
    exit(1)

h, w = img.shape[:2]
new_h = w // 2
pad = (new_h - h) // 2  # ✅ 수정된 부분
if pad < 0:
    print(f"[ERROR] 이미지가 이미 2:1 이상 비율입니다.")
    exit(1)

pano2 = cv2.copyMakeBorder(img, pad, new_h - h - pad, 0, 0, cv2.BORDER_CONSTANT, value=(0, 0, 0))
cv2.imwrite(DST, pano2)
print('[√] 2:1 변환 완료 →', DST)

# JSON 생성
result_json_path = DST.replace(".jpg", ".json")
result_data = {
    "message": "no objects detected",
    "objects": []
}

with open(result_json_path, "w") as f:
    json.dump(result_data, f, indent=2)

print(f"[√] JSON 생성 완료 → {result_json_path}")
print(f"[DEBUG] SRC: {SRC}")
print(f"[DEBUG] DST: {DST}")