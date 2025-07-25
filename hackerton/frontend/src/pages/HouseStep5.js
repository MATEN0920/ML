import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const styles = {
  span: css`
    font-weight: 600;
    color: #8d94a0;
  `,
  childNameLabelContainer: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 135%;
  `,
  span1: css`
    color: #232323;
  `,
  span2: css`
    color: #ff643e;
  `,
  p: css`
    margin: 0;
  `,
  guardianInfoHeaderContainer: css`
    align-self: stretch;
    position: relative;
    letter-spacing: -0.01em;
    line-height: 135%;
  `,
  icon: css`
    width: 49px;
    position: relative;
    border-radius: 14.71px;
    max-height: 100%;
    object-fit: cover;
  `,

  icon1: css`
    width: 22px;
    position: relative;
    height: 22px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  `,
  inputField: css`
    align-self: stretch;
    border-radius: 6px;
    background-color: #fefefe;
    border: 1px solid #eaecf0;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 16px;
    gap: 0px;
  `,
  parent: css`
    width: 87px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
  `,
  image22Icon: css`
    width: 127px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  `,
  inputField1: css`
    width: 87px;
    border-radius: 6px;
    background-color: #fefefe;
    border: 1px solid #eaecf0;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 16px;
    gap: 0px;
  `,
  image22Parent: css`
    width: 163px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 26px;
  `,
  image55Icon: css`
    width: 129px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  `,
  image55Parent: css`
    width: 167px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  `,
  image25Icon: css`
    width: 55px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  `,
  frameGroup: css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 20px;
  `,
  nextButtonIcon: css`
    width: 24px;
    position: relative;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  `,
  button: css`
  flex: 1;
  border-radius: 6px;
  background-color: #eaecf0;
  height: 189px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 10px;
  box-sizing: border-box;
  gap: 6px;
  color: #5d6673;
`,
  guardianInfoHeaderGroup: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 3px;
  `,
  frameWrapper: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 20px;
    color: #5d6673;
  `,
  guardianInfoHeaderParent: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 32px;
    font-size: 24px;
    color: #232323;
  `,
  image24Icon: css`
    width: 50%;
    height: 50%;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  `,
  image24Parent: css`
    width: 163px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `,
  frameWrapper2: css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
  `,
  frameWrapper1: css`
    width: 613px;
    border-radius: 6px;
    background-color: #f6f7f9;
    border: 1px solid #d6dbe2;
    box-sizing: border-box;
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  `,
  frameParent1: css`
    width: 739px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    font-size: 16px;
    color: #bdc5d0;
  `,
  frameDiv: css`
    width: 739px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 3px;
    color: #5d6673;
  `,
  childNameLabelParent: css`
    align-self: stretch;
    height: 598px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  `,
  nextButton: css`
    border-radius: 6px;
    background-color: #d6dbe2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 14px 20px;
  `,
  nextButtonIcon3: css`
    width: 24px;
    position: relative;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: contain;
  `,
  nextButton1: css`
    border-radius: 6px;
    background-color: #ff643e;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 14px 20px;
    gap: 6px;
  `,
  navigation: css`
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0px;
    font-size: 18px;
    color: #fefefe;
  `,
  form: css`
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
    gap: 0px;
  `,
  sidebarHeader: css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
  `,
  sidebarMessageContainer: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 24px;
  `,
  sidebarContent: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 62px;
  `,
  icon6: css`
    width: 211px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  `,
  stepDescription: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 600;
  `,
  step1: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  `,
  stepStatus: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
  `,
  status: css`
    width: 54px;
    border-radius: 100px;
    background-color: #f6f7f9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    box-sizing: border-box;
    font-size: 13px;
    color: #363d47;
  `,
  step01: css`
    align-self: stretch;
    border-radius: 8px;
    background-color: #fefefe;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    gap: 0px;
  `,
  stepDescription3: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 600;
    color: #0f1114;
  `,
  status3: css`
    border-radius: 100px;
    background-color: #fff0ec;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    font-size: 13px;
  `,
  step02: css`
    align-self: stretch;
    border-radius: 8px;
    background-color: #fefefe;
    border: 1px solid #ff643e;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    gap: 0px;
    color: #ff643e;
  `,
  step: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    font-size: 16px;
    color: #8d94a0;
  `,
  sidebarContainer: css`
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0px;
  `,
  sidebar: css`
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
    font-size: 18px;
    color: #363d47;
  `,
  step024: css`
    width: 100%;
    position: relative;
    background-color: #f6f7f9;
    height: 834px;
    overflow: hidden;
    text-align: left;
    font-size: 20px;
    color: #e85b38;
    font-family: Pretendard;
  `,
  hazardCard: css`
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  `,
  hazardImage: css`
    width: 80px;
    height: 80px;
    object-fit: contain;
  `,
  hazardCount: css`
    width: 87px;
    height: 40px;
    border-radius: 6px;
    background-color: #fefefe;
    border: 1px solid #eaecf0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 16px;
    box-sizing: border-box;
  `,
  frameParent: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    gap: 16px;
  `,
  frameContainer: css`
    flex: 1;
    height: 140px;
    border: 1px solid #d6dbe2;
    background-color: #f6f7f9;
    border-radius: 6px;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  button1: css`
    width: 126px;
    height: 190px;
    background-color: #eaecf0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    color: #5d6673;
    align-self: stretch; /* ✅ 추가 */
  `,
  default: css`
    font-weight: 500;
    font-size: 16px;
    color: #5d6673;
  `
};

