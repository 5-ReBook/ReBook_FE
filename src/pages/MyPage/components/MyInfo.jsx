/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import InputFieldWithButton from '../../../components/Common/InputFieldWithButton';
import ProfilePicture from './ProfilePicture';
import './MyInfo.css';
import AxiosInstance from '../../../api/AxiosInstance';

function MyInfo() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [majors, setMajors] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // 초기 프로필 이미지
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const token = localStorage.getItem('Authorization');
        // const response = await axios.get('/api/members/me', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const response = await AxiosInstance.get('members/me');

        setProfilePicture(response.data.result.storedFileName);
        setUsername(response.data.result.username);
        setNickname(response.data.result.nickname);
        setUniversity(response.data.result.university);
        setMajors(response.data.result.majors);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleNicknameChange = e => setNickname(e.target.value);
  const handleUniversityChange = e => setUniversity(e.target.value);
  const handleMajorsChange = e => setMajors(e.target.value);

  const handleNicknameSave = async () => {
    try {
      // const token = localStorage.getItem('Authorization');
      // const response = await axios.patch(
      //   '/api/members/nickname',
      //   {
      //     nickname,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const response = await AxiosInstance.patch('members/nickname', {
        nickname,
      });

      console.log('Nickname saved:', response.data.result.nickname);
    } catch (error) {
      console.error('Failed to save nickname:', error);
    }
  };

  const handleUniversitySave = () => {
    navigate(`/myunv`, { state: { university } });
  };

  const handleMajorsSave = () => {
    const majorsToSend = majors === '관심 전공을 설정하세요.' ? '' : majors;
    navigate('/mymajors', { state: { majors: majorsToSend } });
  };

  const handleEditPicture = async e => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('picture', file);

      try {
        // const token = localStorage.getItem('Authorization');
        // const response = await axios.patch(
        //   '/api/members/profilePicture',
        //   formData,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   }
        // );
        const response = await AxiosInstance.patch(
          'members/profilePicture',
          formData,
          { 'Content-Type': 'multipart/form-data' }
        );

        setProfilePicture(response.data.result.storedFileName);

        console.log(
          'Profile picture updated:',
          response.data.result.storedFileName
        );
      } catch (error) {
        console.error('Failed to update profile picture:', error);
      }
    }
  };

  const handleDeletePicture = async () => {
    try {
      // const token = localStorage.getItem('Authorization');
      // await axios.delete('/api/members/profilePicture', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      await AxiosInstance.delete('members/profilePicture');

      setProfilePicture(null);
      console.log('Profile picture deleted.');
    } catch (error) {
      console.error('Failed to delete profile picture:', error);
    }
  };

  return (
    <div className="myinfo-container">
      <ProfilePicture
        profilePicture={profilePicture}
        handleEditPicture={handleEditPicture}
        handleDeletePicture={handleDeletePicture}
      />

      <div className="username-container">
        <div className="username">{username}</div>
      </div>

      <div className="input-section">
        <label>닉네임</label>
        <InputFieldWithButton
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          onClickHandler={handleNicknameSave}
          buttonImage="src/assets/images/Members/save.png"
        />
      </div>

      <div className="input-section">
        <label>대학교</label>
        <InputFieldWithButton
          type="text"
          value={university}
          onChange={handleUniversityChange}
          onClickHandler={handleUniversitySave}
          buttonImage="src/assets/images/Members/edit.png"
          disabled={1}
        />
      </div>

      {/* TODO : 전공 많을때 여러줄로 보이게 하는 방법 생각해보기 */}
      <div className="input-section">
        <label>관심 전공</label>
        <InputFieldWithButton
          type="textarea"
          value={majors}
          onChange={handleMajorsChange}
          onClickHandler={handleMajorsSave}
          buttonImage="src/assets/images/Members/edit.png"
          disabled={1}
          className="input-field__major"
        />
      </div>
    </div>
  );
}

export default MyInfo;
