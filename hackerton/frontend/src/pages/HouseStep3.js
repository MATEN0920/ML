import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

// ✅ 스타일 정의
const container = css`
  width: 100%;
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

const scanArea = css`
  width: 739px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  font-size: 20.36px;
  color: #bdc5d0;
`;

const scanBox = css`
  align-self: stretch;
  border-radius: 6px;
  background-color: #f6f7f9;
  border: 1px dashed #d6dbe2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const imageContainer = css`
  width: 706px;
  height: 376px;
  position: relative;
`;

const imageStyle = css`
  position: absolute;
  border-radius: 8.29px;
  width: 222px;
  height: 176px;
  object-fit: contain;
`;

const largeImage = css`
  position: absolute;
  top: 2px;
  left: 0px;
  border-radius: 8.29px;
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const boxOverlay = css`
  position: absolute;
  top: 1.22px;
  left: 299.22px;
  border-radius: 8.29px;
  background-color: #eaecf0;
  border: 1.6px solid #8d94a0;
  box-sizing: border-box;
  width: 181.6px;
  height: 373.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 158.2px 29.8px;
`;

const buttonBox = css`
  border-radius: 8.73px;
  background-color: #f6f7f9;
  border: 1.6px solid #bdc5d0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12.5px 18.8px;
`;

const scanButton = css`
  width: 739px;
  border-radius: 6px;
  background-color: #eaecf0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 10px;
  gap: 6px;
  font-size: 16px;
  color: #5d6673;
`;

const bottomNavStyle = css`
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #fefefe;
`;

const navBtnStyle = css`
  border-radius: 6px;
  background-color: #d6dbe2;
  padding: 14px 20px;
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

const sidebarImageStyle = css`
  width: 184px;
  height: 276px;
position: relative;
max-width: 100%;
overflow: hidden;
max-height: 100%;
object-fit: cover;
`;

// ✅ 컴포넌트 JSX
const Step024 = () => {
    const navigate = useNavigate();
  const HouseStep2 = () => {
      navigate("/housestep2");
    };
  
    const HouseStep4 = () => {
      navigate("/housestep4");
    };

    const FirstMain = () => {
      navigate("/");
    };
  return (
    <div className={container}>
      <div className={mainCard}>
        <div className={stepHeader}>
          <div className={stepCount}>
            <b>3</b>
            <span className={stepTotal}>/4</span>
          </div>
          <div className={stepTitle}>
            <b className={stepTitleText}>촬영할 공간을 선택하고 스캔해주세요</b>
            <div className={stepSubText}>
              * 스캔 전 주의사항 : 화재 위험 요소나 소화전이 잘 보이도록 정리해주세요
            </div>
          </div>
        </div>

        <div className={scanArea}>
          <div className={scanBox}>
            <div className={imageContainer}>
              <img className={imageStyle} style={{ top: "2px", left: "480px" }} src="Frame 2085669432.png" alt="" />
              <img className={imageStyle} style={{ top: "178px", left: "480px" }} src="Frame 2085669436.png" alt="" />
              <div className={boxOverlay}>
                <div className={buttonBox}>거실</div>
              </div>
              <img className={largeImage} src="Frame 2085669434.png" alt="" />
            </div>
          </div>
          <div className={scanButton}>영상 촬영하기</div>
        </div>

        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={HouseStep2}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnStyle} onClick={HouseStep4}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>

      <div className={sidebarStyle}>
        <div className={sidebarContentStyle}>
          <div className={sidebarTopStyle} onClick={FirstMain}>
            <div className={sidebarHomeStyle}>← 홈으로</div>
            <div className={sidebarDescStyle}>
              <b>
                화재 대피 훈련을 진행할<br />
                장소에 대해 곰곰소방단 에게 알려주세요!
              </b>
              <img src="/images/곰/촬영소방곰.png" alt="" className={sidebarImageStyle} />
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
                <div style={{ fontWeight: 600, color: '#0f1114' }}>집 공간 스캔하기</div>
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

export default Step024;
