import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const wrapperStyle = css`
  width: 100vw;
  position: relative;
  background-color: #d3d3d3;
  height: 100vh;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #e85b38;
  font-family: Pretendard;
  justify-content: center;
  align-items: center;
`;

const whiteBoxStyle = css`
  position: absolute;
  border-radius: 12px;
  background-color: #f6f7f9;
  position: relative;
  width: 1194px;
  height: 834px;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  color: #232323;
  align-items: flex-end;
  justify-content: space-between;
  padding: 32px 180px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const titleStyle = css`
  letter-spacing: -0.01em;
  line-height: 135%;
  margin-bottom: 32px;
`;

const paragraphStyle = css`
  margin: 0;
`;

const imageStyle = css`
  width: 426px;
  height: 321.9px;
  object-fit: cover;
  margin-bottom: 32px;
`;

const stepContainer = css`
  width: 749px;
  height: 70px;
  font-size: 16px;
  color: #8d94a0;
  position: relative;
  margin-bottom: 40px;
`;

const stepBox = (left) => css`
  position: absolute;
  top: 0px;
  left: ${left}px;
  width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

const stepTitle = css`
  align-self: stretch;
  position: relative;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 600;
`;

const stepLabelBox = css`
  align-self: stretch;
  border-radius: 8px;
  background-color: #f6f7f9;
  border: 1px solid #bdc5d0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  text-align: left;
  font-size: 14px;
`;

const stepLabelText = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const labelText = css`
  position: relative;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
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

const Component1 = () => {

      const navigate = useNavigate();
  
    const HouseStep1 = () => {
      navigate("/housestep1");
    };
  
    const LoginStep1 = () => {
      navigate("/loginstep1");
    };

  return (
    <div className={wrapperStyle}>
      <div className={whiteBoxStyle}>
        <b className={titleStyle}>
          <p className={paragraphStyle}>
            소방곰이 딱 맞는 화재 대피 시나리오를 만들 수 있도록
          </p>
          <p className={paragraphStyle}>
            우리집에 대한 정보를 먼저 알려주세요! 바로 시작해볼까요?
          </p>
        </b>
        <img className={imageStyle} alt="" src="/images/곰/기다려소방곰.png" />
		<div className={stepContainer}>
          <div className={stepBox(0)}>
            <div className={stepTitle}>1단계</div>
            <div className={stepLabelBox}>
              <div className={stepLabelText}>
                <div className={labelText}>집 주소 입력하기</div>
              </div>
            </div>
          </div>
          <div className={stepBox(193)}>
            <div className={stepTitle}>2단계</div>
            <div className={stepLabelBox}>
              <div className={stepLabelText}>
                <div className={labelText}>집 전개도 등록하기</div>
              </div>
            </div>
          </div>
          <div className={stepBox(386)}>
            <div className={stepTitle}>3단계</div>
            <div className={stepLabelBox}>
              <div className={stepLabelText}>
                <div className={labelText}>집 공간 스캔하기</div>
              </div>
            </div>
          </div>
          <div className={stepBox(579)}>
            <div className={stepTitle}>4단계</div>
            <div className={stepLabelBox}>
              <div className={stepLabelText}>
                <div className={labelText}>화재 요인 등록하기</div>
              </div>
            </div>
          </div>
		  </div>
        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={LoginStep1}>
            <div className={navBtnTextStyle}>다시하기</div>
          </div>
          <div className={navBtnWithTextStyle }onClick={HouseStep1}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;
