import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import Button from '../../components/Button';
import { validateUsername, validatePassword } from '../../utils/validation';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';
import AxiosInstance from '../../api/AxiosInstance';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [authNumber, setAuthNumber] = useState('');
  const [authNumberError, setAuthNumberError] = useState('');
  const [passwordInputType, setPasswordInputType] = useState('password');

  const nav = useNavigate();

  const { setLayoutConfig } = useLayout();
  useEffect(() => {
    import('./styles/SignupForm.css');
    // SignupForm 페이지에 필요한 레이아웃 설정 적용
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: false,
    });

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  const handleUsernameChange = e => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    const validationError = validateUsername(newUsername);
    setUsernameError(validationError);
  };

  const handlePasswordChange = e => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const validationError = validatePassword(newPassword);
    setPasswordError(validationError);
  };

  const clearUsername = () => {
    setUsername(''); // username 필드를 비웁니다.
    setUsernameError(''); // 에러 메시지를 초기화
  };

  // 비밀번호 입력 타입을 토글하는 함수
  const togglePasswordVisibility = () => {
    setPasswordInputType(prevType =>
      prevType === 'password' ? 'text' : 'password'
    );
  };

  const handleAuthNumberChange = e => {
    setAuthNumber(e.target.value);

    if (!/^\d{6}$/.test(e.target.value)) {
      setAuthNumberError('인증번호는 6자리 숫자여야 합니다.');
    } else {
      setAuthNumberError('');
    }
  };

  /// POST /auth/members/signup/mail
  const handleEmailVerification = async () => {
    if (usernameError) {
      alert('아이디를 다시 확인해 주세요.');
      return;
    }

    AxiosInstance.post(
      `/auth/members/signup/mail?username=${encodeURIComponent(username)}`
    )
      .then(response => {
        alert('이메일 인증을 보냈습니다. 이메일을 확인해 주세요!');
        setIsEmailSent(true);
      })
      .catch(error => {
        console.error('이메일 인증 요청 중 오류 발생:', error);
        alert('이메일 인증 요청 중 오류가 발생했습니다.');
      });
  };

  const handleAuthNumberCheck = async () => {
    if (authNumberError) {
      alert('인증번호를 다시 확인해 주세요.');
      return;
    }

    AxiosInstance.post('/auth/members/signup/verify', {
      username,
      code: authNumber,
    })
      .then(() => {
        alert('인증번호가 확인되었습니다.');
      })
      .catch(error => {
        console.error('인증번호 확인 요청 중 오류 발생:', error);
        alert('인증번호 확인 요청 중 오류가 발생했습니다.');
      });
  };

  // POST /auth/members/signup
  const handleSignup = async () => {
    const usernameValidationError = validateUsername(username);
    const passwordValidationError = validatePassword(password);

    setUsernameError(usernameValidationError);
    setPasswordError(passwordValidationError);

    if (usernameValidationError || passwordValidationError) {
      alert('아이디와 비밀번호를 다시 확인해 주세요.');
      return;
    }

    AxiosInstance.post('/auth/members/signup', {
      username,
      password,
    })
      .then(() => {
        alert('회원가입이 완료되었습니다.');
        setUsernameError('');
        setPasswordError('');
        nav('/signin');
      })
      .catch(error => {
        console.error('회원가입 요청 중 오류 발생:', error);
        alert('회원가입 요청 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="signup-outer">
      <div className="input-group">
        {/* 아이디 입력 필드 */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="input-label">
          아이디
          <InputFieldWithButton
            type="text"
            value={username}
            onChange={handleUsernameChange}
            onClickHandler={clearUsername}
            buttonImage="src/assets/images/Members/button_x_in_circle.png"
          />
        </label>
        {usernameError && <div className="error-message">{usernameError}</div>}
        <Button
          text="이메일 인증하기"
          onClick={handleEmailVerification}
          disabled={Boolean(usernameError)}
        />
      </div>

      {isEmailSent && (
        <div className="input-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="input-label">
            인증번호
            <InputFieldWithButton
              type="password"
              value={authNumber}
              onChange={handleAuthNumberChange}
              onClickHandler={() => setAuthNumber('')}
              buttonImage="src/assets/images/Members/button_x_in_circle.png"
            />
          </label>
          <Button
            text="인증번호 확인"
            onClick={handleAuthNumberCheck}
            disabled={Boolean(authNumberError)}
          />
        </div>
      )}

      <div className="input-group">
        {/* 비밀번호 입력 필드 */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="input-label">
          희망 비밀번호
          <InputFieldWithButton
            type={passwordInputType}
            value={password}
            onChange={handlePasswordChange}
            onClickHandler={togglePasswordVisibility}
            buttonImage="src/assets/images/Members/eye.png"
          />
        </label>
        {passwordError && <div className="error-message">{passwordError}</div>}
        <Button
          text="회원 가입"
          onClick={handleSignup}
          disabled={Boolean(usernameError || passwordError)}
        />
      </div>
    </div>
  );
}

export default SignupForm;
