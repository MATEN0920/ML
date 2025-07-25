import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const wrapper = css`
  width: 100vw;
  height: 100vh;
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const container = css`
  width: 1194px;
  height: 834px;
  position: relative;
  background-color: #fefefe;
  overflow: hidden;
  text-align: left;
  font-size: 18px;
  color: #fefefe;
  font-family: Pretendard;
`;

const title = css`
  position: absolute;
  top: 105px;
  left: calc(50% - 151px);
  font-size: 24px;
  letter-spacing: -0.01em;
  line-height: 135%;
  color: #232323;
`;

const subtitle = css`
  position: absolute;
  top: 144px;
  left: calc(50% - 180px);
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
  color: #8d94a0;
`;

const imageCard = css`
  position: absolute;
  border-radius: 15px;
  width: 306px;
  height: 410px;
  overflow: hidden;
  object-fit: contain;
`;

const loginSection = css`
  position: absolute;
  top: 667px;
  left: calc(50% - 156px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const loginButton = css`
  width: 312px;
  border-radius: 6px;
  background-color: #ff977e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
`;

const loginText = css`
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
`;

const linkRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #5d6673;
`;

const linkText = css`
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
`;

const FirstMain = () => {
  const navigate = useNavigate();

  const Login = () => {
    navigate("/login");
  };

  const Signup = () => {
    navigate("/loginstep1");
  };

  return (
    <div className={wrapper}>
      <div className={container}>
        {/* 왼쪽 카드 */}
        <img
          className={css`${imageCard}; top: 220px; left: calc(50% - 428.25px);`}
          src="/images/곰/메인왼쪽소방곰.png"
          alt=""
        />

        {/* 중앙 카드 */}
        <img
          className={css`${imageCard}; top: 220px; left: calc(50% - 134.25px);`}
          src="/images/곰/메인중간소방곰.png"
          alt=""
        />

        {/* 오른쪽 카드 */}
        <img
          className={css`${imageCard}; top: 220px; left: calc(50% + 159.75px);`}
          src="/images/곰/메인오른쪽소방곰.png"
          alt=""
        />

        {/* 텍스트 */}
        <b className={title}>안녕하세요, 곰곰소방단 입니다</b>
        <div className={subtitle}>서비스를 사용하려면 로그인 또는 회원가입 해주세요</div>

        {/* 로그인 버튼 및 링크 */}
        <div className={loginSection}>
          <div className={loginButton} onClick={Login}>
            <div className={loginText}>로그인하기</div>
          </div>
          <div className={linkRow}>
            <div className={linkText}>아이디 찾기</div>|
            <div className={linkText}>비밀번호 찾기</div>|
            <div className={linkText} onClick={Signup}>회원가입</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstMain;
