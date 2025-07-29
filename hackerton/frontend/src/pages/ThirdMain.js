import {css} from "@emotion/css";
import { useEffect, useState } from "react";


const Component1 = () => {
const [loggedInUser, setLoggedInUser] = useState("");

useEffect(() => {
const storedUsername = localStorage.getItem("username");
if (storedUsername) {
setLoggedInUser(storedUsername);
}
}, []);
return (
<div className={css`width: 100%;
position: relative;
background-color: #f6f7f9;
height: 834px;
overflow: hidden;
text-align: left;
font-size: 18px;
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
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
padding: 40px 28px 52px 40px;
box-sizing: border-box;
`}>
<div className={css`align-self: stretch;
flex: 1;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
`}>
<div className={css`align-self: stretch;
flex: 1;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
gap: 0px;
`}>
<div className={css`display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: flex-start;
`}>
<div className={css`position: relative;
letter-spacing: -0.01em;
line-height: 140%;
text-transform: capitalize;
font-weight: 500;
`}>화재 대피 훈련</div>
</div>
<div className={css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 24px;
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
<img className={css`width: 223px;
position: relative;
max-height: 100%;
object-fit: contain;
`} alt="" src="/images/곰/인사소방곰.png" />
<div className={css`width: 283px;
height: 251px;
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
<div className={css`width: 283px;
height: 186px;
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
</div>
</div>
</div>
<div className={css`position: absolute;
top: 40px;
left: 959px;
border-radius: 12px;
width: 219px;
height: 68px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 16px;
font-size: 16px;
`}>
<div className={css`width: 24px;
position: relative;
height: 24px;
overflow: hidden;
flex-shrink: 0;
`} />
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
`}>
{loggedInUser || "우리집 햄찌"}
</div>
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
top: 127px;
left: 351px;
backdrop-filter: blur(8px);
border-radius: 12px;
background-color: rgba(15, 17, 20, 0.5);
width: 841px;
height: 667px;
overflow: hidden;
text-align: center;
font-size: 24px;
color: #fefefe;
`}>
<div className={css`position: absolute;
top: 278px;
left: 244px;
width: 354px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
gap: 24px;
`}>
<b className={css`align-self: stretch;
position: relative;
letter-spacing: -0.01em;
line-height: 135%;
`}>이용을 위해서는 결제가 필요해요</b>
<div
className={css`
align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 12px;
text-align: left;
font-size: 16px;
color: #ff643e;
`}
>
<button
className={css`
align-self: stretch;
border-radius: 6px;
background-color: #fff0ec;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 14px 10px;
border: none;
cursor: pointer;
font-weight: 500;
font-size: 16px;
color: #ff643e;
`}
>
결제하기
</button>

<button
className={css`
align-self: stretch;
border-radius: 6px;
background-color: #eaecf0;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 14px 10px;
border: none;
cursor: pointer;
font-weight: 500;
font-size: 16px;
color: #8d94a0;
`}
>
뒤로가기
</button>
</div>
</div>
</div>
</div>);
};

export default Component1;
