import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// 전체 화면을 가운데 정렬하는 wrapper
const wrapper = css`
  width: 100vw;
  height: 100vh;
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 고정된 크기의 컨테이너
const container = css`
  width: 1194px;
  height: 834px;
  background-color: #f6f7f9;
  border-radius: 12px;
  position: relative;
  font-family: Pretendard;
  color: #232323;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 로그인 박스 스타일
const loginBox = css`
  width: 514px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

// 안내 텍스트
const guideText = css`
  font-size: 16px;
  color: #2098f3;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 140%;
  text-align: center;
`;

// 라벨 스타일
const labelText = css`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
`;

// 입력창 스타일
const inputBox = css`
  width: 514px;
  height: 52px;
  border-radius: 6px;
  background-color: #f6f7f9;
  border: 1px solid #eaecf0;
  font-size: 16px;
  color: #bdc5d0;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

// 로그인 버튼 스타일
const loginButton = css`
  width: 547.24px;
  height: 52px;
  border-radius: 6px;
  background-color: #d6dbe2;
  font-size: 18px;
  font-weight: 500;
  color: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
`;

// 하단 링크 텍스트
const linkText = css`
  font-size: 13px;
  font-weight: 500;
  color: #5d6673;
  text-transform: capitalize;
  letter-spacing: -0.01em;
  line-height: 140%;
`;



const Login = () => {

    const navigate = useNavigate();
      const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const HandleLogin = () => {
  if (username === "admin" && password === "0000") {
    navigate("/main");
  } else {
    navigate("/firemain");
  }
};

  const Signup = () => {
    navigate("/loginstep1");
  };
  
  return (
    <div className={wrapper}>
      <div className={container}>
        <div className={loginBox}>
          {/* 로그인 안내 */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", marginBottom: 6 }}>로그인</div>
            <div className={guideText}>아이디와 비밀번호를 입력해주세요</div>
          </div>

          {/* 아이디 입력 */}
          <div>
            <div className={labelText}>아이디</div>
              <input
              className={inputBox}
              type="text"
              value={username}
              placeholder="아이디 입력"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <div className={labelText}>비밀번호</div>
            <input
              className={inputBox}
              type="password"
              value={password}
              placeholder="영어, 숫자 포함 8-20자 이내"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 로그인 버튼 */}
          <div className={loginButton} onClick={HandleLogin}>로그인</div>

          {/* 하단 링크 */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <div className={linkText}>아이디 찾기</div>
            <div className={linkText}>|</div>
            <div className={linkText}>비밀번호 찾기</div>
            <div className={linkText}>|</div>
            <div className={linkText} onClick={Signup}>회원가입</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
