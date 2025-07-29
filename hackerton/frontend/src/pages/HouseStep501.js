import { css } from "@emotion/css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LivingRoom from "../module/LivingRoom2";
import MainRoom from '../module/MainRoom1';
import Kitchen from '../module/Kitchen1';
import FirePage from '../module/FirePage';
import HamzzyRoom1 from '../module/HamzzyRoom1';
import Entrance from '../module/Entrance2';
import Out from '../module/Out';
import SampleVR from '../module/SampleVR';
import { useLocation } from "react-router-dom";
const styles = {
  container: css`
    width: 100vw;
    height: 100vh;
    min-height: 834px;
    position: relative;
    background-color: #363d47;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size: 24px;
    color: #363d47;
    font-family: Pretendard;
  `,
  backgroundImage: css`
    position: absolute;
    top: calc(50% - 417px);
    left: calc(50% - 597px);
    width: 1194px;
    height: 834px;
    object-fit: cover;
  `,
  profileBox: css`
    position: absolute;
    top: 40px;
    left: 959px;
    border-radius: 12px;
    background-color: #f6f7f9;
    width: 193px;
    height: 68px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 16px;
  `,
  profileImage: css`
    width: 48px;
    object-fit: cover;
  `,
  profileTextBox: css`
    width: 91px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  profileName: css`
    align-self: stretch;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
  `,
  profileMode: css`
    align-self: stretch;
    font-size: 14px;
    color: #8d94a0;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
  `,
  bottomImage: css`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 404px;
    height: 404px;
    object-fit: cover;
    z-index: 10; // 추가: VR 화면보다 높게
  `,
  headerTextBox: css`
    position: absolute;
    top: 40px;
    left: 40px;
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #fefefe;
  `,
  headerTitle: css`
    letter-spacing: -0.01em;
    line-height: 135%;
  `,
  headerDescription: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #d6dbe2;
  `,
  stepText: css`
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
  `,
  buttonWrapper: css`
    position: absolute;
    right: 40px;
    bottom: 40px;
    display: flex;
    flex-direction: row;
    gap: 15px;
    font-size: 18px;
    color: #fefefe;
  `,
  buttonGray: css`
    width: 152px;
    border-radius: 6px;
    background-color: #d6dbe2;
    display: flex;
    justify-content: center;
    padding: 14px 20px;
    box-sizing: border-box;
  `,
  buttonOrange: css`
    width: 152px;
    border-radius: 6px;
    background-color: #ff643e;
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 14px 20px;
    box-sizing: border-box;
  `,
  speechBubbleBox: css`
    position: absolute;
    top: 326px;
    left: 40px;
    display: flex;
    flex-direction: column;
    z-index: 10; // 추가: VR 화면보다 높게
  `,
  speechBubble: css`
    box-shadow: 0px 5px 8.2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fefefe;
    display: flex;
    justify-content: center;
    padding: 20px 30px;
    z-index: 10; // 추가: VR 화면보다 높게
  `,
  speechText: css`
    letter-spacing: -0.01em;
    line-height: 135%;
    z-index: 10; // 추가: VR 화면보다 높게
  `,
  triangleImage: css`
    width: 55.9px;
    height: 28px;
    margin-top: -8px;
  `,
  alertOverlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `,
  alertBox: css`
    background-color: #fefefe;
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 18px;
    color: #363d47;
    font-weight: 500;
  `,
};

const Component1 = () => {
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // location.state가 없을 경우 대비
  const sessionId = location.state?.sessionId || localStorage.getItem('sessionId');
  const roomType = location.state?.roomType || localStorage.getItem('roomType');

  // 필수 값이 없을 경우 초기 화면으로 되돌리기
  if (!sessionId || !roomType) {
    return (
      <div className={styles.container}>
        <div style={{ color: "white" }}>❗세션 정보가 없습니다. 다시 시도해주세요.</div>
        <div className={styles.buttonOrange} onClick={() => navigate("/HouseStep5")}>
          <div className={styles.stepText}>뒤로 가기</div>
        </div>
      </div>
    );
  }

  // sessionId와 roomType을 localStorage에 저장 (새로고침 대비)
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("roomType", roomType);

  const handleReadyClick = () => {
    navigate("/HouseStep5");
  };

  return (
    <div className={styles.container}>
      <div style={{ width: "100vw", height: "80vh", position: "relative", zIndex: 1 }}>
        <SampleVR sessionId={sessionId} roomType={roomType} />
      </div>

      <img
        className={styles.bottomImage}
        src="/images/시나리오/소방곰/404돋보기소방곰.png"
        alt=""
      />

      <div className={styles.headerTextBox}>
        <b className={styles.headerTitle}>VR 미리보기 체험</b>
      </div>

      <div className={styles.buttonWrapper}>
        <div className={styles.buttonOrange} onClick={handleReadyClick}>
          <div className={styles.stepText}>뒤로 가기</div>
        </div>
      </div>
    </div>
  );
};

export default Component1;
