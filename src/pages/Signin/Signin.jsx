import './styles/Signin.css'
import axios from 'axios';
import { useState } from 'react';
import Button from '../../components/Button';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => { 
    try {
      const response = await axios.post('https://localhost/auth/signin', {
        username: username,
        password: password
      });

      // 서버로부터 받은 액세스 토큰을 localStorage에 저장
      const accessToken = response.headers['access'];
      localStorage.setItem('Authorization', accessToken);

      // 로그인 성공 후 필요한 로직 처리 (예: 페이지 이동)
      console.log('로그인 성공:', accessToken);

      // 페이지 이동 또는 상태 업데이트 등
    } catch (error) {
      console.error('로그인 실패:', error);
      // 에러 처리 (예시: 경고창, 메시지 표시 등)
    }
  };

  const clearUsername = () => {
    setUsername(''); // username 필드를 비웁니다.
  };

  const clearPassword = () => {
    setPassword(''); // password 필드를 비웁니다.
  };

  return (
    <div className="signin-container">
      <h1 className="signin-title">ReBook</h1>
      <div className="input-container">
        <InputFieldWithButton
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          buttonImage="src/assets/images/Members/button_x_in_circle.png" // 버튼 이미지 경로
          onClickHandler={clearUsername}
        />
        <InputFieldWithButton
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          buttonImage="src/assets/images/Members/button_x_in_circle.png" // 버튼 이미지 경로
          onClickHandler={clearPassword}
        />
      </div>
      <div className="button-row">
        <Button className="signup-button" text={"가입하기"} onClick={()=> nav('/signupform')}/>
        <Button className="signin-button" text={"로그인"} onClick={handleSignin}/>
      </div>
      <hr className="divider" />
      <button className="kakao-button">
        <img src="src/assets/images/Signin/kakao_login_large_wide.png" alt="카카오로 로그인" className="kakao-image" />
      </button>
    </div>
  );
}

export default Signin;
