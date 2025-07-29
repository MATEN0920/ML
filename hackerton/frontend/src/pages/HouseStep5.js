import React, { useEffect, useState,useRef } from 'react';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
const SESSION_ID = 'session_' + new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);
// 방별 색상
const ROOM_COLORS = {
  room1: '#FFBEBE',
  room2: '#FFBC6F',
  room3: '#FFF697',
  room4: '#86E5AA',
  room5: '#C2C1FF',
  room6: '#DD9EFF',
};

const gridArea = css`
  width: 720px;
  height: 360px;
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
  font-size: 12px;
  color: #363d47;
  margin: auto 16px auto;
  overflow: auto;
  border-radius: 12px;
  background: #fff;
  border: 1.5px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  padding: 0;
`;

const baseCellStyle = css`
  width: 36px;
  height: 36px;
  outline: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  user-select: none;
  font-size: 12px;
  font-weight: bold;
  color: #555;
  transition: background 0.2s, border 0.2s;
`;

const container = css`
  width: 1194px;
  position: relative;
  background-color: #f6f7f9;
  height: 834px;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #e85b38;
  font-family: Pretendard;
`;

const mainCard = css`
  position: absolute;
  top: 40px;
  left: 351px;
  border-radius: 12px;
  background-color: #fefefe;
  width: 803px;
  height: 754px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 32px;
  box-sizing: border-box;
`;

const stepHeader = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
`;

const stepCount = css`
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const stepTotal = css`
  font-weight: 600;
  color: #8d94a0;
`;

const stepTitle = css`
  font-size: 24px;
  color: #232323;
`;

const stepTitleText = css`
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const stepSubText = css`
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
  color: #2098f3;
`;

const emptySpace = css`
  height: 0px;
`;

const bottomNavStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  color: #fefefe;
`;

const navBtnStyle = css`
  border-radius: 6px;
  background-color: #d6dbe2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  cursor: pointer;
`;

const navBtnTextStyle = css`
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
`;

const sidebarStyle = css`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #f6f7f9;
  width: 351px;
  height: 834px;
  display: flex;
  padding: 40px 28px 52px 40px;
  box-sizing: border-box;
`;

const sidebarContentStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const sidebarTopStyle = css`
  display: flex;
  flex-direction: column;
  gap: 62px;
`;

const sidebarHomeStyle = css`
  position: relative;
  font-size: 18px;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
  font-family: Pretendard;
  color: #363d47;
  text-align: left;
`;

const sidebarDescStyle = css`
  width: 100%;
  position: relative;
  font-size: 24px;
  letter-spacing: -0.01em;
  line-height: 135%;
  display: inline-block;
  font-family: Pretendard;
  color: #363d47;
  text-align: left;
`;

const sidebarStepListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 16px;
  color: #8d94a0;
`;

const stepItemStyle = css`
  border-radius: 8px;
  background-color: #fefefe;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const stepActiveStyle = css`
  ${stepItemStyle};
  border: 1px solid #ff643e;
  color: #ff643e;
`;

const badgeStyle = (bg) => css`
  border-radius: 100px;
  background-color: ${bg};
  padding: 6px 10px;
  font-size: 13px;
`;

const inputStyle = css`
  width: 70px;
  height: 28px;
  font-size: 11px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  padding: 4px 6px;
  text-align: center;
  font-weight: 500;
  color: #666;
  background: #f8f9fa;
  outline: none;
  cursor: text;

  &::placeholder {
    color: #c0c0c0;
    font-size: 10px;
  }

  &:focus {
    border: 2px solid #2098f3;
    background: #fff;
  }
`;

const sidebarImageStyle = css`
  width: 184px;
  height: 276px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
