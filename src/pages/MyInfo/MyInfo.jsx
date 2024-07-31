import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AuthAxios from '../../interceptors/AuthAxios';

const MyInfo = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [majors, setMajors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfoResponse = AuthAxios.get('http://localhost:8080/members');

        if (userInfoResponse.status === 200) {
          const { username, nickname, university, majors } =
            userInfoResponse.data.result;
          setUser({ username, nickname, university, majors });
          setNickname(nickname);
          setMajors(majors);
          setUniversity(university);
        }
      } catch (error) {
        console.error('fetching user info failed:', error);
        alert('재로그인이 필요합니다.');
      }
    };

    if (user) {
      setNickname(user.nickname);
      setUniversity(user.university);
      setMajors(user.majors);
    } else {
      fetchUserData();
    }
    console.log(user);
  }, [user, setUser, navigate]);

  const handleEditProfile = () => {
    alert('프로필 사진을 편집합니다.');
  };

  const handleSave = () => {
    alert('수정된 정보를 저장합니다.');
  };

  const handleLogout = () => {
    delete axios.defaults.headers.common['Authorization'];
    document.cookie =
      'refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('Authorization');
    window.location.href = '/';
    alert('로그아웃합니다.');
  };

  const handleDeleteAccount = async () => {
    // 회원 탈퇴 로직: 계정 삭제 요청
    if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
      try {
        const response = await AuthAxios.delete(
          'http://localhost:8080/members',
        );
        if (response.status === 200) {
          alert('회원 탈퇴가 성공적으로 처리되었습니다.');
          localStorage.removeItem('Authorization');
          document.cookie =
            'refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/'; // 메인 페이지로 리디렉션
        } else {
          console.error('회원 탈퇴 실패:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div>
      <div style={profileImageContainerStyle} onClick={handleEditProfile}>
        <img
          src="https://via.placeholder.com/150"
          alt="프로필"
          style={profileImageStyle}
        />
      </div>
      <div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <div id="nickname" style={infoStyle}>
            {nickname || '닉네임 정보 없음'}
          </div>
        </div>
        <div>
          <label htmlFor="university">대학교</label>
          <div id="university" style={infoStyle}>
            {university || '대학교 정보 없음'}
          </div>
        </div>
        <div>
          <label htmlFor="majors">관심전공들</label>
          <div id="majors" style={scrollableInfoStyle}>
            {majors || '관심 전공 정보 없음'}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleSave}
          style={{ display: 'block', marginBottom: '10px' }}
        >
          수정하기
        </button>
        <button
          onClick={handleLogout}
          style={{ display: 'block', marginBottom: '10px' }}
        >
          로그아웃
        </button>
        <button onClick={handleDeleteAccount} style={{ display: 'block' }}>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

const profileImageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '3px solid #ccc',
  margin: '0 auto',
};

const profileImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const infoStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  marginTop: '5px',
  maxWidth: '300px', // 가로 최대 길이 설정
  overflowX: 'hidden', // 가로 스크롤 숨기기
};

const scrollableInfoStyle = {
  ...infoStyle,
  maxHeight: '150px', // 최대 높이 설정
  overflowY: 'auto', // 세로 스크롤 설정
};

export default MyInfo;
