import cv2, os
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
SRC = os.path.join(PROJECT_ROOT, "viewer", "result_image_sample.jpg")
DST = os.path.join(PROJECT_ROOT, "viewer", "result_image_sample_equi.jpg")

# 한글 경로에서도 읽히게 처리
img = cv2.imdecode(np.fromfile(SRC, dtype=np.uint8), cv2.IMREAD_COLOR)

if img is None:
    raise FileNotFoundError(f"이미지를 열 수 없습니다: {SRC}")

h, w = img.shape[:2]
new_h = w // 2
pad = (new_h - h) // 2
pano2 = cv2.copyMakeBorder(img, pad, new_h - h - pad, 0, 0,
                           cv2.BORDER_CONSTANT, value=(0,0,0))

# 저장도 한글 경로 대응
cv2.imencode('.jpg', pano2)[1].tofile(DST)

print('[√] 2:1 변환 및 상하반전 완료 →', DST)