const hazardData = [
  { src: "/images/객체/콘센트.png" },
  { src: "/images/객체/가스레인지.png" },
  { src: "/images/객체/전자레인지.png" },
  { src: "/images/객체/선풍기.png" },
];

const Step024 = () => {
    const navigate = useNavigate();
  const HouseStep4 = () => {
      navigate("/housestep4");
    };
  
    const Loading2 = () => {
      navigate("/loading2");
    };

    const FirstMain = () => {
      navigate("/");
    };
  return (
    <div className={styles.step024}>
      <div className={styles.form}>
        <div className={styles.childNameLabelParent}>
          <div className={styles.childNameLabelContainer}>
            <b>4</b>
            <span className={styles.span}>/4</span>
          </div>
          <div className={styles.guardianInfoHeaderParent}>
            <b className={styles.guardianInfoHeaderContainer}>
              <p className={styles.p}>
                <span className={styles.span1}>우리집에 있는 </span>
                <span className={styles.span2}>화재 위험 요소는 4가지, 소화기기의 종류는 1가지</span>
                <span>에요.</span>
              </p>
              <p className={styles.p}>추가로 등록하고 싶은 화재 위험 요소가 있다면 추가해주세요!</p>
            </b>
            <div className={styles.frameWrapper}>
              <div className={styles.guardianInfoHeaderGroup}>
                <b className={styles.childNameLabelContainer}>위험 요소</b>
                <div className={styles.frameParent}>
                  <div className={styles.frameContainer}>
                    <div className={styles.frameGroup}>
                      {hazardData.map((item, idx) => (
                        <div className={styles.hazardCard} key={idx}>
                          <img className={styles.hazardImage} alt="" src={item.src} />
                          <div className={styles.hazardCount}>
                            <div className={styles.default}>1개</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.button1}>
                    <div className={styles.default}>추가하기</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameDiv}>
            <b className={styles.childNameLabelContainer}>소화 기기</b>
            <div className={styles.frameParent}>
              <div className={styles.frameContainer}>
                <div className={styles.frameGroup}>
                  <div className={styles.hazardCard}>
                    <img className={styles.hazardImage} alt="" src="/images/객체/소화기.png" />
                    <div className={styles.hazardCount}>
                      <div className={styles.default}>1개</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.button1}>
                <div className={styles.default}>추가하기</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.navigation}>
          <div className={styles.nextButton} onClick={HouseStep4}>
            <div className={styles.nextButtonIcon}>←</div>
          </div>
          <div className={styles.nextButton1} onClick={Loading2}>
            <div className={styles.default}>다음</div>
            <div className={styles.nextButtonIcon3}>→</div>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarHeader} onClick={FirstMain}>
              <div className={styles.default}>← 홈으로</div>
            </div>
            <div className={styles.sidebarMessageContainer}>
              <b className={styles.guardianInfoHeaderContainer}>
                <p className={styles.p}>우리 집에 있는</p>
                <p className={styles.p}>위험 요소를 함께 확인해봐요!</p>
              </b>
            </div>
          </div>
          <img className={styles.icon6} alt="" src="/images/곰/돋보기소방곰.png" />
          <div className={styles.step}>
            <div className={styles.step01}>
              <div className={styles.step1}>
                <div className={styles.default}>01</div>
                <div className={styles.stepDescription}>집 주소 입력하기</div>
              </div>
              <div className={styles.status}>
                <div className={styles.stepStatus}>완료</div>
              </div>
            </div>
            <div className={styles.step01}>
              <div className={styles.step1}>
                <div className={styles.default}>02</div>
                <div className={styles.stepDescription}>집 전개도 등록하기</div>
              </div>
              <div className={styles.status}>
                <div className={styles.stepStatus}>완료</div>
              </div>
            </div>
            <div className={styles.step01}>
              <div className={styles.step1}>
                <div className={styles.default}>02</div>
                <div className={styles.stepDescription}>집 공간 스캔하기</div>
              </div>
              <div className={styles.status}>
                <div className={styles.stepStatus}>완료</div>
              </div>
            </div>
            <div className={styles.step02}>
              <div className={styles.step1}>
                <div className={styles.default}>04</div>
                <div className={styles.stepDescription3}>화재요인 등록하기</div>
              </div>
              <div className={styles.status3}>
                <div className={styles.stepStatus}>진행중</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step024;
