import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [userInfo, setUserInfo] = useState({
    name: '김남기',
    university: '인천대학교',
    major: '컴퓨터공학부',
    profileImage: '',
  });

  //   useEffect(() => {
  //     // 서버에서 사용자 정보 가져오기
  //     axios
  //       .get('/api/user/info')
  //       .then((response) => {
  //         const data = response.data;
  //         setUserInfo({
  //           name: data.name,
  //           university: data.university,
  //           major: data.major,
  //           profileImage: data.profileImage,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch user info:', error);
  //       });
  //   }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button
          onClick={toggleSidebar}
          className="close-btn"
        >
          X
        </button>
      </div>
      <div className="sidebar-content">
        <div className="profile">
          <img
            src={userInfo.profileImage}
            alt="프로필 이미지"
          />
          <h2>{userInfo.name}</h2>
          <p>
            {userInfo.university} {userInfo.major}
          </p>
        </div>
        <ul>
          <li>
            <Link to="/edit-profile">
              <i className="icon-user"></i> 내 정보 수정
            </Link>
          </li>
          <li>
            <Link to="/my-posts">
              <i className="icon-file"></i> 내가 쓴 글
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
