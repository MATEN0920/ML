import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// 방별 색상 정의
const ROOM_COLORS = {
  room1: '#FFBEBE',
  room2: '#FFBC6F',
  room3: '#FFF697',
  room4: '#86E5AA',
  room5: '#C2C1FF',
  room6: '#DD9EFF',
};

const TOOL_TYPES = [
  { key: 'room1', label: '거실', color: ROOM_COLORS.room1 },
  { key: 'room2', label: '방 2', color: ROOM_COLORS.room2 },
  { key: 'room3', label: '방 3', color: ROOM_COLORS.room3 },
  { key: 'room4', label: '방 4', color: ROOM_COLORS.room4 },
  { key: 'room5', label: '방 5', color: ROOM_COLORS.room5 },
  { key: 'room6', label: '방 6', color: ROOM_COLORS.room6 },
  { key: 'eraser', label: '지우개', color: '#f8f9fa' },
];

const GRID_WIDTH = 20;
const GRID_HEIGHT = 10;

const toolBtnStyle = (color, active) => css`
  padding: 6px 18px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: ${active ? '#007bff' : color};
  color: ${active ? '#fff' : '#232323'};
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.85;
  }
`;

const toolbarStyle = css`
  margin-bottom: 18px;
  display: flex;
  gap: 12px;
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
`;

const gridBox = css`
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  width: 720px;
  height: 360px;
  margin-bottom: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const rowStyle = css`
  display: flex;
`;

const wrapperStyle = css`
  width: 1194px;
  position: relative;
  background-color: #f6f7f9;
  height: 834px;
  overflow: hidden;
  text-align: left;
  font-size: 18px;
  color: #363d47;
  font-family: Pretendard;
`;

const mainContentStyle = css`
  position: absolute;
  top: 40px;
  left: 351px;
  border-radius: 12px;
  background-color: #fefefe;
  width: 803px;
  height: 754px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  box-sizing: border-box;
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

// --- 사이드바 스타일 ---
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

const sidebarImageStyle = css`
  width: 184px;
  height: 276px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
`;
// --- 사이드바 스타일 끝 ---

const Cell = ({
  x,
  y,
  placedItem,
  isPreview,
  selectedTool,
  dragging,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  // 방 색상 적용
  const backgroundColor =
    isPreview && dragging
      ? selectedTool === 'eraser'
        ? '#ffebee' // 지우개 미리보기: 연한 빨간색
        : '#f0f8ff' // 일반 도구 미리보기: 연한 파란색
      : placedItem && ROOM_COLORS[placedItem]
      ? ROOM_COLORS[placedItem]
      : '#fff';

  return (
    <div
      className={baseCellStyle}
      style={{ backgroundColor }}
      onMouseDown={() => onMouseDown(x, y)}
      onMouseEnter={() => onMouseEnter(x, y)}
      onMouseUp={() => onMouseUp(x, y)}
    >
      {placedItem &&
        TOOL_TYPES.find((tool) => tool.key === placedItem)?.label}
    </div>
  );
};

const HouseStep2 = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState('room1');
  const [placedItems, setPlacedItems] = useState({});
  const [dragStart, setDragStart] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [previewCells, setPreviewCells] = useState([]);

  useEffect(() => {
  // 기존 roomMap 데이터가 있으면 불러오기
  const savedRoomMap = localStorage.getItem('roomMap');
  if (savedRoomMap) {
    try {
      const parsedData = JSON.parse(savedRoomMap);
      setPlacedItems(parsedData);
    } catch (error) {
      console.error('저장된 roomMap 데이터 로드 실패:', error);
      // 파싱 실패 시 초기화
      localStorage.removeItem('roomMap');
      setPlacedItems({});
    }
  }
}, []);

  const handleSaveAndNext = () => {
    localStorage.setItem('roomMap', JSON.stringify(placedItems));
    navigate('/housestep3');
  };

  const handlePrev = () => {
    navigate('/housestep1');
  };

  const calculateRectangle = (x1, y1, x2, y2) => {
    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);
    const cells = [];
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        cells.push(`${x},${y}`);
      }
    }
    return cells;
  };

  const handleMouseDown = (x, y) => {
    setDragStart({ x, y });
    setDragging(true);
    setPreviewCells([`${x},${y}`]);
  };

  const handleMouseEnter = (x, y) => {
    if (!dragging || !dragStart) return;
    setPreviewCells(calculateRectangle(dragStart.x, dragStart.y, x, y));
  };

  const handleMouseUp = (x2, y2) => {
    if (!dragStart) return;
    const affectedCells = calculateRectangle(dragStart.x, dragStart.y, x2, y2);
    setPlacedItems((prev) => {
      const newItems = { ...prev };
      for (const key of affectedCells) {
        if (selectedTool === 'eraser') {
          // 지우개인 경우 해당 셀을 삭제
          delete newItems[key];
        } else {
          // 일반 방인 경우 배치
          newItems[key] = selectedTool;
        }
      }
      return newItems;
    });
    setDragging(false);
    setDragStart(null);
    setPreviewCells([]);
  };

  return (
    <div className={wrapperStyle}>
      {/* 사이드바 추가 */}
      <div className={sidebarStyle}>
        <div className={sidebarContentStyle}>
          <div className={sidebarTopStyle} onClick={() => navigate('/')}>
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
            <div className={stepActiveStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>02</div>
                <div style={{ fontWeight: 600, color: '#0f1114' }}>
                  집 전개도 등록하기
                </div>
              </div>
              <div className={badgeStyle('#fff0ec')}>진행중</div>
            </div>
            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>03</div>
                <div style={{ fontWeight: 600 }}>집 공간 스캔하기</div>
              </div>
              <div className={badgeStyle('#eaecf0')}>미완료</div>
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
      {/* 메인 컨텐츠 */}
      <div className={mainContentStyle}>
        {/* 단계 표시 추가 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={{ letterSpacing: '-0.01em', lineHeight: '135%' }}>
            <b style={{ color: '#e85b38' }}>2</b>
            <span style={{ fontWeight: 600, color: '#8d94a0' }}>/4</span>
          </div>
          <div style={{ fontSize: 24, color: '#232323' }}>
            <b style={{ letterSpacing: '-0.01em', lineHeight: '135%' }}>
              집의 전개도를 그려주세요
            </b>
            <div
              style={{
                fontSize: 16,
                letterSpacing: '-0.01em',
                lineHeight: '140%',
                textTransform: 'capitalize',
                fontWeight: 500,
                color: '#2098f3',
                marginTop: 4,
              }}
            >
              *아래의 도형을 오른쪽으로 끌어 전개도를 완성해주세요
            </div>
          </div>
        </div>
        {/* 기존 안내문구 삭제됨 */}

        <div className={toolbarStyle}>
          {TOOL_TYPES.map(({ key, label, color }) => (
            <button
              key={key}
              className={toolBtnStyle(color, selectedTool === key)}
              onClick={() => setSelectedTool(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={gridBox}>
          {Array.from({ length: GRID_HEIGHT }).map((_, y) => (
            <div key={y} className={rowStyle}>
              {Array.from({ length: GRID_WIDTH }).map((_, x) => {
                const key = `${x},${y}`;
                return (
                  <Cell
                    key={key}
                    x={x}
                    y={y}
                    placedItem={placedItems[key]}
                    isPreview={previewCells.includes(key)}
                    selectedTool={selectedTool}
                    dragging={dragging}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={handlePrev}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnStyle} onClick={handleSaveAndNext}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseStep2;