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
    cursor: pointer;
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
    z-index: 999;
  `,
  speechText: css`
    letter-spacing: -0.01em;
    line-height: 135%;
    z-index: 999;
  `,
  triangleImage: css`
    width: 55.9px;
    height: 28px;
    margin-top: -8px;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 13px;
  `,
  actionImage: css`
    width: 100%;
    height: 221px;
    border-radius: 10px;
    object-fit: cover;
    background-color: white;
  `,
  actionButton: css`
    border-radius: 4.36px;
    background-color: white;
    border: 1.5px solid #8d94a0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 20px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s, color 0.2s;
    width: 210px;
  `,
  actionButtonText: css`
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 18px;
  `,
  actionButtonOrange: css`
    border-radius: 4.36px;
    background-color: #ff643e;
    border: 1.5px solid #ff643e;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 20px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s, color 0.2s;
    width: 210px;
  `,
  actionButtonTextOrange: css`
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 18px;
    color: #fefefe;
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
  const [selectedAction, setSelectedAction] = useState(null);
  const [showRetryMessage, setShowRetryMessage] = useState(false);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setSelectedAction(index);
  };

  const handleNotSureClick = () => {
    setShowRetryMessage(true);
  };

  const handleNextClick = () => {
    if (selectedAction === 0) navigate("/scenario19");
    else if (selectedAction === 1) navigate("/scenario20");
    else if (selectedAction === 2) navigate("/scenario21");
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

      <img className={styles.bottomImage} src="/images/시나리오/소방곰/404엄지척소방곰.png" alt="" />

      <div className={styles.headerTextBox}>
        <b className={styles.headerTitle}>거실 콘센트에서 불이 났어요!</b>
        <div className={styles.headerDescription}>
          <div className={styles.stepText}>4단계</div>
          <div className={styles.stepText}>대피 후엔 어떻게 해야할까?</div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <div className={styles.buttonGray} onClick={handleNotSureClick}>
          <div className={styles.stepText}>잘 모르겠어</div>
        </div>
        <div className={styles.buttonOrange} onClick={handleNextClick}>
          <div className={styles.stepText}>다음 →</div>
        </div>
      </div>

      <div className={styles.speechBubbleBox}>
        <div className={styles.speechBubble}>
          <b className={styles.speechText}>
            <p style={{ margin: 0 }}>
              계단을 이용해서<br />건물 밖으로 대피 후엔<br />어떻게 해야할까?
            </p>
          </b>
          {showRetryMessage && (
            <div className={styles.alertOverlay} onClick={() => setShowRetryMessage(false)}>
              <div className={styles.alertBox}>행동상자를 클릭해보자!</div>
            </div>
          )}
        </div>
        <img className={styles.triangleImage} src="/images/시나리오/객체/말풍선삼각형.png" alt="" />
      </div>

      <div className={styles.actionPromptText}>세 가지 중에 햄찌가 해야할 행동을 골라볼까?</div>

      <div className={styles.actionCardWrapper}>
        {["119신고하기", "불이야 크게 외치기", "도움 요청하기"].map((text, idx) => (
          <div className={styles.actionCard} key={idx}>
            <img
              className={styles.actionImage}
              src={`/images/시나리오/선택문/${text.replace(/!| /g, "")}.png`}
              alt=""
            />
            <div
              className={selectedAction === idx ? styles.actionButtonOrange : styles.actionButton}
              onClick={() => handleClick(idx)}
            >
              <div
                className={
                  selectedAction === idx ? styles.actionButtonTextOrange : styles.actionButtonText
                }
              >
                {text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component1;
