/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFieldWithButton from '../../components/Common/InputFieldWithButton';
import Button from '../../components/Button';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';
import AxiosInstance from '../../api/AxiosInstance';

function UpdateUniversity({ location }) {
  const [searchTerm, setSearchTerm] = useState(
    location?.state?.university || ''
  );
  const [universityList, setUniversityList] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const navigate = useNavigate();
  const { setLayoutConfig } = useLayout();

  useEffect(() => {
    import('./styles/UpdateUniversity.css');
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: false,
    });

    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  const handleSearchChange = e => setSearchTerm(e.target.value);

  const handleSearchClick = async () => {
    try {
      const response = await AxiosInstance.get('/members/universities', {
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
      await AxiosInstance.patch('/members/university', {
        university: selectedUniversity,
      });

      console.log('University updated to:', selectedUniversity);
      alert('대학교 업데이트 완료!');
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/mypage');
      }
    } catch (error) {
      console.error('Failed to update university:', error);
    }
  };

  return (
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
  );
}

export default UpdateUniversity;
