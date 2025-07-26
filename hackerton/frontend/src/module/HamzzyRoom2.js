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

const HamzzyRoom = () => {
  const pannellumRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 라벨 파일 불러오기
    fetch(process.env.PUBLIC_URL + '/result/hamzzy_room_360.txt')
      .then((res) => res.text())
      .then((text) => setBoxes(parseLabels(text)));
  }, []);

  useEffect(() => {
    if (!window.pannellum) return;
    const viewer = window.pannellum.viewer('hamzzy-pan', {
      type: "equirectangular",
      panorama: process.env.PUBLIC_URL + "/result/hamzzy_room.jpg",
      autoLoad: true,
      hfov: 120,
      minHfov: 60,
      maxHfov: 130,
      pitch: 0,
      yaw: 0,
      compass: true,
      autoRotate: 0,
      minPitch: -40, // 아래로 최대 각도 (기본값: -90)
      maxPitch: 40,  // 위로 최대 각도 (기본값: 90)
      minYaw: 0, // 좌우 최소 각도
      maxYaw: 360, // 좌우 최대 각도 (예시: 100도만 움직임)
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
            navigate('../Scenario09');
          }
          break;
        }
      }
    });

    // cleanup
    return () => {
      const panDiv = document.getElementById('hamzzy-pan');
      if (panDiv) panDiv.innerHTML = '';
    };
  }, [boxes, navigate]);

  return (
    <div>
      <h2></h2>
      <div
        id="hamzzy-pan"
        ref={pannellumRef}
        style={{
          width: '100%', height: '500px', border: "none", // 테두리 제거
          boxShadow: "none" // 그림자 제거 (필요시)
        }}
      />
    </div>
  );
};

export default HamzzyRoom;