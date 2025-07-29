

import React, { useEffect, useRef, useState } from "react";

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

const SampleVR = ({ sessionId, roomType }) => {  // ✅ props로 받기
  const pannellumRef = useRef(null);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    if (!sessionId || !roomType) {
      console.error("❌ SampleVR: sessionId 또는 roomType이 정의되지 않았습니다.");
      return;
    }

    if (!window.pannellum) return;
    const viewer = window.pannellum.viewer('sampleVR-pan', {
      type: "equirectangular",
      panorama: `http://${window.location.hostname}:5050/uploads/${sessionId}/${roomType}/result_equi.jpg`,
      autoLoad: true,
      hfov: 120,
      minHfov: 60,
      maxHfov: 140,
      pitch: 0,
      yaw: 0,
      compass: true,
      autoRotate: 0,
      minPitch: -50,
      maxPitch: 50,
    });

    return () => {
      const panDiv = document.getElementById('sampleVR-pan');
      if (panDiv) panDiv.innerHTML = '';
    };
  }, [sessionId, roomType]);

  return (
    <div>
      <div
        id="sampleVR-pan"
        ref={pannellumRef}
        style={{ width: '100%', height: '500px', border: '2px solid #aaa' }}
      />
    </div>
  );
};

export default SampleVR;

