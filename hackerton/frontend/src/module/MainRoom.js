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

const MainRoom = () => {
  const pannellumRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 라벨 파일 불러오기
    fetch(process.env.PUBLIC_URL + '/result/main_room_360.txt')
      .then((res) => res.text())
      .then((text) => setBoxes(parseLabels(text)));
  }, []);

  useEffect(() => {
    if (!window.pannellum) return;
    const viewer = window.pannellum.viewer('main-pan', {
      type: "equirectangular",
      panorama: process.env.PUBLIC_URL + "/result/main_room.jpg",
      autoLoad: true,
      hfov: 120,
      minHfov: 60,
      maxHfov: 180,
      pitch: 0,
      yaw: 180,
      compass: true,
      autoRotate: 0,
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
            navigate('/living');
          }
          break;
        }
      }
    });

    // cleanup
    return () => {
      const panDiv = document.getElementById('main-pan');
      if (panDiv) panDiv.innerHTML = '';
    };
  }, [boxes, navigate]);

  return (
    <div>
      <h2>안방 360도 뷰</h2>
      <div
        id="main-pan"
        ref={pannellumRef}
        style={{ width: '100%', height: '500px', border: '2px solid #aaa' }}
      />
      <p>
        main_room.jpg VR 화면입니다.<br />
        버튼을 클릭하면 거실로 이동합니다.
      </p>
    </div>
  );
};

export default MainRoom;