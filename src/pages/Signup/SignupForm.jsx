import React, { useState } from 'react';
import MemberLayout from '../../components/Layouts/MemberLayout';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import Button from '../../components/Button';
import { validateUsername, validatePassword } from '../../utils/validation';

// TODO 레이아웃 확인을 위해 기본 틀만 추가함
// 추후 이슈로 signupForm 작업 필요.
const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignup = () => {
      const usernameError = validateUsername(username);
      const passwordError = validatePassword(password);
  
      if (usernameError) {
        setError(usernameError);
        return;
      }
  
      if (passwordError) {
        setError(passwordError);
        return;
      }
  
      // 회원가입 로직을 여기에 추가하세요.
      console.log('회원가입:', { username, password });
      setError(''); // 에러 메시지를 초기화
    };
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
      setError(''); // 입력이 바뀔 때마다 에러 메시지를 초기화
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setError(''); // 입력이 바뀔 때마다 에러 메시지를 초기화
    };
  
    return (
      <MemberLayout>
        <div className="signup-form">
          {error && <div className="error-popup">{error}</div>} {/* 에러 팝업 */}
  
          <label>아이디</label>
          <InputFieldWithButton
            type="text"
            value={username}
            onChange={handleUsernameChange}
            onClickHandler={() => {}}
            buttonImage="src/assets/images/Members/button_x_in_circle.png"
          />
  
          <Button 
            text="인증하기" 
            onClick={handleSignup} 
          />
  
          <label>희망 비밀번호</label>
          <InputFieldWithButton
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onClickHandler={() => {}}
            buttonImage="src/assets/images/Members/button_x_in_circle.png"
          />
  
          <Button 
            text="회원 가입하기" 
            onClick={handleSignup} 
          />
        </div>
      </MemberLayout>
    );
  };
  
  export default SignupForm;