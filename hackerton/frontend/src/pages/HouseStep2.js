import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

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

const sidebarStyle = css`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #f6f7f9;
  width: 351px;
  height: 834px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 40px 28px 52px 40px;
  box-sizing: border-box;
`;

const sidebarContentStyle = css`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const sidebarTopStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 62px;
`;

const sidebarHomeStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`;

const sidebarDescStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 24px;
`;

const sidebarStepListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 16px;
  color: #8d94a0;
`;

const stepItemStyle = css`
  align-self: stretch;
  border-radius: 8px;
  background-color: #fefefe;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
`;

const stepActiveStyle = css`
  ${stepItemStyle};
  border: 1px solid #ff643e;
  color: #ff643e;
`;

const stepBadgeStyle = (color) => css`
  border-radius: 100px;
  background-color: ${color};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  font-size: 13px;
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
  font-size: 20px;
  color: #e85b38;
`;

const stepIndicatorStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const stepTextStyle = css`
  font-weight: 600;
  color: #8d94a0;
`;

const canvasInstructionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 24px;
  color: #232323;
`;

const canvasGuideStyle = css`
  font-size: 16px;
  color: #2098f3;
  font-weight: 500;
`;

const canvasWrapperStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 21px;
  font-size: 10.18px;
  text-align: center;
`;

const layoutCanvasStyle = css`
  width: 341px;
  height: 301px;
  position: relative;
`;

const cautionBoxStyle = css`
  width: 362px;
  height: 461px;
  border-radius: 8px;
  background-color: #f6f7f9;
  border: 1px dashed #bdc5d0;
  padding: 24px 18px;
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  color: #d63d4a;
`;

const bottomNavStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
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
`;

const navBtnWithTextStyle = css`
  border-radius: 6px;
  background-color: #d6dbe2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
`;

const navBtnTextStyle = css`
  position: relative;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
`;
const sidebarImageStyle = css`width: 172px; height:233; position: relative; max-height: 100%; object-fit: cover;`;

const Loginstep2 = () => {
  const navigate = useNavigate();
  const HouseStep1 = () => {
      navigate("/housestep1");
    };
  
    const HouseStep3 = () => {
      navigate("/housestep3");
    };

    const FirstMain = () => {
      navigate("/");
    };
  return (
    <div className={wrapperStyle}>
      <div className={sidebarStyle}>
        <div className={sidebarContentStyle}>
          <div className={sidebarTopStyle}>
            <div className={sidebarHomeStyle} onClick={FirstMain}>
              <div>← 홈으로</div>
            </div>
            <div className={sidebarDescStyle}>
              <b>
                <p>화재 대피 훈련을 진행할<br />장소에 대해 곰곰소방단 에게 알려주세요!</p>
              </b>
              <img src="/images/곰/인사소방곰.png" alt="" className={sidebarImageStyle}/>
            </div>
          </div>

          <div className={sidebarStepListStyle}>
            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>01</div>
                <div style={{ fontWeight: 600 }}>집 주소 입력하기</div>
              </div>
              <div className={stepBadgeStyle('#f6f7f9')}>완료</div>
            </div>

            <div className={stepActiveStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>02</div>
                <div style={{ fontWeight: 600, color: '#0f1114' }}>집 전개도 등록하기</div>
              </div>
              <div className={stepBadgeStyle('#fff0ec')}>진행중</div>
            </div>

            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>03</div>
                <div style={{ fontWeight: 600 }}>집 공간 스캔하기</div>
              </div>
              <div className={stepBadgeStyle('#eaecf0')}>미완료</div>
            </div>

            <div className={stepItemStyle}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>04</div>
                <div style={{ fontWeight: 600 }}>화재 요인 등록하기</div>
              </div>
              <div className={stepBadgeStyle('#eaecf0')}>미완료</div>
            </div>
          </div>
        </div>
      </div>

      <div className={mainContentStyle}>
        <div className={stepIndicatorStyle}>
          <div>
            <b>2</b><span className={stepTextStyle}>/4</span>
          </div>

          <div className={canvasInstructionStyle}>
            <b>집의 전개도를 그려주세요</b>
            <div className={canvasGuideStyle}>*아래의 도형을 이용해 우리집의 전개도를 그려주세요</div>
          </div>

          <div className={canvasWrapperStyle}>
            <div className={layoutCanvasStyle}>
			<div
				style={{
				position: 'absolute',
				height: '80px',
				width: '110px',
				top: '51.83%',
				left: '11.44%',
				backgroundColor: '#e0e0e0',
				borderRadius: '4.14px',
				border: '1px solid #ccc',
				}}
			/>
			<div
				style={{
				position: 'absolute',
				height: '88px',
				width: '100px',
				top: '31.56%',
				left: '73.31%',
				backgroundColor: '#e0e0e0',
				borderRadius: '4.14px',
				border: '1px solid #ccc',
				}}
			/>
			<div
				style={{
				position: 'absolute',
				height: '90px',
				width: '190px',
				top: '0%',
				left: '45.45%',
				backgroundColor: '#e0e0e0',
				borderRadius: '4.14px',
				border: '1px solid #ccc',
				}}
			/>
			<div
				style={{
				position: 'absolute',
				height: '145px',
				width: '145px',
				top: '0%',
				left: '0%',
				backgroundColor: '#e0e0e0',
				borderRadius: '4.14px',
				border: '1px solid #ccc',
				}}
			/>
			<div
				style={{
				position: 'absolute',
				height: '90px',
				width: '90px',
				top: '70.1%',
				left: '73.31%',
				backgroundColor: '#e0e0e0',
				borderRadius: '3.11px',
				border: '1px solid #ccc',
				}}
			/>
			</div>
			<div
				style={{
				position: 'absolute',
				height: '186px',
				width: '86px',
				top: '33.56%',
				left: '23%',
				backgroundColor: '#e0e0e0',
				borderRadius: '4.14px',
				border: '1px solid #ccc',
				}}
			/>

            <div className={cautionBoxStyle}>
              * 모양만 선택 할수 있어요. 공간의 크기는 반영이 불가능해요.
            </div>
          </div>
        </div>

        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={HouseStep1}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnWithTextStyle} onClick={HouseStep3}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginstep2;
