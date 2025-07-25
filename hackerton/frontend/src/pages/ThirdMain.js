import {css} from "@emotion/css";
import { useNavigate } from "react-router-dom";



const Component1 = () => {
const navigate = useNavigate();
  const Scenario01 = () => {
      navigate("/scenario01");
    };

return (
<div className={css`width: 100%;
position: relative;
background-color: #f6f7f9;
height: 834px;
overflow: hidden;
text-align: left;
font-size: 16px;
color: #363d47;
font-family: Pretendard;
`}>
<div className={css`position: absolute;
top: 0px;
left: 0px;
background-color: #f6f7f9;
width: 351px;
height: 834px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
padding: 40px 27px 52px 40px;
box-sizing: border-box;
gap: 0px;
font-size: 18px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>화재 대피 훈련</div>
<div className={css`display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
font-size: 24px;
`}>
<b className={css`width: 283px;
position: relative;
letter-spacing: -0.01em;
line-height: 135%;
display: inline-block;
`}>
<p className={css`margin: 0;
`}>{`불이 나면 어떻게 해야 할까? 지금부터 소방곰과 함께 `}</p>
<p className={css`margin: 0;
`}>훈련하며 알아보자!</p>
</b>
<div className={css`width: 283px;
position: relative;
height: 330px;
overflow: hidden;
flex-shrink: 0;
`}>
<img className={css`position: absolute;
top: 5px;
left: 21px;
width: 223px;
height: 302px;
object-fit: contain;
`} alt="" src="/images/곰/인사소방곰.png" />
</div>
</div>
<div className={css`width: 283px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 15px;
font-size: 16px;
color: #e85b38;
`}>
<div className={css`align-self: stretch;
position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
`}>오늘의 미션</div>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 12px;
color: #8d94a0;
`}>
<div className={css`align-self: stretch;
border-radius: 8px;
background-color: #fefefe;
border: 1px solid #ff643e;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
padding: 12px 18px;
gap: 43px;
color: #ff643e;
`}>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 12px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>01</div>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
color: #0f1114;
`}>
<p className={css`margin: 0;
`}>거실 콘센트</p>
<p className={css`margin: 0;
`}>화재 대피 훈련하기</p>
</div>
</div>
<div className={css`border-radius: 100px;
background-color: #fff0ec;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 6px 10px;
font-size: 13px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
`}>진행중</div>
</div>
</div>
<div className={css`align-self: stretch;
border-radius: 8px;
background-color: #fefefe;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 12px 18px;
gap: 0px;
`}>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 12px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>02</div>
<div className={css`width: 138px;
position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
display: inline-block;
flex-shrink: 0;
`}>
<p className={css`margin: 0;
`}>명예 소방관</p>
<p className={css`margin: 0;
`}>뱃지 자랑하기</p>
</div>
</div>
<div className={css`width: 54px;
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
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
`}>미완료</div>
</div>
</div>
<div className={css`align-self: stretch;
border-radius: 8px;
background-color: #fefefe;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 12px 18px;
gap: 0px;
`}>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 12px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>03</div>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
`}>소방 퀴즈왕 도전하기</div>
</div>
<div className={css`width: 54px;
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
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
`}>미완료</div>
</div>
</div>
</div>
</div>
</div>
<div className={css`position: absolute;
top: 40px;
right: 42px;
border-radius: 12px;
background-color: #f6f7f9;
width: 193px;
height: 68px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 16px;
`}>
<img className={css`width: 48px;
position: relative;
max-height: 100%;
overflow: hidden;
flex-shrink: 0;
object-fit: cover;
`} alt="" src="/images/시나리오/객체/프로필사진.png" />
<div className={css`width: 91px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
`}>
<div className={css`align-self: stretch;
position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>게스트</div>
<div className={css`align-self: stretch;
position: relative;
font-size: 14px;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
color: #8d94a0;
`}>초보 소방관 모드</div>
</div>
</div>
<div className={css`position: absolute;
top: 135px;
left: 389px;
border-radius: 12px;
background-color: #fefefe;
width: 843px;
height: 667px;
overflow: hidden;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
padding: 32px;
box-sizing: border-box;
font-size: 24px;
`}>
<div className={css`width: 1425px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 20px;
`}>
<div className={css`width: 770px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 0px;
`}>
<b className={css`position: relative;
letter-spacing: -0.01em;
line-height: 135%;
`}>화재 대피 훈련 시나리오</b>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 12px;
`}>
</div>
</div>
<div className={css`align-self: stretch;
position: relative;
height: 526px;
font-size: 28px;
color: #fefefe;
`}>
<div className={css`position: absolute;
top: 0.5px;
left: 0px;
border-radius: 10px;
width: 773px;
overflow-x: auto;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 7px;
`}>
<div className={css`width: 351px;
height: 526px;
overflow: hidden;
flex-shrink: 0;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 46px 35px;
box-sizing: border-box;
background-image: url('/images/시나리오/콘텐츠사진/콘센트화재.png');
background-size: cover;
background-repeat: no-repeat;
background-position: top;
`}>
<div className={css`width: 281px;
height: 434px;
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
gap: 0px;
`}>
<div className={css`width: 80.3px;
position: relative;
height: 80.3px;
overflow: hidden;
flex-shrink: 0;
`}>
<div className={css`width: 100%;
position: relative;
height: 83.4px;
transform: rotate(-90deg);
transform-origin: 0 0;
`}>
<div className={css`position: absolute;
top: 21.4px;
left: 2.68px;
border-radius: 50%;
background: conic-gradient(from 180deg at 50% 50%, #6b2a1a 0deg, #363d47 248.58deg, #6b2a1a 360deg, #363d47 608.58deg);
border: 0.6px solid #0f1114;
box-sizing: border-box;
width: 78.9px;
height: 78.9px;
`} />
<img className={css`position: absolute;
top: 5px;
left: -80px;
width: 75px;
height: 80px;
object-fit: cover;
transform: rotate(90deg);
`} alt="" src="/images/뱃지/콘센트뱃지미획득.png" />
</div>
</div>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 16px;
`}>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 4px;
`}>
<b className={css`position: relative;
letter-spacing: -0.01em;
line-height: 135%;
`}>
<p className={css`margin: 0;
`}>{`거실 콘센트에서 `}</p>
<p className={css`margin: 0;
`}>불이 났어요!</p>
</b>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 15px;
font-size: 18px;
color: #d6dbe2;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>난이도 하</div>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>예상 시간 3분</div>
</div>
</div>
<div className={css`border-radius: 999px;
background-color: #cd610f;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 8px 24px;
cursor: pointer;
font-size: 18px;
`} onClick={Scenario01}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
`}>훈련하기</div>
</div>
</div>
</div>
</div>
<div className={css`width: 351px;
height: 526px;
overflow: hidden;
flex-shrink: 0;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 46px 35px;
box-sizing: border-box;
background-image: url('/images/시나리오/콘텐츠사진/외부화재.png');
background-size: cover;
background-repeat: no-repeat;
background-position: top;
`}>
<div className={css`width: 281px;
height: 434px;
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
gap: 0px;
`}>
<div className={css`width: 80.3px;
position: relative;
height: 80.3px;
overflow: hidden;
flex-shrink: 0;
`}>
<div className={css`width: 100%;
position: relative;
height: 83.4px;
transform: rotate(-90deg);
transform-origin: 0 0;
`}>
<div className={css`position: absolute;
top: 21.4px;
left: 2.68px;
border-radius: 50%;
background: conic-gradient(from 180deg at 50% 50%, #6b2a1a 0deg, #363d47 248.58deg, #6b2a1a 360deg, #363d47 608.58deg);
border: 0.6px solid #0f1114;
box-sizing: border-box;
width: 78.9px;
height: 78.9px;
`} />
<img className={css`position: absolute;
top: 5px;
left: -80px;
width: 75px;
height: 80px;
object-fit: cover;
transform: rotate(90deg);
`} alt="" src="/images/뱃지/화재안내방송뱃지미획득.png" />
</div>
</div>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 16px;
`}>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 4px;
`}>
<b className={css`position: relative;
letter-spacing: -0.01em;
line-height: 135%;
`}>선풍기에서 불이 났어요!</b>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 15px;
font-size: 18px;
color: #d6dbe2;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>난이도 하</div>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>예상 시간 4분</div>
</div>
</div>
<div className={css`border-radius: 999px;
background-color: #cd610f;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 8px 24px;
font-size: 18px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
`}>훈련하기</div>
</div>
</div>
</div>
</div>
<div className={css`width: 351px;
height: 526px;
overflow: hidden;
flex-shrink: 0;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 46px 35px;
box-sizing: border-box;
background-image: url('/images/시나리오/콘텐츠사진/가스레인지화재.png');
background-size: cover;
background-repeat: no-repeat;
background-position: top;
`}>
<div className={css`width: 281px;
height: 434px;
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
gap: 0px;
`}>
<div className={css`width: 80.3px;
position: relative;
height: 80.3px;
overflow: hidden;
flex-shrink: 0;
`}>
<div className={css`width: 100%;
position: relative;
height: 83.4px;
transform: rotate(-90deg);
transform-origin: 0 0;
`}>
<div className={css`position: absolute;
top: 21.4px;
left: 2.68px;
border-radius: 50%;
background: conic-gradient(from 180deg at 50% 50%, #6b2a1a 0deg, #363d47 248.58deg, #6b2a1a 360deg, #363d47 608.58deg);
border: 0.6px solid #0f1114;
box-sizing: border-box;
width: 78.9px;
height: 78.9px;
`} />
<img className={css`position: absolute;
top: 5px;
left: -80px;
width: 75px;
height: 80px;
object-fit: cover;
transform: rotate(90deg);
`} alt="" src="/images/뱃지/가스레인지뱃지미획득.png" />
</div>
</div>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 16px;
`}>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 4px;
`}>
<b className={css`position: relative;
letter-spacing: -0.01em;
line-height: 135%;
`}>
<p className={css`margin: 0;
`}>화재 안내 방송이</p>
<p className={css`margin: 0;
`}>나오고 있어요!</p>
</b>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 15px;
font-size: 18px;
color: #d6dbe2;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>난이도 중</div>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>예상 시간 2분</div>
</div>
</div>
<div className={css`border-radius: 999px;
background-color: #cd610f;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 8px 24px;
font-size: 18px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
`}>훈련하기</div>
</div>
</div>
</div>
</div>
<div className={css`width: 351px;
height: 526px;
overflow: hidden;
flex-shrink: 0;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 46px 35px;
box-sizing: border-box;
background-image: url('/images/시나리오/콘텐츠사진/선풍기화재.png');
background-size: cover;
background-repeat: no-repeat;
background-position: top;
`}>
<div className={css`width: 281px;
height: 434px;
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
gap: 0px;
`}>
<div className={css`width: 80.3px;
position: relative;
height: 80.3px;
overflow: hidden;
flex-shrink: 0;
`}>
<div className={css`width: 100%;
position: relative;
height: 83.4px;
transform: rotate(-90deg);
transform-origin: 0 0;
`}>
<div className={css`position: absolute;
top: 21.4px;
left: 2.68px;
border-radius: 50%;
background: conic-gradient(from 180deg at 50% 50%, #6b2a1a 0deg, #363d47 248.58deg, #6b2a1a 360deg, #363d47 608.58deg);
border: 0.6px solid #0f1114;
box-sizing: border-box;
width: 78.9px;
height: 78.9px;
`} />
<img className={css`position: absolute;
top: 5px;
left: -80px;
width: 75px;
height: 80px;
object-fit: cover;
transform: rotate(90deg);
`} alt="" src="/images/뱃지/가스레인지뱃지미획득.png" />
</div>
</div>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 16px;
`}>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 4px;
`}>
<b className={css`position: relative;
letter-spacing: -0.01em;
line-height: 135%;
`}>
<p className={css`margin: 0;
`}>가스레인지에서</p>
<p className={css`margin: 0;
`}>화재가 발생했어요!</p>
</b>
<div className={css`display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 15px;
font-size: 18px;
color: #d6dbe2;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>난이도 상</div>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>예상 시간 5분</div>
</div>
</div>
<div className={css`border-radius: 999px;
background-color: #cd610f;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 8px 24px;
font-size: 18px;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 600;
`}>훈련하기</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className={css`position: absolute;
top: 190px;
left: 674px;
width: 241px;
height: 52px;
`}>
<img className={css`position: absolute;
top: 0px;
left: 0px;
width: 241px;
height: 46px;
`} alt="" src="/images/시나리오/콘텐츠사진/콘텐츠말풍선.png" />
<div className={css`position: absolute;
top: 4px;
left: 22px;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>훈련을 통해 뱃지를 획득해볼까?</div>
</div>
</div>);
};

export default Component1;
