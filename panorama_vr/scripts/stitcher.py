import os
import time
import concurrent.futures
import cv2
import math
import numpy as np
from PIL import Image
import imutils

# ===== 경로 설정 =====
BASE_DIR = os.path.dirname(os.path.abspath(__file__))       # /scripts
PROJECT_ROOT = os.path.dirname(BASE_DIR)                    # 프로젝트 루트 (panorama_vr)

SRC_DIR = os.path.join(PROJECT_ROOT, "extracted_frames")    # 입력 프레임 폴더
OUT_FILE = os.path.join(PROJECT_ROOT, "viewer", "result_image_sample.jpg")  # 출력 파일
NUM_WORKERS = 4

# ----- Windows 한글 경로 저장 안전 함수 -----
def safe_imwrite(path, img):
    ext = os.path.splitext(path)[1] or ".jpg"
    ok, buf = cv2.imencode(ext, img)
    if not ok:
        return False
    try:
        buf.tofile(path)  # 유니코드/OneDrive 경로에서도 안전
        return True
    except Exception:
        return False

def safe_imread(path, flags=cv2.IMREAD_COLOR):
    try:
        data = np.fromfile(path, dtype=np.uint8)  # Windows 유니코드 경로 OK
        if data.size == 0:
            return None
        return cv2.imdecode(data, flags)
    except Exception:
        return None

def enlarge_image(image, scale_factor):
    h, w = image.shape[:2]
    return cv2.resize(image, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_CUBIC)

def resize(filename, output_filename):
    try:
        img = safe_imread(filename)   # <- 여기!
        if img is None:
            raise ValueError(f"[ERROR] Cannot read image: {filename}")

        w, h = img.shape[1], img.shape[0]

        # 작은 이미지면 확대
        if h * w * 3 <= 2 ** 20:
            enlarged = enlarge_image(img, 2.0)
            if not safe_imwrite(output_filename, enlarged):
                print(f"[WARN] Save failed: {output_filename}")
            return cv2.imread(output_filename)

        # 너무 큰 이미지면 축소
        elif h * w * 3 > 2 ** 25:
            i = 2
            th, tw = h, w
            while th * tw * 3 > 2 ** 25:
                th = int(th / math.sqrt(i))
                tw = int(tw / math.sqrt(i))
                i += 1
            resized = cv2.resize(img, (tw, th))
            # 확대/축소 저장 후 다시 읽기
            if not safe_imwrite(output_filename, enlarged_or_resized_img):
                print(f"[WARN] Save failed: {output_filename}")
            return safe_imread(output_filename)   # <- cv2.imread 대신


        # 적절한 크기면 원본 반환
        else:
            return img

    except Exception as e:
        print(f"[EXCEPTION in resize()] {filename} => {e}")
        return None

def preprocess_image(image):
    if image is None:
        return None
    return cv2.GaussianBlur(image, (5, 5), 0)

def split_image(image, num_rows, num_cols):
    h, w = image.shape[:2]
    out = []
    ch, cw = h // num_rows, w // num_cols
    for r in range(num_rows):
        for c in range(num_cols):
            sx, ex = c * cw, (c + 1) * cw
            sy, ey = r * ch, (r + 1) * ch
            out.append(image[sy:ey, sx:ex])
    return out

def stitch_images(images):
    if len(images) < 2:
        print("[ERROR] Need at least 2 images for stitching")
        return None

    stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
    try:
        stitcher.setPanoConfidenceThresh(0.8)
        stitcher.setRegistrationResol(0.6)
        stitcher.setSeamEstimationResol(0.1)
        stitcher.setCompositingResol(cv2.Stitcher_ORIG_RESOL)
    except Exception:
        pass

    print(f"[INFO] Attempting to stitch {len(images)} images...")
    (status, stitched) = stitcher.stitch(images)

    if status == 0:
        # 안전 저장
        if not safe_imwrite(OUT_FILE, stitched):
            print(f"[WARN] Failed to save result to {OUT_FILE}")
        else:
            print(f"[INFO] Stitched image saved at: {OUT_FILE}")
        return stitched
    else:
        status_messages = {
            1: "Not enough features found in images",
            2: "Homography estimation failed",
            3: "Camera parameters adjustment failed"
        }
        print(f"[ERROR] Stitching failed with status code {status}: {status_messages.get(status, 'Unknown error')}")
        if len(images) > 5:
            print("[INFO] Trying to stitch in smaller groups...")
            return stitch_in_groups(images)
        return None

def stitch_in_groups(images, group_size=3):
    if len(images) <= group_size:
        return stitch_images(images)

    stitched_groups = []
    for i in range(0, len(images), group_size - 1):  # overlap
        group = images[i:i + group_size]
        if len(group) >= 2:
            result = stitch_images(group)
            if result is not None:
                stitched_groups.append(result)

    if len(stitched_groups) >= 2:
        return stitch_images(stitched_groups)
    elif len(stitched_groups) == 1:
        return stitched_groups[0]
    else:
        return None

def assign_work(files, num_workers):
    per = len(files) // num_workers if num_workers else len(files)
    out = []
    for i in range(num_workers):
        s = i * per
        e = (i + 1) * per if i < num_workers - 1 else len(files)
        out.append(files[s:e])
    return out

def main():
    # ===== 입력 폴더: extracted_frames =====
    if not os.path.isdir(SRC_DIR):
        print(f"[ERROR] SRC_DIR not found: {SRC_DIR}")
        return

    files = [f for f in os.listdir(SRC_DIR) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    if not files:
        print("[ERROR] No image files found in extracted_frames.")
        return

    files.sort()  # 프레임 순서대로
    print(f"[INFO] Found {len(files)} frames in {SRC_DIR}")

    start = time.time()
    work_assignments = assign_work(files, NUM_WORKERS)

    resized_images = []
    file_to_image = {}

    print("[INFO] Resizing images with multithreading...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=NUM_WORKERS) as ex:
        futures = {}
        for batch in work_assignments:
            for fn in batch:
                full_path = os.path.join(SRC_DIR, fn)
                # 원본 옆에 임시 리사이즈 파일 생성
                name, ext = os.path.splitext(full_path)
                output_path = f"{name}_resized{ext}"
                fut = ex.submit(resize, full_path, output_path)
                futures[fut] = fn

        for fut in concurrent.futures.as_completed(futures):
            try:
                result = fut.result()
                if result is not None:
                    file_to_image[futures[fut]] = result
            except Exception as e:
                print(f"[ERROR] Exception during resizing: {e}")

    # 원래 순서 유지
    for fn in files:
        if fn in file_to_image:
            resized_images.append(file_to_image[fn])

    print(f"[INFO] {len(resized_images)} images resized successfully.")

    if len(resized_images) < 2:
        print("[ERROR] Not enough images for stitching. Need at least 2 images.")
        return

    preprocessed_images = [preprocess_image(img) for img in resized_images if img is not None]
    print(f"[INFO] {len(preprocessed_images)} images preprocessed.")

    print("[INFO] Stitching all images...")
    stitched_image = stitch_images(preprocessed_images)

    end = time.time()
    if stitched_image is not None:
        h, w = stitched_image.shape[:2]
        print(f"[INFO] Stitching complete in {end - start:.2f}s. Result: {w} x {h}px")
        print(f"[INFO] Output: {OUT_FILE}")
    else:
        print("[INFO] Stitching failed.")
        print("[TIP] 1) 프레임 간 20~30% 겹침  2) 올바른 순서  3) 같은 장면  4) 이미지 수 줄여보기")

if __name__ == "__main__":
    main()
