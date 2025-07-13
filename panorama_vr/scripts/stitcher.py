import os
import time
import concurrent.futures
import cv2
import math
import numpy as np
from PIL import Image
import imutils

# 경로 설정
SRC_DIR = os.path.join(os.path.dirname(__file__), '..', 'images')
OUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'viewer', 'result_image.jpg')
NUM_WORKERS = 4

def enlarge_image(image, scale_factor):
    height, width = image.shape[:2]
    return cv2.resize(image, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_CUBIC)


def resize(filename, output_filename):
    try:
        img = cv2.imread(filename)
        if img is None:
            raise ValueError(f"[ERROR] Cannot read image: {filename}")

        width, height = img.shape[1], img.shape[0]

        # 작은 이미지일 경우 확대
        if height * width * 3 <= 2 ** 20:
            scale_factor = 2.0
            enlarged = enlarge_image(img, scale_factor)
            cv2.imwrite(output_filename, enlarged)
            return cv2.imread(output_filename)

        # 큰 이미지일 경우 축소
        elif height * width * 3 > 2 ** 25:
            i = 2
            t_height, t_width = height, width
            while t_height * t_width * 3 > 2 ** 25:
                t_height = int(t_height / math.sqrt(i))
                t_width = int(t_width / math.sqrt(i))
                i += 1
            resized = cv2.resize(img, (t_width, t_height))
            cv2.imwrite(output_filename, resized)
            return cv2.imread(output_filename)

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
    height, width = image.shape[:2]
    split_images = []

    cell_height = height // num_rows
    cell_width = width // num_cols

    for r in range(num_rows):
        for c in range(num_cols):
            start_x = c * cell_width
            end_x = start_x + cell_width
            start_y = r * cell_height
            end_y = start_y + cell_height
            split = image[start_y:end_y, start_x:end_x]
            split_images.append(split)

    return split_images


def stitch_images(images):
    if len(images) < 2:
        print("[ERROR] Need at least 2 images for stitching")
        return None
    
    # OpenCV 스티처 설정
    stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
    
    # 스티처 파라미터 조정 (더 나은 결과를 위해)
    try:
        # 파노라마 모드 설정
        stitcher.setPanoConfidenceThresh(0.8)  # 신뢰도 임계값 낮춤
        stitcher.setRegistrationResol(0.6)     # 등록 해상도
        stitcher.setSeamEstimationResol(0.1)   # 이음새 추정 해상도
        stitcher.setCompositingResol(cv2.Stitcher_ORIG_RESOL)  # 합성 해상도
    except:
        pass  # 일부 OpenCV 버전에서는 이 메서드들이 없을 수 있음
    
    print(f"[INFO] Attempting to stitch {len(images)} images...")
    (status, stitched) = stitcher.stitch(images)

    if status == 0:
        output_path = OUT_FILE
        cv2.imwrite(output_path, stitched)
        print(f"[INFO] Stitched image saved at: {output_path}")
        return stitched
    else:
        status_messages = {
            1: "Not enough features found in images",
            2: "Homography estimation failed",
            3: "Camera parameters adjustment failed"
        }
        error_msg = status_messages.get(status, "Unknown error")
        print(f"[ERROR] Stitching failed with status code {status}: {error_msg}")
        
        # 대체 방법: 이미지를 작은 그룹으로 나누어 스티칭 시도
        if len(images) > 5:
            print("[INFO] Trying to stitch in smaller groups...")
            return stitch_in_groups(images)
        
        return None


def stitch_in_groups(images, group_size=3):
    """이미지를 작은 그룹으로 나누어 스티칭을 시도합니다."""
    if len(images) <= group_size:
        return stitch_images(images)
    
    stitched_groups = []
    
    # 이미지를 그룹으로 나누어 스티칭
    for i in range(0, len(images), group_size - 1):  # overlap을 위해 -1
        group = images[i:i + group_size]
        if len(group) >= 2:
            result = stitch_images(group)
            if result is not None:
                stitched_groups.append(result)
    
    # 그룹 결과들을 다시 스티칭
    if len(stitched_groups) >= 2:
        return stitch_images(stitched_groups)
    elif len(stitched_groups) == 1:
        return stitched_groups[0]
    else:
        return None


def assign_work(files, num_workers):
    work_per_worker = len(files) // num_workers
    work_assignments = []
    for i in range(num_workers):
        start_index = i * work_per_worker
        end_index = (i + 1) * work_per_worker if i < num_workers - 1 else len(files)
        worker_files = files[start_index:end_index]
        work_assignments.append(worker_files)
    return work_assignments


def main():
    DIR = "C:\\Users\\yjyoo\\panorama_vr\\images"
    files = [f for f in os.listdir(DIR) if f.lower().endswith((".jpg", ".jpeg", ".png"))]

    if not files:
        print("[ERROR] No image files found in directory.")
        return

    # 파일명으로 정렬 (순서가 중요한 경우)
    files.sort()
    
    print(f"[INFO] Found {len(files)} image files: {files}")

    start = time.time()

    num_workers = 4
    work_assignments = assign_work(files, num_workers)

    resized_images = []
    file_to_image = {}  # 파일명과 이미지 매핑

    print("[INFO] Resizing images with multithreading...")

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_workers) as executor:
        futures = {}
        for batch in work_assignments:
            for filename in batch:
                full_path = os.path.join(DIR, filename)
                output_path = full_path.replace(".", "_resized.")
                future = executor.submit(resize, full_path, output_path)
                futures[future] = filename

        for future in concurrent.futures.as_completed(futures):
            try:
                result = future.result()
                if result is not None:
                    filename = futures[future]
                    file_to_image[filename] = result
            except Exception as e:
                print(f"[ERROR] Exception during resizing: {e}")

    # 원래 순서대로 정렬
    for filename in files:
        if filename in file_to_image:
            resized_images.append(file_to_image[filename])

    print(f"[INFO] {len(resized_images)} images resized successfully.")

    if len(resized_images) < 2:
        print("[ERROR] Not enough images for stitching. Need at least 2 images.")
        return

    # 이미지 전처리
    preprocessed_images = []
    for img in resized_images:
        processed = preprocess_image(img)
        if processed is not None:
            preprocessed_images.append(processed)

    print(f"[INFO] {len(preprocessed_images)} images preprocessed.")

    # 스티칭 (전체 이미지 사용)
    print("[INFO] Stitching all images...")
    stitched_image = stitch_images(preprocessed_images)  # 전체 이미지 사용

    # 이미지 분할은 스티칭 후에 필요한 경우에만 사용
    if stitched_image is not None and False:  # 현재는 비활성화
        num_rows = 2
        num_cols = 2
        split_images_list = split_image(stitched_image, num_rows, num_cols)
        print(f"[INFO] Stitched image split into {len(split_images_list)} chunks.")

    end = time.time()

    if stitched_image is not None:
        print(f"[INFO] Stitching complete. Time taken: {end - start:.2f} seconds.")
        
        # 결과 이미지 정보 출력
        h, w = stitched_image.shape[:2]
        print(f"[INFO] Result image dimensions: {w} x {h} pixels")
    else:
        print("[INFO] Stitching failed.")
        print("[TIP] Try the following:")
        print("  1. Ensure images have sufficient overlap (20-30%)")
        print("  2. Check if images are in the correct order")
        print("  3. Verify all images are from the same scene")
        print("  4. Try reducing the number of images")


if __name__ == '__main__':
    main()