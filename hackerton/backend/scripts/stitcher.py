import os
import time
import concurrent.futures
import cv2
import math
import numpy as np
from PIL import Image
import multiprocessing

# 경로 및 전역 상수
BASE_DIR = os.getcwd()
SRC_DIR = os.environ.get("PIPELINE_FRAME_DIR", os.path.join(BASE_DIR, 'images'))
OUT_FILE = os.environ.get("PIPELINE_STITCH_RESULT", os.path.join(BASE_DIR, 'viewer', 'result_image.jpg'))
NUM_WORKERS = max(1, multiprocessing.cpu_count() - 1)

def get_image_files(directory):
    files = [f for f in os.listdir(directory) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    files.sort()
    return files

def enlarge_image(image, scale_factor):
    height, width = image.shape[:2]
    return cv2.resize(image, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_CUBIC)

def resize(filename, output_filename):
    try:
        img = cv2.imread(filename)
        if img is None:
            raise ValueError(f"[ERROR] Cannot read image: {filename}")

        width, height = img.shape[1], img.shape[0]

        if height * width * 3 <= 2 ** 20:
            scale_factor = 2.0
            enlarged = enlarge_image(img, scale_factor)
            cv2.imwrite(output_filename, enlarged)
            return cv2.imread(output_filename)

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

        else:
            return img

    except Exception as e:
        print(f"[EXCEPTION in resize()] {filename} => {e}")
        return None

def resize_images(files, directory, num_workers):
    work_assignments = assign_work(files, num_workers)
    resized_images = []
    file_to_image = {}
    print("[INFO] Resizing images with multithreading...")

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_workers) as executor:
        futures = {}
        for batch in work_assignments:
            for filename in batch:
                full_path = os.path.join(directory, filename)
                name, ext = os.path.splitext(full_path)
                output_path = f"{name}_resized{ext}"
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

    for filename in files:
        if filename in file_to_image:
            resized_images.append(file_to_image[filename])

    print(f"[INFO] {len(resized_images)} images resized successfully.")
    return resized_images

def assign_work(files, num_workers):
    work_per_worker = len(files) // num_workers
    work_assignments = []
    for i in range(num_workers):
        start_index = i * work_per_worker
        end_index = (i + 1) * work_per_worker if i < num_workers - 1 else len(files)
        worker_files = files[start_index:end_index]
        work_assignments.append(worker_files)
    return work_assignments

def preprocess_image(image):
    if image is None:
        return None
    return cv2.GaussianBlur(image, (5, 5), 0)

def preprocess_images(images):
    preprocessed = []
    for img in images:
        processed = preprocess_image(img)
        if processed is not None:
            preprocessed.append(processed)
    print(f"[INFO] {len(preprocessed)} images preprocessed.")
    return preprocessed

def stitch_images(images):
    if len(images) < 2:
        print("[ERROR] Need at least 2 images for stitching")
        return None

    stitcher = cv2.Stitcher_create()

    try:
        stitcher.setPanoConfidenceThresh(0.8)
        stitcher.setRegistrationResol(0.6)
        stitcher.setSeamEstimationResol(0.1)
        stitcher.setCompositingResol(cv2.Stitcher_ORIG_RESOL)
    except:
        pass

    print(f"[INFO] Attempting to stitch {len(images)} images...")
    (status, stitched) = stitcher.stitch(images)

    if status == 0:
        cv2.imwrite(OUT_FILE, stitched)
        print(f"[INFO] Stitched image saved at: {OUT_FILE}")
        return stitched
    else:
        status_messages = {
            1: "Not enough features found in images",
            2: "Homography estimation failed",
            3: "Camera parameters adjustment failed"
        }
        error_msg = status_messages.get(status, "Unknown error")
        print(f"[ERROR] Stitching failed with status code {status}: {error_msg}")

        if len(images) > 5:
            print("[INFO] Trying to stitch in smaller groups...")
            return stitch_in_groups(images)

        return None

def stitch_in_groups(images, group_size=3):
    if len(images) <= group_size:
        return stitch_images(images)

    stitched_groups = []
    for i in range(0, len(images), group_size - 1):
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

def print_stitching_result(stitched_image, elapsed_time):
    if stitched_image is not None:
        print(f"[INFO] Stitching complete. Time taken: {elapsed_time:.2f} seconds.")
        h, w = stitched_image.shape[:2]
        print(f"[INFO] Result image dimensions: {w} x {h} pixels")
    else:
        print("[INFO] Stitching failed.")
        print("[TIP] Try the following:")
        print("  1. Ensure images have sufficient overlap (20–30%)")
        print("  2. Check if images are in the correct order")
        print("  3. Verify all images are from the same scene")
        print("  4. Try reducing the number of images")

def main():
    DIR = SRC_DIR
    files = get_image_files(DIR)

    if not files:
        print("[ERROR] No image files found in directory.")
        return

    print(f"[INFO] Found {len(files)} image files: {files}")
    start = time.time()

    resized_images = resize_images(files, DIR, NUM_WORKERS)

    if len(resized_images) < 2:
        print("[ERROR] Not enough images for stitching. Need at least 2 images.")
        return

    preprocessed_images = preprocess_images(resized_images)
    stitched_image = stitch_images(preprocessed_images)

    end = time.time()
    print_stitching_result(stitched_image, end - start)

if __name__ == '__main__':
    main()
