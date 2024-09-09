import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../api/AxiosInstance';
import InputField from '../../components/Product/InputField';
import Button from '../../components/Button';
import ImageGallery from '../../components/Product/ImageGallery';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';
import './ProductRegistrationPage.css';

const ProductRegistrationPage = () => {
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [universitySearchTerm, setUniversitySearchTerm] = useState('');
  const [universityList, setUniversityList] = useState([]);
  const [major, setMajor] = useState('');
  const [majorSearchTerm, setMajorSearchTerm] = useState('');
  const [majorList, setMajorList] = useState([]);
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const { setLayoutConfig } = useLayout();
  const nav = useNavigate();

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig]);

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      alert('이미지는 최대 3개까지만 업로드할 수 있습니다.');
      return;
    }

    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages(prevImages => [...prevImages, ...newImages].slice(0, 3));

    e.target.value = null;
  };

  const handleImageRemove = index => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handlePriceChange = e => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자는 제거
    setPrice(numericValue);
  };

  const handleUniversitySearchChange = e => {
    setUniversitySearchTerm(e.target.value);
  };

  const handleUniversitySearchClick = async () => {
    if (!universitySearchTerm.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }

    try {
      const response = await AxiosInstance.get('/members/universities', {
        params: {
          unvToSearch: universitySearchTerm,
        },
      });

      setUniversityList(response.data.result);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
      alert('해당 검색어로 검색된 값이 없습니다.');
    }
  };

  const handleUniversitySelect = selectedUniversity => {
    setUniversity(selectedUniversity);
    setUniversitySearchTerm(selectedUniversity);
    setUniversityList([]); // 리스트를 숨기기 위해 초기화
  };

  const handleMajorSearchChange = e => {
    setMajorSearchTerm(e.target.value);
  };

  const handleMajorSearchClick = async () => {
    if (!majorSearchTerm.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }

    try {
      const response = await AxiosInstance.get('/members/majors', {
        params: {
          majorToSearch: majorSearchTerm,
        },
      });

      setMajorList(response.data.result);
    } catch (error) {
      console.error('Failed to fetch majors:', error);
      alert('해당 검색어로 검색된 값이 없습니다.');
    }
  };

  const handleMajorSelect = selectedMajor => {
    setMajor(selectedMajor);
    setMajorSearchTerm(selectedMajor);
    setMajorList([]); // 리스트를 숨기기 위해 초기화
  };

  const validateInput = () => {
    if (title.length < 1 || title.length > 100) {
      alert('글 제목은 1자 이상 100자 이하로 입력해주세요.');
      return false;
    }
    if (university.length < 1 || university.length > 50) {
      alert('학교 이름은 1자 이상 50자 이하로 입력해주세요.');
      return false;
    }
    if (major.length < 1 || major.length > 50) {
      alert('전공은 1자 이상 50자 이하로 입력해주세요.');
      return false;
    }
    if (price.length < 1 || isNaN(price) || parseInt(price, 10) <= 0) {
      alert('유효한 가격을 입력해주세요.');
      return false;
    }
    if (content.length < 10 || content.length > 1000) {
      alert('게시글 내용은 10자 이상 1000자 이하로 입력해주세요.');
      return false;
    }
    if (images.length < 1) {
      alert('최소 1개 이상의 이미지를 업로드해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    const formData = new FormData();

    const productRequest = {
      title,
      university,
      major,
      price,
      content,
    };
    formData.append(
      'productRequest',
      new Blob([JSON.stringify(productRequest)], { type: 'application/json' })
    );

    images.forEach(image => {
      formData.append('imageFiles', image.file);
    });

    try {
      const response = await AxiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Submitted:', response.data);
      alert('상품이 성공적으로 등록되었습니다.');
      nav('/');
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="product-registration-wrapper">
      <div className="product-registration">
        <InputField
          label="글 제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="글 제목"
          maxLength={100}
        />

        <div className="university-search">
          <label>대학교를 검색해주세요.</label>
          <div className="search-bar">
            <InputField
              value={universitySearchTerm}
              onChange={handleUniversitySearchChange}
              placeholder="대학교 검색"
            />
            <button onClick={handleUniversitySearchClick}>🔍</button>
          </div>
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
        </div>

        <div className="major-search">
          <label>전공을 검색해주세요.</label>
          <div className="search-bar">
            <InputField
              value={majorSearchTerm}
              onChange={handleMajorSearchChange}
              placeholder="전공 검색"
            />
            <button onClick={handleMajorSearchClick}>🔍</button>
          </div>
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
        </div>

        <InputField
          label="₩ 가격 입력"
          value={price}
          onChange={handlePriceChange}
          placeholder="₩ 가격 입력"
          type="text"
        />

        <div className="form-group">
          <textarea
            placeholder="올릴 게시글 내용을 작성해주세요."
            value={content}
            onChange={e => setContent(e.target.value)}
            maxLength={1000}
          />
        </div>

        <ImageGallery
          images={images}
          onImageRemove={handleImageRemove}
          onImageUpload={handleImageUpload}
        />

        <Button text="완료" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ProductRegistrationPage;
