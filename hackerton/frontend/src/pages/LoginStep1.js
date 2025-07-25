import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const wrapperStyle = css`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f6f7f9;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #e85b38;
  font-family: Pretendard;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const containerStyle = css`
  width: 1194px;
  height: 834px;
  background-color: #fefefe;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 32px 180px;
  box-sizing: border-box;
  position: relative;
`;

const stepCounterStyle = css`
  position: relative;
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const stepNumberStyle = css``;

const stepTotalStyle = css`
  font-weight: 600;
  color: #8d94a0;
`;

const topContentStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

const mainContentStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  font-size: 24px;
  color: #232323;
`;

const titleBoxStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

const titleTextStyle = css`
  position: relative;
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const guideTextStyle = css`
  position: relative;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-transform: capitalize;
  font-weight: 500;
  color: #2098f3;
`;

const inputSectionStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 20px;
  color: #5d6673;
`;

const inputBoxGroupStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const labelGroupStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const labelTextStyle = css`
  align-self: stretch;
  position: relative;
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const phoneRowStyle = css`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  font-size: 16px;
  color: #bdc5d0;
`;

const phoneInputStyle = css`
  flex: 1;
  height: 48px;
  border-radius: 6px;
  background-color: #f6f7f9;
  border: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const phoneTextField = css`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #232323;

  &::placeholder {
    color: #bdc5d0;
    text-transform: capitalize;
  }
`;

const authButtonStyle = css`
  align-self: stretch;
  width: 132px;
  border-radius: 6px;
  background-color: #eaecf0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  box-sizing: border-box;
  color: #5d6673;
`;

const authButtonTextStyle = css`
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

const Step01Default = () => {

    const navigate = useNavigate();
  
    const Login = () => {
      navigate("/");
    };
  
    const LoginStep2 = () => {
      navigate("/loginstep2");
    };

  return (
    <div className={wrapperStyle}>
      <div className={containerStyle}>
        {/* 진행 단계 표시 */}
        <div className={topContentStyle}>
          <div className={stepCounterStyle}>
            <b className={stepNumberStyle}>1</b>
            <span className={stepTotalStyle}>/2</span>
          </div>

          {/* 제목 및 안내 문구 */}
          <div className={mainContentStyle}>
            <div className={titleBoxStyle}>
              <b className={titleTextStyle}>회원가입을 위해 기본 정보를 입력해주세요</b>
              <div className={guideTextStyle}>
                * 어린이의 경우, 부모님과 함께 회원가입을 진행해주세요
              </div>
            </div>

            {/* 입력 영역 */}
            <div className={inputSectionStyle}>
              <div className={inputBoxGroupStyle}>
                {/* 휴대폰 번호 */}
                <div className={labelGroupStyle}>
                  <b className={labelTextStyle}>휴대폰 번호</b>
                  <div className={phoneRowStyle}>
                    <div className={phoneInputStyle}>
                      <input
                        type="text"
                        className={phoneTextField}
                        placeholder="-를 제외하고 숫자만 입력해주세요"
                      />
                    </div>
                  </div>
                </div>

                {/* 아이디 */}
                <div className={labelGroupStyle}>
                  <b className={labelTextStyle}>아이디</b>
                  <div className={phoneRowStyle}>
                    <div className={phoneInputStyle}>
                      <input
                        type="text"
                        className={phoneTextField}
                        placeholder="아이디를 입력해주세요"
                      />
                    </div>
                  </div>
                </div>

                {/* 비밀번호 */}
                <div className={labelGroupStyle}>
                  <b className={labelTextStyle}>비밀번호</b>
                  <div className={phoneRowStyle}>
                    <div className={phoneInputStyle}>
                      <input
                        type="text"
                        className={phoneTextField}
                        placeholder="영어, 숫자 포함 8-20자 이내"
                      />
                    </div>
                  </div>
                </div>

                {/* 비밀번호 확인 */}
                <div className={labelGroupStyle}>
                  <b className={labelTextStyle}>비밀번호 확인하기</b>
                  <div className={phoneRowStyle}>
                    <div className={phoneInputStyle}>
                      <input
                        type="text"
                        className={phoneTextField}
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 이전/다음 버튼 */}
        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={Login}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnWithTextStyle} onClick={LoginStep2}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step01Default;