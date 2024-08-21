/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MembersLayout from '../../components/Layouts/MembersLayout';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import Button from '../../components/Button';
import './styles/UpdateMajors.css';

function UpdateMajors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [majorList, setMajorList] = useState([]); // 검색된 전공 리스트
  const [selectedMajors, setSelectedMajors] = useState([]); // 선택된 전공 리스트
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('Authorization');
      if (token) {
        try {
          const response = await axios.get('/api/members/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedMajors = response.data.result.majors;
          if (fetchedMajors === '관심 전공을 설정하세요.') {
            alert('관심 전공을 추가해주세요!');
            setSelectedMajors([]); // 빈 값으로 설정
          } else if (fetchedMajors) {
            setSelectedMajors(
              fetchedMajors.split(',').map(major => major.trim())
            );
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSearchChange = e => setSearchTerm(e.target.value);

  const handleSearchClick = async () => {
    if (!searchTerm.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }

    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.get('/api/members/majors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          majorToSearch: searchTerm,
        },
      });

      setMajorList(response.data.result);
    } catch (error) {
      alert('해당 검색어로 검색된 값이 없습니다.');
      console.error('Failed to fetch majors:', error);
    }
  };

  const handleMajorSelect = major => {
    if (!selectedMajors.includes(major)) {
      setSelectedMajors(prevMajors => [...prevMajors, major]);
    }
    setMajorList([]); // 검색 결과를 초기화
    setSearchTerm(''); // 검색어를 초기화
  };

  const handleMajorRemove = index => {
    setSelectedMajors(prevMajors => prevMajors.filter((_, i) => i !== index));
  };

  /*
    @PatchMapping("/api/members/majors")
    @RequestBody UpdateMajorsDTO majorsDTO){
  */
  const handleSave = async () => {
    const majorsToSave = selectedMajors.join(','); // 선택된 전공들을 하나의 문자열로 결합

    try {
      const token = localStorage.getItem('Authorization'); // 토큰 가져오기
      await axios.patch(
        '/api/members/majors',
        {
          majors: majorsToSave, // 전공 리스트를 majors라는 이름으로 요청 바디에 포함
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 요청 헤더에 Authorization 토큰 추가
          },
        }
      );

      console.log('Majors updated to:', majorsToSave);
      alert('전공 목록 업데이트 완료!');
      navigate('/mypage'); // 성공 시 /mypage로 이동
    } catch (error) {
      console.error('Failed to update majors:', error);
    }
  };

  return (
    <MembersLayout>
      <div className="update-majors-container">
        <label>현재 전공 목록:</label>
        <div className="selected-majors">
          {selectedMajors.map((major, index) => (
            <div key={index} className="selected-major">
              {major}
              <span
                className="remove-major"
                onClick={() => handleMajorRemove(index)}
              >
                x
              </span>
            </div>
          ))}
        </div>

        <label>
          전공을 검색해주세요.
          <InputFieldWithButton
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onClickHandler={handleSearchClick}
            buttonImage="src/assets/images/search.png"
            className="input-item"
          />
        </label>

        {majorList.length > 0 && (
          <div className="major-list">
            {majorList.map((major, index) => (
              <div
                key={index}
                className="major-item"
                onClick={() => handleMajorSelect(major)}
              >
                {major}
              </div>
            ))}
          </div>
        )}

        <Button text="수정 완료" onClick={handleSave} />
      </div>
    </MembersLayout>
  );
}

export default UpdateMajors;
