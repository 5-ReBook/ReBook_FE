import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AuthAxios from '../../interceptors/AuthAxios';
import './styles/MyInfo.style.css';

const MyInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [majors, setMajors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfoResponse = await AuthAxios.get(
          'http://localhost:8080/members',
        );

        if (userInfoResponse.status === 200) {
          const { username, nickname, university, majors } =
            userInfoResponse.data.result;
          setUser({ username, nickname, university, majors });
          setNickname(nickname);
          setUniversity(university);
          setMajors(majors);
        }
      } catch (error) {
        console.error('fetching user info failed:', error);
        alert('재로그인이 필요합니다.');
        navigate('/'); // 에러 발생 시 메인 페이지로 이동
      }
    };

    if (!user) {
      fetchUserData();
    } else {
      setNickname(user.nickname);
      setUniversity(user.university);
      setMajors(user.majors);
    }
  }, [user, setUser, navigate]);

  const handleEditProfile = () => {
    alert('프로필 사진을 편집합니다.');
  };

  const handleSave = () => {
    alert('수정된 정보를 저장합니다.');
  };

  const handleLogout = () => {
    delete AuthAxios.defaults.headers.common['Authorization'];
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
      <div className="profile-image__container_outer">
        <div className="profile-image__container_inner">
          <img
            className="profile-image"
            src="https://via.placeholder.com/150"
            alt="프로필사진"
          />
        </div>
        <button className="profile-image__button" onClick={handleEditProfile}>
          📷
        </button>
      </div>
      <div>
        <div className="user-info__container_outer">
          <label htmlFor="nickname">닉네임</label>
          <div className="user-info__container_inner">
            {nickname || '닉네임 정보 없음'}
            <button
              className="user-info__edit-button"
              onClick={() => alert('닉네임 수정')}
            >
              ✏️
            </button>
          </div>
        </div>
        <div className="user-info__container_outer">
          <label htmlFor="university">대학교</label>
          <div className="user-info__container_inner">
            {university || '대학교 정보 없음'}
            <button
              className="user-info__edit-button"
              onClick={() => alert('대학교 수정')}
            >
              ✏️
            </button>
          </div>
        </div>
        <div className="user-info__container_outer">
          <label htmlFor="majors">관심전공들</label>
          <div className="user-info__container_inner-scrollable">
            {majors || '관심 전공 정보 없음'}
            <button
              className="user-info__edit-button"
              onClick={() => alert('관심 전공 수정')}
            >
              ✏️
            </button>
          </div>
        </div>
      </div>
      <div className="user-info__button-container">
        <button className="user-info__button" onClick={handleSave}>
          수정하기
        </button>
        <button className="user-info__button" onClick={handleLogout}>
          로그아웃
        </button>
        <button className="user-info__button" onClick={handleDeleteAccount}>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyInfo;
