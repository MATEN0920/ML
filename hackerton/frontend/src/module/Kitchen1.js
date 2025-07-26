import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 라벨 파싱 함수
function parseLabels(text) {
  return text
    .trim()
    .split('\n')
    .map((line) => {
      const [cls, yaw, pitch, w, h] = line.split(' ').map(Number);
      return { cls, yaw, pitch, w, h };
    });
}

function isInsideBox(yaw, pitch, box) {
  const { yaw: byaw, pitch: bpitch, w, h } = box;
  return Math.abs(yaw - byaw) < w / 2 && Math.abs(pitch - bpitch) < h / 2;
}

const Kitchen = () => {
  const pannellumRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 라벨 파일 불러오기
    fetch(process.env.PUBLIC_URL + '/result/kitchen_360.txt')
      .then((res) => res.text())
      .then((text) => setBoxes(parseLabels(text)));
  }, []);

  useEffect(() => {
    if (!window.pannellum) return;
    const viewer = window.pannellum.viewer('kitchen-pan', {
      type: "equirectangular",
      panorama: process.env.PUBLIC_URL + "/result/kitchen.jpg",
      autoLoad: true,
      hfov: 120,
      minHfov: 60,
      maxHfov: 180,
      pitch: 0,
      yaw: 0,
      compass: true,
      autoRotate: 0,
      minPitch: -50, // 아래로 최대 각도 (기본값: -90)
      maxPitch: 50,  // 위로 최대 각도 (기본값: 90)
    });

    let downCoords = null;

    viewer.on('mousedown', function (e) {
      downCoords = viewer.mouseEventToCoords(e);
    });

    viewer.on('mouseup', function (e) {
      const upCoords = viewer.mouseEventToCoords(e);
      if (!downCoords || !upCoords) return;
      const [upPitch, upYaw] = upCoords;
      let found = false;
      for (const box of boxes) {
        if (isInsideBox(upYaw, upPitch, box)) {
          found = true;
          if (box.cls === 1) {
            navigate('../Scenario18');
          } else if (box.cls === 2) {
            navigate('../Scenario18_4');
          }
          break;
        }
      }
    });

    // cleanup
    return () => {
      const panDiv = document.getElementById('kitchen-pan');
      if (panDiv) panDiv.innerHTML = '';
    };
  }, [boxes, navigate]);

  return (
    <div>
      <div
        id="kitchen-pan"
        ref={pannellumRef}
        style={{ width: '100%', height: '500px', border: '2px solid #aaa' }}
      />
    </div>
  );
};

export default Kitchen;