import cv2
import numpy as np

# 클릭한 두 좌표를 저장할 리스트
points = []

def click_event(event, x, y, flags, param):
    global points, img

    if event == cv2.EVENT_LBUTTONDOWN:
        points.append((x, y))
        print(f"[INFO] 클릭: ({x}, {y})")

        # 클릭한 지점에 점 그리기
        cv2.circle(img, (x, y), 5, (0, 255, 0), -1)
        cv2.imshow("Image", img)

        # 두 점을 클릭했을 때 YOLO 좌표 계산
        if len(points) == 2:
            (x1, y1), (x2, y2) = points

            # 정렬
            x_min, x_max = min(x1, x2), max(x1, x2)
            y_min, y_max = min(y1, y2), max(y1, y2)

            # 중심, 너비, 높이 계산
            cx = (x_min + x_max) / 2
            cy = (y_min + y_max) / 2
            w = x_max - x_min
            h = y_max - y_min

            # 정규화
            img_h, img_w = img.shape[:2]
            cx_norm = cx / img_w
            cy_norm = cy / img_h
            w_norm = w / img_w
            h_norm = h / img_h

            print(f"[YOLO 좌표] {cx_norm:.6f} {cy_norm:.6f} {w_norm:.6f} {h_norm:.6f}")
            points.clear()

# ...existing code...

# ===== 이미지 불러오기 및 처리 =====
img_path = "../public/result/room.jpg"  # ← 이미지 경로 수정

# alpha 채널 포함해서 이미지 읽기
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
if img is None:
    raise FileNotFoundError(f"[ERROR] 이미지 경로 확인 필요: {img_path}")

# BGRA → BGR 흰 배경 합성 처리
if img.shape[2] == 4:
    alpha_channel = img[:, :, 3]
    rgb_channels = img[:, :, :3]
    white_bg = np.ones_like(rgb_channels, dtype=np.uint8) * 255
    alpha_mask = alpha_channel[:, :, np.newaxis] / 255.0
    img = (rgb_channels * alpha_mask + white_bg * (1 - alpha_mask)).astype(np.uint8)

# === 이미지 리사이즈 (예: 최대 1200x800) ===
max_w, max_h = 1200, 800
h, w = img.shape[:2]
scale = min(max_w / w, max_h / h, 1.0)
if scale < 1.0:
    img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)

# 이미지 표시 및 클릭 이벤트 연결
cv2.imshow("Image", img)
cv2.setMouseCallback("Image", click_event)
cv2.waitKey(0)
cv2.destroyAllWindows()