`;

const GRID_WIDTH = 20;
const GRID_HEIGHT = 10;

function getRoomRects(roomMap) {
  // { room1: [ [x,y], ... ] }
  const roomRects = {};
  for (const key in roomMap) {
    const type = roomMap[key];
    if (!type.startsWith('room')) continue;
    if (!roomRects[type]) roomRects[type] = [];
    const [x, y] = key.split(',').map(Number);
    roomRects[type].push([x, y]);
  }
  // { room1: {minX, maxX, minY, maxY, center: [x,y]}}
  const result = {};
  for (const type in roomRects) {
    const coords = roomRects[type];
    const xs = coords.map(([x]) => x);
    const ys = coords.map(([, y]) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // 중심 좌표
    const centerX = Math.round(xs.reduce((a, b) => a + b, 0) / xs.length);
    const centerY = Math.round(ys.reduce((a, b) => a + b, 0) / ys.length);
    result[type] = { minX, maxX, minY, maxY, center: [centerX, centerY] };
  }
  return result;
}

const HouseStep5 = () => {
  const navigate = useNavigate();
  const [roomMap, setRoomMap] = useState({});
  const [roomNames, setRoomNames] = useState({});
  const [roomImages, setRoomImages] = useState({});
  const [tempNames, setTempNames] = useState({});
  const [sessionId] = useState(() => {
  const stored = localStorage.getItem('session_id');
    if (stored) return stored;

    const newId = 'session_' + new Date().toISOString().replace(/[-:.]/g, '').slice(0, 8) + '_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('session_id', newId);
    return newId;
  });
  useEffect(() => {
    const saved = localStorage.getItem('roomMap');
    let parsed = {};

    if (saved) {
      parsed = JSON.parse(saved);
    } else {
      // 테스트용 기본 데이터 설정
      parsed = {
        '2,2': 'room1',
        '3,2': 'room1',
        '4,2': 'room1',
        '2,3': 'room1',
        '3,3': 'room1',
        '4,3': 'room1',
        '6,2': 'room2',
        '7,2': 'room2',
        '6,3': 'room2',
        '7,3': 'room2',
        '2,5': 'room3',
        '3,5': 'room3',
        '4,5': 'room3',
        '2,6': 'room3',
        '3,6': 'room3',
        '4,6': 'room3',
        '6,5': 'room4',
        '7,5': 'room4',
        '6,6': 'room4',
        '7,6': 'room4',
      };
    }

    setRoomMap(parsed);

    // 이름 기본값 - 빈 상태로 시작
    const names = {};
    Object.values(parsed).forEach((type) => {
      if (type.startsWith('room') && !names[type]) {
        names[type] = ''; // 빈 문자열로 초기화
      }
    });
    setRoomNames(names);
    setTempNames(names);
  }, []);

  const handleNameChange = (type, newName) => {
    setRoomNames((prev) => ({
      ...prev,
      [type]: newName,
    }));
  };

  const handleTempNameChange = (type, tempName) => {
    setTempNames((prev) => ({
      ...prev,
      [type]: tempName,
    }));
  };

  const handleNameSave = (type) => {
    const tempName = tempNames[type];
    if (tempName && tempName.trim()) {
      handleNameChange(type, tempName.trim());
    }
  };

  const handleImageUpload = async (type, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('roomType', type); // 'room1', 'room2' 등
    formData.append('sessionId', sessionId); // 🔥 이미 선언된 sessionId 사용

    try {
      const response = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        const text = await response.text();
        result = { raw: text };
      }

      if (response.ok && result.success) {
        console.log('[✅ 업로드 성공]', result);
        setRoomImages((prev) => ({
          ...prev,
          [type]: {
            file,
            filename: result.filename,
            path: result.path,
            originalName: file.name,
          },
        }));
        alert(`${type} 파일 업로드 및 처리 완료!`);
      } else {
        console.error('[❌ 업로드 실패]', result);
        alert('업로드 실패: ' + (result?.error || JSON.stringify(result)));
      }
    } catch (err) {
      console.error('[❌ 네트워크 오류]', err);
      alert('서버 연결 중 오류 발생: ' + err.message);
    }
  };

  // 방별 사각형 정보
  const roomRects = getRoomRects(roomMap);

  // 격자 렌더링
  const renderGrid = () => (
    <div className={gridArea}>
      {Array.from({ length: GRID_HEIGHT }).map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {Array.from({ length: GRID_WIDTH }).map((_, x) => {
            const key = `${x},${y}`;
            const type = roomMap[key];
            // 방 사각형 정보
            let border = '';
            let bgColor = '#fff';

            if (type && type.startsWith('room') && roomRects[type]) {
              const { minX, maxX, minY, maxY } = roomRects[type];
              // 테두리
              if (x === minX) border += 'border-left:3px solid #2098f3;';
              if (x === maxX) border += 'border-right:3px solid #2098f3;';
              if (y === minY) border += 'border-top:3px solid #2098f3;';
              if (y === maxY) border += 'border-bottom:3px solid #2098f3;';
              bgColor = ROOM_COLORS[type] || '#f8f9fa';
            }

            return (
              <div
                key={key}
                className={baseCellStyle}
                style={{
                  background: bgColor,
                  position: 'relative',
                  ...(border ? { border: 'none', boxShadow: 'none' } : {}),
                  ...(border
                    ? { boxSizing: 'border-box', ...borderStringToObj(border) }
                    : {}),
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );

  // border 스타일 문자열을 객체로 변환
  function borderStringToObj(borderStr) {
    const obj = {};
    borderStr.split(';').forEach((b) => {
      if (!b.trim()) return;
      const [prop, value] = b.split(':');
      obj[prop.trim()] = value.trim();
    });
    return obj;
  }

  // 첨부파일 입력 UI (격자 아래에 배치)
  const renderFileInputs = () => (
    <div
      style={{
        width: 720,
        margin: '20px auto 0 auto',
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      {Object.keys(roomRects).map((type) =>
        type.startsWith('room') ? (
          <div
            key={type}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 8px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #e8e8e8',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              width: '80px',
              height: '110px',
              position: 'relative',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* 색상 원 */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: ROOM_COLORS[type] || '#f8f9fa',
                border: 'none',
                flexShrink: 0,
              }}
            />

            {/* 방 이름 표시 */}
            {type === 'room1' ? (
              // 거실은 고정된 텍스트로 표시
              <div
                style={{
                  width: '70px',
                  height: '28px',
                  fontSize: '11px',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  padding: '4px 6px',
                  textAlign: 'center',
                  fontWeight: '500',
                  color: '#666',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                거실
              </div>
            ) : (
              // 다른 방들은 입력 가능
              <input
                type="text"
                className={inputStyle}
                value={tempNames[type] || roomNames[type] || ''}
                placeholder={(() => {
                  switch (type) {
                    case 'room2':
                      return 'ex) 거실';
                    case 'room3':
                      return 'ex) 거실';
                    case 'room4':
                      return 'ex) 거실';
                    case 'room5':
                      return 'ex) 거실';
                    case 'room6':
                      return 'ex) 거실';
                    default:
                      return `ex) 방${type.replace('room', '')}`;
                  }
                })()}
                onChange={(e) => handleTempNameChange(type, e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleNameSave(type);
                    e.target.blur();
                  }
                }}
                onBlur={() => handleNameSave(type)}
              />
            )}

            {/* VR 보기 버튼 */}
            <button
              style={{
                width: '70px',
                height: '28px',
                border: 'none',
                borderRadius: '4px',
                background: '#2098f3',
                color: 'white',
                fontSize: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                transition: 'all 0.2s',
              }}
              onClick={() => {
                const roomType = type;
                navigate("/HouseStep501", { state: { sessionId, roomType } });
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#127bd1';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#2098f3';
              }}
            >
              <img
                src="/images/아이콘/vr.png"
                alt=""
                style={{
                  width: '12px',
                  height: '12px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              <span>VR 보기</span>
            </button>

            <input
              id={`file-${type}`}
              type="file"
              accept="image/*,video/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageUpload(type, e.target.files[0])}
            />
          </div>
        ) : null
      )}
    </div>
  );

  // 네비게이션
  const goPrev = () => navigate('/housestep4');
  const goNext = () => navigate('/loading2');
  const goHome = () => navigate('/');

  return (
    <div className={container}>
      <div className={mainCard}>
        <div>
          <div className={stepHeader}>
            <div className={stepCount}>
              <b>3</b>
              <span className={stepTotal}>/4</span>
            </div>
            <div className={stepTitle}>
              <b className={stepTitleText}>
                격자 결과 확인 및 방 이름/이미지 등록
              </b>
              <div className={stepSubText}>
                * 각 방/문/창문에 이름과 이미지를 등록할 수 있습니다.
              </div>
            </div>
          </div>
          <div className={emptySpace} />
          {renderGrid()}
          {renderFileInputs()}
        </div>

        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={goPrev}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnStyle} onClick={goNext}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>

      <div className={sidebarStyle}>
        <div className={sidebarContentStyle}>
          <div className={sidebarTopStyle} onClick={goHome}>
            <div className={sidebarHomeStyle}>← 홈으로</div>
            <div className={sidebarDescStyle}>
              <b>
                화재 대피 훈련을 진행할
                <br />
                장소에 대해 곰곰소방단 에게 알려주세요!
              </b>
              <img
                src="/images/곰/촬영소방곰.png"
                alt=""
                className={sidebarImageStyle}
              />
            </div>
          </div>

          <div className={sidebarStepListStyle}>
            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>01</div>
                <div style={{ fontWeight: 600 }}>집 주소 입력하기</div>
              </div>
              <div className={badgeStyle('#f6f7f9')}>완료</div>
            </div>

            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>02</div>
                <div style={{ fontWeight: 600 }}>집 전개도 등록하기</div>
              </div>
              <div className={badgeStyle('#f6f7f9')}>완료</div>
            </div>

            <div className={stepActiveStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>03</div>
                <div style={{ fontWeight: 600, color: '#0f1114' }}>
                  집 공간 스캔하기
                </div>
              </div>
              <div className={badgeStyle('#fff0ec')}>진행중</div>
            </div>

            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>04</div>
                <div style={{ fontWeight: 600 }}>화재 요인 등록하기</div>
              </div>
              <div className={badgeStyle('#eaecf0')}>미완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseStep5;