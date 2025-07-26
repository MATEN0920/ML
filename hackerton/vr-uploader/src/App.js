import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resultImg, setResultImg] = useState(null);
  const [detections, setDetections] = useState([]);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("✅ 선택된 파일:", e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.warn("⚠️ 파일이 선택되지 않았습니다.");
      return;
    }

    console.log("🚀 업로드 시작");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData);
      console.log("✅ 업로드 성공:", res.data);

      // eslint-disable-next-line no-unused-vars
      const { result_image_url, equirect_url, json_result_url } = res.data;

      setResultImg(equirect_url);

      const jsonRes = await axios.get(json_result_url);
      console.log("📦 YOLO 감지 결과:", jsonRes.data);
      setDetections(jsonRes.data.objects || []);  // ✅ 배열로 지정
    } catch (err) {
      console.error("❌ 업로드 실패:", err);
      alert("업로드 실패: " + err.message);
    } finally {
      setUploading(false);
      console.log("✅ 업로드 종료");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">VR 객체 탐지 업로더</h1>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={uploading}
      >
        {uploading ? "업로드 중..." : "업로드 및 분석"}
      </button>

      {resultImg && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">탐지 결과</h2>
          <div className="relative inline-block">
            <img src={resultImg} alt="탐지 결과" className="max-w-full border" />
            {detections.map((det, i) => {
              const [x1, y1, x2, y2] = det.bbox;
              const width = x2 - x1;
              const height = y2 - y1;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x1,
                    top: y1,
                    width,
                    height,
                    border: "2px solid red",
                    boxSizing: "border-box",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: -18,
                      left: 0,
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      padding: "1px 4px",
                    }}
                  >
                    {'Class ${det.class_id}'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;