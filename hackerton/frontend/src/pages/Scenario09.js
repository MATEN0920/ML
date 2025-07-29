import { css } from "@emotion/css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: css`
    width: 100%;
    position: relative;
    background-color: #fefefe;
    height: 834px;
    overflow: hidden;
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
  `,
  speechBubble: css`
    box-shadow: 0px 5px 8.2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fefefe;
    display: flex;
    justify-content: center;
    padding: 20px 30px;
	z-index: 999
  `,
  speechText: css`
    letter-spacing: -0.01em;
    line-height: 135%;
	z-index: 999
  `,
  triangleImage: css`
    width: 55.9px;
    height: 28px;
    margin-top: -8px;
  `,
  tiltedWhiteBox: css`
    position: absolute;
    top: 228.61px;
    left: 265px;
    background-color: #fefefe;
    width: 752px;
    height: 484px;
    transform: rotate(-6deg);
    transform-origin: 0 0;
  `,
    actionCardWrapper: css`
    position: absolute;
    top: 309px;
    left: 347px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  `,
  actionCard: css`
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 13px;
  `,
  actionImage: css`
    align-self: stretch;
    position: relative;
    border-radius: 10px;
    max-width: 100%;
    overflow: hidden;
    height: 221px;
    flex-shrink: 0;
    object-fit: cover;
  `,
  actionButton: css`
    align-self: stretch;
    border-radius: 4.36px;
    background-color: rgba(254, 254, 254, 0.5);
    border: 0.8px solid #8d94a0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 50px;
  `,
  actionButtonText: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
	font-size: 18px;
  `,
  actionPromptText: css`
    position: absolute;
    top: 215px;
    left: calc(50% + 6px);
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 600;
    color: #d6dbe2;
    text-align: left;
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
  const [ShowTextMessage, setShowTextMessage] = useState(false);
    const [showRetryMessage, setShowRetryMessage] = useState(false);
    const [showNextMessage, setShowNextMessage] = useState(false);
  const navigate = useNavigate();

  const handleReadyClick = () => {
    navigate("/scenario10");
  };

  const handleTextClick =() => {
    setShowTextMessage(true);
  }

  const handleNotSureClick = () => {
    setShowRetryMessage(true);
  };

  const handleSureClick = () => {
    setShowNextMessage(true);
  };

  return (
    <div className={styles.container}>
      <img className={styles.backgroundImage} src="/images/시나리오/배경/콘센트시나리오기본배경.png" alt="" />

      <div className={styles.profileBox}>
        <img className={styles.profileImage} src="/images/시나리오/객체/프로필사진.png" alt="" />
        <div className={styles.profileTextBox}>
          <div className={styles.profileName}>우리집 햄찌</div>
          <div className={styles.profileMode}>초보 소방관 모드</div>
        </div>
      </div>

      <img className={styles.bottomImage} src="/images/시나리오/소방곰/404돋보기소방곰.png" alt="" />

      <div className={styles.headerTextBox}>
        <b className={styles.headerTitle}>거실 콘센트에서 불이 났어요!</b>
        <div className={styles.headerDescription}>
          <div className={styles.stepText}>2단계</div>
          <div className={styles.stepText}>불이 나면 어떻게 해야할까?</div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <div className={styles.buttonGray} onClick={handleNotSureClick}>
          <div className={styles.stepText}>힌트</div>
        </div>
        <div className={styles.buttonOrange} onClick={handleSureClick}>
          <div className={styles.stepText}>다음 →</div>
        </div>
      </div>

      <div className={styles.speechBubbleBox}>
        <div className={styles.speechBubble}>
          <b className={styles.speechText}>
            <p style={{ margin: 0 }}>
              이런 불이 번지고 있어.<br />
              이럴 땐 어떻게 해야할까?
            </p>
          </b>
          {showRetryMessage && (
          <div className={styles.alertOverlay} onClick={() => setShowRetryMessage(false)}>
            <div className={styles.alertBox}>
              불을 끄려다 다칠 수 있으니까 먼저 피하는 게 중요해!
            </div>
          </div>
          )}
          {showNextMessage && (
          <div className={styles.alertOverlay} onClick={() => setShowNextMessage(false)}>
            <div className={styles.alertBox}>
              행동상자를 선택해줘!
            </div>
          </div>
          )}
          {ShowTextMessage && (
          <div className={styles.alertOverlay} onClick={() => setShowTextMessage(false)}>
            <div className={styles.alertBox}>
              다시 생각해보자!
            </div>
          </div>
          )}
        </div>
        <img className={styles.triangleImage} src="/images/시나리오/객체/말풍선삼각형.png" alt="" />
      </div>
	<div className={styles.actionPromptText}>
        세 가지 중에 햄찌가 해야할 행동을 골라볼까?
      </div>

      {/* 액션 카드 3개 */}
      <div className={styles.actionCardWrapper}>
        <div className={styles.actionCard}>
          <img className={styles.actionImage} src="/images/시나리오/선택소방곰/나가는소방곰.png" alt="" />
          <div className={styles.actionButton} onClick={handleReadyClick}>
            <div className={styles.actionButtonText}>당장 대피하기</div>
          </div>
        </div>
        <div className={styles.actionCard}>
          <img className={styles.actionImage} src="/images/시나리오/선택소방곰/전화하는소방곰.png" alt="" />
          <div className={styles.actionButton} onClick={handleTextClick}>
            <div className={styles.actionButtonText}>부모님께 전화하기</div>
          </div>
        </div>
        <div className={styles.actionCard}>
          <img className={styles.actionImage} src="/images/시나리오/선택소방곰/불끄는소방곰.png" alt="" />
          <div className={styles.actionButton} onClick={handleTextClick}>
            <div className={styles.actionButtonText}>불 끄기</div>
          </div>
        </div>
        
      </div>  
    </div>
  );
};

export default Component1;
