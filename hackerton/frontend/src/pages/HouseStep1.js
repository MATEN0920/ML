import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const wrapperStyle = css`width: 1194px; position: relative; background-color: #f6f7f9; height: 834px; overflow: hidden; text-align: left; font-size: 18px; color: #363d47; font-family: Pretendard;`;

const sidebarWrapperStyle = css`position: absolute; top: 0px; left: 0px; background-color: #f6f7f9; width: 351px; height: 834px; display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; padding: 40px 28px 52px 40px; box-sizing: border-box;`;

const sidebarContentStyle = css`align-self: stretch; flex: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 0px;`;

const sidebarTopStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 62px;`;

const homeLinkStyle = css`display: flex; flex-direction: row; align-items: flex-end; justify-content: flex-start; gap: 8px;`;

const homeTextStyle = css`position: relative; letter-spacing: -0.01em; line-height: 140%; text-transform: capitalize; font-weight: 500;`;

const sidebarTitleStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 24px; font-size: 24px;`;

const sidebarBoldTextStyle = css`align-self: stretch; position: relative; letter-spacing: -0.01em; line-height: 135%;`;

const sidebarImageStyle = css`width: 172px; height:233; position: relative; max-height: 100%; object-fit: cover;`;

const stepsContainerStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; font-size: 16px; color: #8d94a0;`;

const stepBoxGroupStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 12px;`;

const stepActiveStyle = css`align-self: stretch; border-radius: 8px; background-color: #fefefe; border: 1px solid #ff643e; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 12px 18px; gap: 0px; color: #ff643e;`;

const stepTextContainerStyle = css`display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 12px;`;

const stepNumStyle = css`position: relative; letter-spacing: -0.01em; line-height: 140%; text-transform: capitalize; font-weight: 500;`;

const stepTitleStyle = css`position: relative; letter-spacing: -0.01em; line-height: 140%; text-transform: capitalize; font-weight: 600; color: #0f1114;`;

const stepTagActiveStyle = css`border-radius: 100px; background-color: #fff0ec; display: flex; flex-direction: row; align-items: center; justify-content: center; padding: 6px 10px; font-size: 13px;`;

const stepTagInactiveStyle = css`border-radius: 100px; background-color: #eaecf0; display: flex; flex-direction: row; align-items: center; justify-content: center; padding: 6px 10px; font-size: 13px;`;

const stepItemStyle = css`align-self: stretch; border-radius: 8px; background-color: #fefefe; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 12px 18px; gap: 0px;`;

const mainPanelStyle = css`position: absolute; top: 40px; left: 351px; border-radius: 12px; background-color: #fefefe; width: 803px; height: 754px; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; padding: 32px; box-sizing: border-box; gap: 0px; font-size: 20px; color: #e85b38;`;

const mainStepIndicatorStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 16px;`;

const stepCountStyle = css`position: relative; letter-spacing: -0.01em; line-height: 135%;`;

const stepCountGrayStyle = css`font-weight: 600; color: #8d94a0;`;

const mainFormSectionStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 24px; font-size: 24px; color: #232323;`;

const inputGroupStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 20px; font-size: 20px; color: #5d6673;`;

const inputBlockStyle = css`align-self: stretch; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 12px;`;

const inputTitleStyle = css`align-self: stretch; position: relative; letter-spacing: -0.01em; line-height: 135%;`;

const inputBoxStyle = css`align-self: stretch; border-radius: 6px; background-color: #f6f7f9; border: 1px solid #eaecf0; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 15px 16px; gap: 0px; font-size: 16px; color: #bdc5d0;`;

const inputHalfStyle = css`flex: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 12px;`;

const inputHalfBoxStyle = css`width: 359.5px; border-radius: 6px; background-color: #f6f7f9; border: 1px solid #eaecf0; box-sizing: border-box; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; padding: 15px 16px; font-size: 16px; color: #bdc5d0;`;

const inputHalfBoxRightStyle = css`height: 51px; width: 360px; border-radius: 6px; background-color: #f6f7f9; border: 1px solid #eaecf0; box-sizing: border-box; display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 15px 16px; gap: 0px; font-size: 16px; color: #bdc5d0;`;

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
const Step021Default = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [floor, setFloor] = useState('');
    const [houseType, setHouseType] = useState('');
  
    const Loading1 = () => {
      navigate("/loading1");
    };
  
    const HouseStep2 = () => {
      navigate("/housestep2");
    };

    const FirstMain = () => {
      navigate("/");
    };
  return (
    <div className={wrapperStyle}>
      <div className={sidebarWrapperStyle}>
        <div className={sidebarContentStyle}>
          <div className={sidebarTopStyle}>
            <div className={homeLinkStyle} onClick={FirstMain}>
              <div className={homeTextStyle}>← 홈으로</div>
            </div>
            <div className={sidebarTitleStyle}>
              <b className={sidebarBoldTextStyle}>
                <p>화재 대피 훈련을 진행할<br />장소에 대해 곰곰소방단 에게 알려주세요!</p>
              </b>
              <img src="/images/곰/인사소방곰.png" alt="" className={sidebarImageStyle} />
            </div>
          </div>
          <div className={stepsContainerStyle}>
            <div className={stepBoxGroupStyle}>
              <div className={stepActiveStyle}>
                <div className={stepTextContainerStyle}>
                  <div className={stepNumStyle}>01</div>
                  <div className={stepTitleStyle}>집 주소 입력하기</div>
                </div>
                <div className={stepTagActiveStyle}><div>진행중</div></div>
              </div>

              {/* 02~04 반복 */}
              {["02", "03", "04"].map((num, i) => (
                <div key={num} className={stepItemStyle}>
                  <div className={stepTextContainerStyle}>
                    <div className={stepNumStyle}>{num}</div>
                    <div className={stepTitleStyle}>
                      {["집 전개도 등록하기", "집 공간 스캔하기", "화재 요인 등록하기"][i]}
                    </div>
                  </div>
                  <div className={stepTagInactiveStyle}><div>미완료</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={mainPanelStyle}>
  <div className={mainStepIndicatorStyle}>
    <div className={stepCountStyle}>
      <b>1</b><span className={stepCountGrayStyle}>/4</span>
    </div>

    <div className={mainFormSectionStyle}>
      <b>집 정보를 입력해주세요</b>

      <div className={inputGroupStyle}>
        {/* 집 주소 */}
        <div className={inputBlockStyle}>
          <b className={inputTitleStyle}>집 주소</b>
          <input
            className={inputBoxStyle}
            type="text"
            placeholder="예) 서울특별시 중구 퇴계로 173 (회현동1가, 스테이트타워 남산)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* 층수 & 집 형태 */}
        <div className={css`display: flex; gap: 20px; width: 100%;`}>
          {/* 층 수 */}
          <div className={inputHalfStyle}>
            <b className={inputTitleStyle}>층 수</b>
            <input
              className={inputHalfBoxStyle}
              type="number"
              placeholder="숫자만 입력해주세요"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              min="0"
            />
          </div>

          {/* 집의 형태 */}
          <div className={inputHalfStyle}>
            <b className={inputTitleStyle}>집의 형태</b>
            <select
              className={inputHalfBoxRightStyle}
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
            >
              <option value="">형태를 선택해주세요</option>
              <option value="아파트">아파트</option>
              <option value="주택">주택</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

        <div className={bottomNavStyle}>
          <div className={navBtnStyle} onClick={Loading1}>
            <div className={navBtnTextStyle}>←</div>
          </div>
          <div className={navBtnWithTextStyle} onClick={HouseStep2}>
            <div className={navBtnTextStyle}>다음 →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step021Default;
