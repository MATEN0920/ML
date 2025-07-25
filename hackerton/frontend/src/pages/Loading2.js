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
  width: 592px;
  height: 448px;
  object-fit: cover;
  margin-bottom: 32px;
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
    const FirstMain = () => {
      navigate("/");
    };
  return (
    <div className={wrapperStyle}>
      <div className={whiteBoxStyle}>
        <b className={titleStyle}>
          <p className={paragraphStyle}>
            잠시만 기다려주세요! 소방곰이 우리집에 딱 맞는
          </p>
          <p className={paragraphStyle}>
            화재 대피 훈련 시나리오를 생성하고 있어요!
          </p>
        </b>
        <img className={imageStyle} alt="" src="/images/곰/생성중인소방곰.png" />
        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={HouseStep1}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnWithTextStyle} onClick={FirstMain}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;
