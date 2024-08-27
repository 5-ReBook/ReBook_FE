import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import AxiosInstance from '../../api/AxiosInstance';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';

function Signin() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setLayoutConfig } = useLayout();
  useEffect(() => {
    import('./styles/Signin.css');
    // Signin 페이지에 필요한 레이아웃 설정 적용
    setLayoutConfig({
      header: false,
      leftButton: 'none',
      footerNav: false,
    });

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  const handleSignin = async () => {
    try {
      const response = await AxiosInstance.post('/auth/signin', {
        username,
        password,
      });

      // 서버로부터 받은 액세스 토큰을 localStorage에 저장
      const accessToken = response.headers.access;
      localStorage.setItem('Authorization', accessToken);

      // 로그인 성공 후 필요한 로직 처리
      console.log('로그인 성공:', accessToken);
      nav('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('해당 정보로 등록된 회원이 없습니다.');
    }
  };

  const handleKakaoLogin = () => {
    // 백엔드의 카카오 OAuth 로그인 URL
    const kakaoAuthUrl = `${import.meta.env.VITE_BASE_URL}/auth/oauth/signin/kakao`;
    // OAuth 로그인 페이지로 이동
    window.location.href = kakaoAuthUrl;
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
          onChange={e => setUsername(e.target.value)}
          buttonImage="src/assets/images/Members/button_x_in_circle.png" // 버튼 이미지 경로
          onClickHandler={clearUsername}
        />
        <InputFieldWithButton
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          buttonImage="src/assets/images/Members/button_x_in_circle.png" // 버튼 이미지 경로
          onClickHandler={clearPassword}
        />
      </div>
      <div className="button-row">
        <Button
          className="signup-button"
          text="가입하기"
          onClick={() => nav('/signupform')}
        />
        <Button
          className="signin-button"
          text="로그인"
          onClick={handleSignin}
        />
      </div>
      <hr className="divider" />
      <button onClick={handleKakaoLogin} type="button" className="kakao-button">
        <img
          src="src/assets/images/Signin/kakao_login_large_wide.png"
          alt="카카오로 로그인"
          className="kakao-image"
        />
      </button>
      <p className="forgot-password-text">
        비밀번호를 혹시 잊어버렸습니까?
        <br /> 그렇다면 {/* fixme : 이거 누르면 로그인 페이지로 돌아와버림 */}
        <Link to="/findpassword" state={{ username }}>
          여기
        </Link>
        를 클릭해 주세요.
      </p>
    </div>
  );
}

export default Signin;
