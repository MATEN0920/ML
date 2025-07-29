// ✅ 스타일 정의
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  guardianInfoHeader: css`
    align-self: stretch;
    position: relative;
    letter-spacing: -0.01em;
    line-height: 135%;
  `,
  guardianRelationshipLabel: css`
    position: relative;
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
    color: #2098f3;
  `,
  guardianInfoHeaderParent: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 6px;
  `,
  frameWrapper: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 24px;
    color: #232323;
  `,
  childNameLabelParent: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  `,
  image18Icon: css`
    align-self: stretch;
    position: relative;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  `,
  icon: css`
    width: 11px;
    position: relative;
    height: 11px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: contain;
  `,
  guardianRelationshipLabelParent: css`
    width: 88px;
    border-radius: 4.36px;
    background-color: #fefefe;
    border: 0.8px solid #8d94a0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6.3px 9.4px;
    gap: 4.7px;
  `,
  roomNameInput: css`
    width: 140px;
    border-radius: 4.36px;
    background-color: #fefefe;
    border: 0.8px solid #8d94a0;
    box-sizing: border-box;
    padding: 6.3px 9.4px;
    font-size: 10.18px;
    color: #2098f3;
    text-align: center;
    outline: none;
    
    &:focus {
      border-color: #2098f3;
    }
    
    &::placeholder {
      color: #8d94a0;
    }
  `,
  image18Parent: css`
    width: 185px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
  `,
  image20Parent: css`
    width: 139px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
  `,
  image19Parent: css`
    width: 138px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
  `,
  frameParent: css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 30px;
    text-align: center;
    font-size: 10.18px;
    color: #8d94a0;
  `,
  nextButtonIcon: css`
    width: 24px;
    position: relative;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
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
  nextButtonLabel: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 500;
  `,
  nextButtonIcon1: css`
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
  icon4: css`
    width: 184px;
    position: relative;
    max-height: 100%;
    object-fit: cover;
  `,
  sidebarMessageContainer: css`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
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
  stepDescription2: css`
    position: relative;
    letter-spacing: -0.01em;
    line-height: 140%;
    text-transform: capitalize;
    font-weight: 600;
    color: #0f1114;
  `,
  status2: css`
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
  status3: css`
    border-radius: 100px;
    background-color: #eaecf0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    font-size: 13px;
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
};
const Step024 = () => {
  const navigate = useNavigate();
  const [extractedImages, setExtractedImages] = useState([]);
  const [roomNames, setRoomNames] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadImages = async () => {
      let sid = localStorage.getItem("session_id");
      if (!sid) {
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
        const random = Math.random().toString(36).substring(2, 8);
        sid = `session_${dateStr}_${random}`;
        localStorage.setItem("session_id", sid);
      }

      setExtractedImages([]);
      setRoomNames({});
      setLoading(true);

      try {
        const imageBasePath = `/images/door_room/${sid}/`;
        const imageFiles = [];
        const timestamp = Date.now();

        // 최대 10개 이미지까지 탐색
        for (let i = 1; i <= 10; i++) {
          const imagePath = `${imageBasePath}door${i}.jpg?cache=${timestamp}`;
          const cleanPath = `${imageBasePath}door${i}.jpg`;

          try {
            const response = await fetch(imagePath, {
              method: 'HEAD',
              cache: 'no-cache',
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
              },
            });

            const contentType = response.headers.get('Content-Type');
            const contentLength = response.headers.get('Content-Length');

            if (
              response.ok &&
              response.status === 200 &&
              contentType?.startsWith("image/") &&
              parseInt(contentLength || "0") > 1000
            ) {
              imageFiles.push(cleanPath);
            } else {
              break;
            }
          } catch (error) {
            break;
          }
        }

        setExtractedImages(imageFiles);
        const initialNames = {};
        imageFiles.forEach((_, index) => {
          initialNames[index] = "";
        });
        setRoomNames(initialNames);
      } catch (err) {
        console.error("[ERROR] 이미지 로딩 실패:", err);
      }

      setLoading(false);
    };

    loadImages();
  }, []);
  
  const handleRoomNameChange = (index, value) => {
    setRoomNames(prev => ({
      ...prev,
      [index]: value
    }));
  };
  
  const HouseStep3 = () => {
      navigate("/housestep3");
    };
  
    const HouseStep5 = () => {
      // 방 이름들을 다음 단계로 전달할 수 있음
      console.log('설정된 방 이름들:', roomNames);
      navigate("/housestep5");
    };

    const FirstMain = () => {
      navigate("/");
    };
  return (
    <div className={styles.step024}>
      <div className={styles.form}>
        <div className={styles.childNameLabelParent}>
          <div className={styles.childNameLabelContainer}>
            <b>3</b>
            <span className={styles.span}>/4</span>
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.guardianInfoHeaderParent}>
              <b className={styles.guardianInfoHeader}>
                각 방 문이 어디로 연결되는지 선택해주세요
              </b>
              <div className={styles.guardianRelationshipLabel}>
                * 스캔 전 주의사항 : 화재 위험 요소나 소화전이 잘 보이도록 정리해주세요
              </div>
            </div>
          </div>
        </div>

        <div className={styles.frameParent}>
          {loading ? (
            <div>이미지를 불러오는 중...</div>
          ) : extractedImages.length > 0 ? (
            extractedImages.map((imageUrl, index) => (
              <div key={index} className={styles.image18Parent}>
                <img 
                  className={styles.image18Icon} 
                  alt={`door ${index + 1}`} 
                  src={imageUrl}
                />
                <input
                  className={styles.roomNameInput}
                  type="text"
                  placeholder="연결된 방 이름"
                  value={roomNames[index] || ''}
                  onChange={(e) => handleRoomNameChange(index, e.target.value)}
                />
              </div>
            ))
          ) : (
            <div className={styles.image18Parent}>
              <img className={styles.image18Icon} alt="" src="image 18.png" />
              <div className={styles.guardianRelationshipLabelParent}>
                <div className={styles.nextButtonLabel}>연결된 방 이름</div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.navigation}>
          <div className={styles.nextButton} onClick={HouseStep3}>
            <div className={styles.nextButtonIcon}>←</div>
          </div>
          <div className={styles.nextButton1} onClick={HouseStep5}>
            <div className={styles.nextButtonLabel}>다음 →</div>
          </div>
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarHeader} onClick={FirstMain}>
              <div className={styles.nextButtonLabel}>← 홈으로</div>
            </div>
            <div className={styles.sidebarMessageContainer}>
              <b className={styles.guardianInfoHeader}>
                거실에서는 {extractedImages.length}개의 문이 인식되었어요! 각 문이 어느 방과 연결되어있는지 선택해주세요
              </b>
              <img className={styles.icon4} alt="" src="/images/곰/촬영소방곰.png" />
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.step01}>
              <div className={styles.step1}>
                <div className={styles.nextButtonLabel}>01</div>
                <div className={styles.stepDescription}>집 주소 입력하기</div>
              </div>
              <div className={styles.status}>
                <div className={styles.stepStatus}>완료</div>
              </div>
            </div>
            <div className={styles.step01}>
              <div className={styles.step1}>
                <div className={styles.nextButtonLabel}>02</div>
                <div className={styles.stepDescription}>집 전개도 등록하기</div>
              </div>
              <div className={styles.status}>
                <div className={styles.stepStatus}>완료</div>
              </div>
            </div>
            <div className={styles.step02}>
              <div className={styles.step1}>
                <div className={styles.nextButtonLabel}>03</div>
                <div className={styles.stepDescription2}>집 공간 스캔하기</div>
              </div>
              <div className={styles.status2}>
                <div className={styles.stepStatus}>진행중</div>
              </div>
            </div>
            <div className={styles.step01}>
              <div className={styles.step1}>
                <div className={styles.nextButtonLabel}>04</div>
                <div className={styles.stepDescription}>화재 요인 등록하기</div>
              </div>
              <div className={styles.status3}>
                <div className={styles.stepStatus}>미완료</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step024;