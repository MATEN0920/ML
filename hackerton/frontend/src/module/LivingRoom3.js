import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// 라벨(txt) 파일을 [cls yaw pitch w h] 형식(각도 단위)으로 저장했다고 가정
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
  // 중심좌표와의 거리로 체크 (w, h는 각도 단위)
  const { yaw: byaw, pitch: bpitch, w, h } = box;
  return Math.abs(yaw - byaw) < w / 2 && Math.abs(pitch - bpitch) < h / 2;
}

export default function Room360() {
  const panRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 라벨 파일 불러오기
    fetch(process.env.PUBLIC_URL + '/result/living_room_360.txt')
      .then((res) => res.text())
      .then((text) => setBoxes(parseLabels(text)));
  }, []);

  useEffect(() => {
    if (!window.pannellum) return;
    const viewer = window.pannellum.viewer('pan1', {
      type: 'equirectangular',
      panorama: process.env.PUBLIC_URL + '/result/living_room_1.jpg',
      autoLoad: true,
      hfov: 120,
      minHfov: 60,
      maxHfov: 130,
      pitch: 0,
      yaw: 170,
      compass: true,
      autoRotate: 0,
      minPitch: -50, // 아래로 최대 각도 (기본값: -90)
      maxPitch: 50,  // 위로 최대 각도 (기본값: 90)
    });

    let downCoords = null;

    // 마우스 누를 때 좌표 저장
    viewer.on('mousedown', function (e) {
      downCoords = viewer.mouseEventToCoords(e);
    });

    // 마우스 뗄 때 클릭(거의 움직이지 않음)만 판정
    viewer.on('mouseup', function (e) {
      const upCoords = viewer.mouseEventToCoords(e);
      if (!downCoords || !upCoords) return;
      const [upPitch, upYaw] = upCoords;
      let found = false;
      for (const box of boxes) {
        console.log(
          `클릭 좌표: yaw=${upYaw}, pitch=${upPitch} / 박스: yaw=${box.yaw}, pitch=${box.pitch}, w=${box.w}, h=${box.h}, cls=${box.cls}`
        );
        if (isInsideBox(upYaw, upPitch, box)) {
          found = true;
          if (box.cls === 1) {
            navigate('../Scenario1401');
          } else if (box.cls === 2) {
            navigate('../Scenario1402');
          } else if (box.cls === 3) {
            navigate('../Scenario1403');
          }
          break;
        }
      }
    });

    // cleanup
    return () => {
      const panDiv = document.getElementById('pan1');
      if (panDiv) panDiv.innerHTML = '';
    };
  }, [boxes, navigate]);

  return (
    <div>
      <div
        id="pan1"
        ref={panRef}
        style={{ width: '100%', height: '500px', border: "none", boxShadow: "none" }} // 테두리 제거
      />

    </div>
  );
}