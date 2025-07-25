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

    badgeContainer: css`
    position: absolute;
    top: 161px;
    left: calc(50% - 127px);
    width: 255px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
    color: #fff;
    text-align: center;
    font-size: 28px;
  `,
  badgeImageWrapper: css`
    width: 289.1px;
    position: relative;
    height: 289.1px;
    overflow: hidden;
    flex-shrink: 0;
  `,
  badgeImage: css`
    position: absolute;
    top: -78px;
    left: -3.96px;
    width: 300.2px;
    height: 450.2px;
    object-fit: contain;
  `,
  badgeTextBlock: css`
    width: 245px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  `,
  badgeTitle: css`
    align-self: stretch;
    position: relative;
    letter-spacing: -0.01em;
    line-height: 135%;
    font-weight: bold;
  `,
  badgeDate: css`
    align-self: stretch;
    position: relative;
    font-size: 14px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
    opacity: 0.5;
  `,
  badgeDesc: css`
    align-self: stretch;
    position: relative;
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
    opacity: 0.5;
  `,

};

const Component1 = () => {
	const navigate = useNavigate();

   const handleReadyClick = () => {
    navigate("/main");
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
		  <div className={styles.stepText}>시나리오 완료</div>
		</div>
	  </div>

	  <div className={styles.buttonWrapper}>
		<div className={styles.buttonOrange} onClick={handleReadyClick}>
		  <div className={styles.stepText}>종료 →</div>
		</div>
	  </div>

	  <div className={styles.speechBubbleBox}>
		<div className={styles.speechBubble}>
		  <b className={styles.speechText}>
			<p style={{ margin: 0 }}>
			  잘했어! 햄찌야! 이제 콘센트에서<br />
			  불이나면 어떻게 해야하는지 알겠지?<br />
			  우리 다음에 또 보자~ 그럼 안녕!
			</p>
		  </b>
		</div>
		<img className={styles.triangleImage} src="/images/시나리오/객체/말풍선삼각형.png" alt="" />
	  </div>
	  {/* 🏅 명예 소방관 뱃지 카드 */}
<div className={styles.badgeContainer}>
  <div className={styles.badgeImageWrapper}>
    <img
      className={styles.badgeImage}
      src="/images/배지/콘센트배지획득.png"
      alt="뱃지 이미지"
    />
  </div>
  <div className={styles.badgeTextBlock}>
    <b className={styles.badgeTitle}>명예 소방관 뱃지 획득!</b>
    <div className={styles.badgeDate}>00.00.00 완료</div>
    <div className={styles.badgeDesc}>
      <p style={{ margin: 0 }}>시나리오: 거실 콘센트에서 불이 났어요!</p>
      <p style={{ margin: 0 }}>난이도 중 / 완료 시간 00분 00초</p>
    </div>
  </div>
</div>
	</div>
  );
};

export default Component1;
