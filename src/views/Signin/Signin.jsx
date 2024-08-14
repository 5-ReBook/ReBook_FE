import './styles/Signin.css'

function Signin() {
  return (
    <div className="signin-container">
      <h1 className="signin-title">ReBook</h1>
      <div className="input-container">
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
      </div>
      <div className="button-row">
        <button className="signup-button">가입하기</button>
        <button className="signin-button">로그인</button>
      </div>
      <hr className="divider" />
      <button className="kakao-button">
      <img src="src/assets/images/Signin/kakao_login_large_wide.png" alt="카카오로 로그인" className="kakao-image" />
      </button>
    </div>
  );
}

export default Signin;
