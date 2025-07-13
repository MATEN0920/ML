import cv2, os
SRC = os.path.join(os.path.dirname(__file__), '..', 'viewer', 'result_image.jpg')
DST = os.path.join(os.path.dirname(__file__), '..', 'viewer', 'result_equi.jpg')

img = cv2.imread(SRC)
h, w = img.shape[:2]
new_h = w // 2
pad = (new_h - h) // 2
pano2 = cv2.copyMakeBorder(img, pad, new_h - h - pad, 0, 0,
                           cv2.BORDER_CONSTANT, value=(0,0,0))
cv2.imwrite(DST, pano2)
print('[√] 2:1 변환 및 상하반전 완료 →', DST)
