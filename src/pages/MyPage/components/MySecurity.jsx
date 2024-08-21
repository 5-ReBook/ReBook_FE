import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../components/Button';
import './MySecurity.css';

function MySecurity() {
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    navigate('/findpassword');
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('Authorization');

    try {
      await axios.post(
        '/api/auth/signout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },

          withCredentials: true,
        }
      );
      // 로그아웃 후 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('Authorization');
      console.log('User logged out');
      window.location.reload();
      navigate('/signin'); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirmDeletion) {
      const token = localStorage.getItem('Authorization');

      try {
        await axios.delete('/api/members', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User account deleted');
        await handleLogout();
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  return (
    <div className="mysecurity-container">
      <Button text="비밀번호 수정" onClick={handlePasswordChange} />
      <Button
        text="로그아웃"
        onClick={handleLogout}
        className="logout-button"
      />
      <Button
        text="회원탈퇴"
        onClick={handleAccountDeletion}
        className="delete-account-button"
      />
    </div>
  );
}

export default MySecurity;
