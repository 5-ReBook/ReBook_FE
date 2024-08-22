/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import Button from '../../components/Button';
import './styles/UpdateUniversity.css';

function UpdateUniversity({ location }) {
  const [searchTerm, setSearchTerm] = useState(
    location?.state?.university || ''
  );
  const [universityList, setUniversityList] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = e => setSearchTerm(e.target.value);

  const handleSearchClick = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.get('/api/members/universities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          unvToSearch: searchTerm,
        },
      });

      setUniversityList(response.data.result);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    }
  };

  const handleUniversitySelect = university => {
    setSelectedUniversity(university);
    setSearchTerm(university);
    setUniversityList([]); // 리스트를 숨기기 위해 초기화
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('Authorization'); // 토큰 가져오기
      await axios.patch(
        '/api/members/university',
        {
          university: selectedUniversity, // 선택된 대학교를 요청 바디에 포함
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 요청 헤더에 Authorization 토큰 추가
          },
        }
      );

      console.log('University updated to:', selectedUniversity);
      alert('대학교 업데이트 완료!');
      if (window.history.length > 1) {
        navigate(-1); // 이전 페이지로 돌아가기
      } else {
        navigate('/mypage'); // 이전 페이지가 없으면 /mypage로 이동
      }
    } catch (error) {
      console.error('Failed to update university:', error);
    }
  };

  return (
    <MembersLayout>
      <div className="update-university-container">
        <label>
          대학교를 검색해주세요.
          <InputFieldWithButton
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onClickHandler={handleSearchClick}
            buttonImage="src/assets/images/search.png"
            className="input-item"
          />
        </label>

        {universityList.length > 0 && (
          <div className="university-list">
            {universityList.map((university, index) => (
              <div
                key={index}
                className="university-item"
                onClick={() => handleUniversitySelect(university)}
              >
                {university}
              </div>
            ))}
          </div>
        )}

        <Button text="수정 완료" onClick={handleSave} />
      </div>
    </MembersLayout>
  );
}

export default UpdateUniversity;
