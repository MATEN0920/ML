import { css } from "@emotion/css";
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
  `,
  speechText: css`
	letter-spacing: -0.01em;
	line-height: 135%;
  `,
  triangleImage: css`
	width: 55.9px;
	height: 28px;
	margin-top: -8px;
  `,
    speechCard: css`
    position: absolute;
    border-radius: 10px;
    background-color: #fefefe;
  `,
  speechCard1: css`
    top: 310px;
    left: 517px;
    width: 592px;
    height: 112px;
  `,
  speechCardText1: css`
    position: absolute;
    top: 355px;
    left: 686px;
    letter-spacing: -0.01em;
    line-height: 135%;
    font-weight: bold;
  `,
  speechCardLabel1: css`
    position: absolute;
    top: 326px;
    left: calc(50% + 180px);
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 600;
    color: #ff643e;
    text-align: left;
  `,
  speechCard2: css`
    top: 453px;
    left: 517px;
    width: 592px;
    height: 151px;
  `,
  speechCardText2: css`
    position: absolute;
    top: 498px;
    left: 648px;
    letter-spacing: -0.01em;
    line-height: 135%;
    display: inline-block;
    width: 411px;
    font-weight: bold;
  `,
  speechCardLabel2: css`
    position: absolute;
    top: 469px;
    left: calc(50% + 180px);
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 600;
    color: #ff643e;
    text-align: left;
  `,
  fireInfoWrapper: css`
    position: absolute;
    top: 189px;
    left: 644px;
    width: 339px;
    height: 70px;
    color: #fefefe;
  `,
  fireInfoLabel: css`
    position: absolute;
    top: 0px;
    font-size: 18px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
    color: #ff977e;
  `,
  fireInfoTitle: css`
    position: absolute;
    top: 32px;
    letter-spacing: -0.01em;
    line-height: 135%;
    font-weight: bold;
  `,
};

const Component1 = () => {
	const navigate = useNavigate();

  const handleReadyClick = () => {
    navigate("/completescenario");
  };

  const handleNotSureClick = () => {
    navigate("/scenario23");
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
		  <div className={styles.stepText}>5단계</div>
		  <div className={styles.stepText}>화재 신고는 어떻게 해야할까?</div>
		</div>
	  </div>

	  <div className={styles.buttonWrapper}>
		<div className={styles.buttonGray} onClick={handleNotSureClick}>
		  <div className={styles.stepText}>이전</div>
		</div>
		<div className={styles.buttonOrange} onClick={handleReadyClick}>
		  <div className={styles.stepText}>다음 →</div>
		</div>
	  </div>

	  <div className={styles.speechBubbleBox}>
		<div className={styles.speechBubble}>
		  <b className={styles.speechText}>
			<p style={{ margin: 0 }}>
			  잘했어! 소방관들이<br />
			  도와주려면 우리집의<br />
			  주소를 알려줘야해. 같이 읽어볼까?
			</p>
		  </b>
		</div>
		<img className={styles.triangleImage} src="/images/시나리오/객체/말풍선삼각형.png" alt="" />
		
	  </div>
	  {/* 🔥 화재 위치 정보 */}
	<div className={styles.fireInfoWrapper}>
	<div className={styles.fireInfoLabel} style={{ left: 0 }}>화재 위치</div>
	<div className={styles.fireInfoLabel} style={{ left: 270 }}>화재 종류</div>
	<b className={styles.fireInfoTitle} style={{ left: 8 }}>거실</b>
	<b className={styles.fireInfoTitle} style={{ left: 274 }}>콘센트</b>
	</div>

	{/* 🗣️ 첫 번째 따라읽기 카드 */}
	<div className={`${styles.speechCard} ${styles.speechCard1}`} />
	<b className={styles.speechCardText1}>거실 콘센트에서 불이 났어요!</b>
	<div className={styles.speechCardLabel1}>따라 읽어보세요</div>

	{/* 🗣️ 두 번째 따라읽기 카드 */}
	<div className={`${styles.speechCard} ${styles.speechCard2}`} />
	<b className={styles.speechCardText2}>
	저희 집 주소는 경기도 시흥시 신천동<br />
	신천고등학교 1동 202호이예요!
	</b>
	<div className={styles.speechCardLabel2}>따라 읽어보세요</div>
	</div>
  );
};

export default Component1;
