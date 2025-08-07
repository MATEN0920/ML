from flask import Flask, request, jsonify
import torch
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 모델 경로를 여러분의 best.pt 위치에 맞게 수정!
MODEL_PATH = 'runs/train/exp4/weights/best.pt'

# YOLOv5 모델 로드 (최초 1회만)
model = torch.hub.load('ultralytics/yolov5', 'custom', path=MODEL_PATH, force_reload=True)

@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return jsonify({'result': 'fail', 'reason': 'No image uploaded'}), 400

    file = request.files['image']
    img = Image.open(file.stream)
    results = model(img)
    labels = results.pandas().xyxy[0]['name'].tolist()
    has_fire_extinguisher = 'fire_extinguisher' in labels
    return jsonify({'result': 'success' if has_fire_extinguisher else 'fail'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


