import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import './MySecurity.css';
import AxiosInstance from '../../../api/AxiosInstance';

function MySecurity() {
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    navigate('/findpassword');
  };

  const handleLogout = async () => {
    try {
      await AxiosInstance.post('/auth/signout');
      localStorage.removeItem('Authorization');
      window.location.reload();
      console.log('User logged out');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirmDeletion) {
      try {
        // '/api/members'
        await AxiosInstance.delete('/members');

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
