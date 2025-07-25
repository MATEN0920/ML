import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  align-items: center;
  padding: 32px 180px;
  box-sizing: border-box;
`;

const topContentStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  align-items: center;
`;

const stepCounterStyle = css`
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const stepNumberStyle = css``;

const stepTotalStyle = css`
  font-weight: 600;
  color: #8d94a0;
`;

const mainContentStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 24px;
  color: #232323;
  flex-grow: 1;
`;

const titleBoxStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const titleTextStyle = css`
  position: relative;
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const guideTextStyle = css`
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 140%;
  font-weight: 500;
  color: #2098f3;
  text-transform: capitalize;
`;

const inputSectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 20px;
  color: #5d6673;
`;

const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const inputLabelStyle = css`
  letter-spacing: -0.01em;
  line-height: 135%;
`;

const inputBoxStyle = css`
  border-radius: 6px;
  background-color: #f6f7f9;
  border: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  padding: 15px 16px;
  font-size: 16px;
  color: #bdc5d0;
`;


const placeholderStyle = css`
  letter-spacing: -0.01em;
  line-height: 140%;
  font-weight: 500;
  text-transform: capitalize;
`;

const dropdownBoxStyle = css`
  border-radius: 6px;
  background-color: #f6f7f9;
  border: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  font-size: 16px;
  color: #bdc5d0;
  height: 51px;
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

const Step02Default = () => {
      const navigate = useNavigate();
      const [childName, setChildName] = useState('');
      const [childAge, setChildAge] = useState('');
      const [childFeatures, setChildFeatures] = useState('');
      const [guardianName, setGuardianName] = useState('');
      const [relationship, setRelationship] = useState('');
  
    const LoginStep1 = () => {
      navigate("/loginstep1");
    };
  
    const Loading1 = () => {
      navigate("/loading1");
    };
  return (
    <div className={wrapperStyle}>
      <div className={containerStyle}>
        <div className={topContentStyle}>
          <div className={stepCounterStyle}>
            <b className={stepNumberStyle}>2</b>
            <span className={stepTotalStyle}>/2</span>
          </div>

          <div className={mainContentStyle}>
            <div className={titleBoxStyle}>
              <b className={titleTextStyle}>서비스를 사용할 어린이와 보호자 정보를 입력해주세요</b>
              <div className={guideTextStyle}>
                * 어린이의 경우, 부모님과 함께 회원가입을 진행해주세요
              </div>
            </div>

            <div className={inputSectionStyle}>
              <div className={inputGroupStyle}>
                <b className={inputLabelStyle}>어린이 이름</b>
                <input
                  className={inputBoxStyle}
                  placeholder="예) 김소방"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                />
              </div>

              <div className={inputGroupStyle}>
                <b className={inputLabelStyle}>어린이 나이</b>
                <input
                  className={inputBoxStyle}
                  placeholder="예) 7세"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                />
              </div>

              <div className={inputGroupStyle}>
                <b className={inputLabelStyle}>특징</b>
                <input
                  className={inputBoxStyle}
                  placeholder="어린이의 성격 / 취미 / 관심사 등에 대해서 알려주세요."
                  value={childFeatures}
                  onChange={(e) => setChildFeatures(e.target.value)}
                />
              </div>

              <div className={inputGroupStyle}>
                <b className={inputLabelStyle}>보호자 이름</b>
                <input
                  className={inputBoxStyle}
                  placeholder="예) 홍길동"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                />
              </div>

              <div className={inputGroupStyle}>
                <b className={inputLabelStyle}>어린이와의 관계</b>
                <select
                  className={dropdownBoxStyle}
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                >
                  <option value="">관계를 선택해주세요</option>
                  <option value="부모">부모</option>
                  <option value="조부모">조부모</option>
                  <option value="보호자">보호자</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={LoginStep1}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnStyle} onClick={Loading1}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step02Default;
