import React, { useState } from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const ROOM_COUNT = 6;
const TOOL_TYPES = Array.from({ length: ROOM_COUNT }, (_, i) => `room${i + 1}`);
// const GRID_WIDTH = 30;
// const GRID_HEIGHT = 18;
const GRID_SIZE = 18;
const wrapperStyle = css`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const toolbarStyle = css`
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const buttonBase = css`
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
`;

const activeButton = css`
  background: #007bff;
  color: white;
  font-weight: bold;
  border-color: #007bff;
`;

const gridStyle = css`
  display: flex;
  flex-direction: column;
`;

const rowStyle = css`
  display: flex;
`;

const baseCellStyle = css`
  width: 40px;
  height: 40px;
  outline: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  background: white;
  user-select: none;
`;

const itemColors = {
  room1: "#cce5ff",
  room2: "#d4edda",
  room3: "#fff3cd",
  room4: "#f8d7da",
  room5: "#e2e3e5",
  room6: "#d1c4e9",
};

const Cell = ({ x, y, placedItem, isPreview, onMouseDown, onMouseEnter, onMouseUp }) => {
  let backgroundColor = "white";
  let label = "";

  if (isPreview) {
    backgroundColor = "#e0e0e0";
  } else if (placedItem) {
    backgroundColor = itemColors[placedItem] || "white";
    label = placedItem.replace("room", "방 ");
  }

  const cellDynamicStyle = css`
    background-color: ${backgroundColor};
  `;

  return (
    <div
      className={`${baseCellStyle} ${cellDynamicStyle}`}
      onMouseDown={() => onMouseDown(x, y)}
      onMouseEnter={() => onMouseEnter(x, y)}
      onMouseUp={() => onMouseUp(x, y)}
    >
      {label}
    </div>
  );
};

const GridEditor = () => {
  const [selectedTool, setSelectedTool] = useState("room1");
  const [placedItems, setPlacedItems] = useState({});
  const [dragStart, setDragStart] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [previewCells, setPreviewCells] = useState([]);
  const navigate = useNavigate();

  const handleSaveAndNext = () => {
    localStorage.setItem("roomMap", JSON.stringify(placedItems));
    navigate("/upload"); // 다음 페이지로 이동
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
    const newPreview = calculateRectangle(dragStart.x, dragStart.y, x, y);
    setPreviewCells(newPreview);
  };

  const handleMouseUp = (x2, y2) => {
    if (!dragStart) return;
    const affectedCells = calculateRectangle(dragStart.x, dragStart.y, x2, y2);

    setPlacedItems((prev) => {
      const newItems = { ...prev };
      for (const key of affectedCells) {
        if (prev[key] === selectedTool) {
          delete newItems[key];
        } else if (prev[key]) {
          delete newItems[key];
        } else {
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
      <h2>🏠 방 배치 에디터 (방 1 ~ 6)</h2>

      <div className={toolbarStyle}>
        {TOOL_TYPES.map((type) => (
          <button
            key={type}
            className={`${buttonBase} ${selectedTool === type ? activeButton : ""}`}
            onClick={() => setSelectedTool(type)}
          >
            {type.replace("room", "방 ")}
          </button>
        ))}
      </div>

      <div className={gridStyle}>
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <div key={y} className={rowStyle}>
            {Array.from({ length: GRID_SIZE }).map((_, x) => {
              const key = `${x},${y}`;
              return (
                <Cell
                  key={key}
                  x={x}
                  y={y}
                  placedItem={placedItems[key]}
                  isPreview={previewCells.includes(key)}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={handleSaveAndNext}>다음 단계로 이동</button>
    </div>
  );
};

export default GridEditor;
