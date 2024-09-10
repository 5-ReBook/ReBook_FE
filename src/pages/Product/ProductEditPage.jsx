import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../api/AxiosInstance';
import InputField from '../../components/Product/InputField';
import Button from '../../components/Button';
import ImageGallery from '../../components/Product/ImageGallery';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';
import './ProductRegistrationPage.css'; // 기존의 등록 페이지 스타일 재사용

const ProductEditPage = () => {
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지를 저장하는 상태
  const [universityList, setUniversityList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const { setLayoutConfig } = useLayout();
  const nav = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    // 상품 정보 로드
    const fetchProduct = async () => {
      try {
        const response = await AxiosInstance.get(`/products/${productId}`);
        const productData = response.data.result;
        setTitle(productData.title);
        setUniversity(productData.bookUniversity);
        setMajor(productData.bookMajor);
        setPrice(productData.price);
        setContent(productData.content);

        // 기존 이미지를 배열로 처리
        const initialImages = productData.storeFileNameList.map(image => ({
          url: `https://rb-dev-s3-images.s3.amazonaws.com/product/${image}`, // 실제 S3 버킷 URL로 대체하세요
          file: null,
          storeFileName: image, // S3에 저장된 파일명
        }));

        setImages(initialImages);
        setExistingImages(initialImages); // 기존 이미지를 상태로 저장
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProduct();

    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [productId, setLayoutConfig]);

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
    const removedImage = images[index];

    // 기존 이미지에서 제거된 경우, 기존 이미지 목록에서도 제거
    if (removedImage.storeFileName) {
      setExistingImages(prev =>
        prev.filter(img => img.storeFileName !== removedImage.storeFileName)
      );
    }

    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handlePriceChange = e => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자는 제거
    setPrice(numericValue);
  };

  const handleUniversitySearch = async () => {
    if (!university.trim()) {
      alert('대학교를 입력하세요.');
      return;
    }

    try {
      const response = await AxiosInstance.get('/members/universities', {
        params: {
          unvToSearch: university,
        },
      });

      setUniversityList(response.data.result);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    }
  };

  const handleMajorSearch = async () => {
    if (!major.trim()) {
      alert('전공을 입력하세요.');
      return;
    }

    try {
      const response = await AxiosInstance.get('/members/majors', {
        params: {
          majorToSearch: major,
        },
      });

      setMajorList(response.data.result);
    } catch (error) {
      console.error('Failed to fetch majors:', error);
    }
  };

  const handleUniversitySelect = selectedUniversity => {
    setUniversity(selectedUniversity);
    setUniversityList([]); // 리스트를 숨기기 위해 초기화
  };

  const handleMajorSelect = selectedMajor => {
    setMajor(selectedMajor);
    setMajorList([]); // 리스트를 숨기기 위해 초기화
  };

  // 유효성 검사 함수
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
    if (images.length === 0) {
      alert('최소 1개의 이미지를 업로드해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    const formData = new FormData();

    // JSON 형태의 데이터를 추가
    const productRequest = {
      title,
      university,
      major,
      price,
      content,
      existingImages: existingImages.map(img => img.storeFileName), // 유지할 기존 이미지의 파일명 전달
    };
    formData.append(
      'productRequest',
      new Blob([JSON.stringify(productRequest)], { type: 'application/json' })
    );

    // 새로운 이미지 파일 추가
    images.forEach(image => {
      if (image.file) {
        formData.append('imageFiles', image.file);
      }
    });

    try {
      const response = await AxiosInstance.put(
        `/products/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // 폼 데이터 전송 시 필요
          },
        }
      );

      console.log('Updated:', response.data);
      alert('상품이 성공적으로 수정되었습니다.');
      nav(`/products/${productId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error('Error updating product:', error);
      alert('상품 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleProductDelete = async () => {
    const confirmDelete = window.confirm('정말로 이 상품을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await AxiosInstance.delete(`/products/${productId}`);
      if (response.status === 200) {
        alert('상품이 성공적으로 삭제되었습니다.');
        nav('/'); // 삭제 후 메인 페이지로 이동
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('상품 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="product-registration">
      <InputField
        label="글 제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="글 제목"
        maxLength={100} // 최대 길이 제한
      />

      <div className="university-search">
        <label>학교 이름</label>
        <div className="search-bar">
          <input
            type="text"
            value={university}
            onChange={e => setUniversity(e.target.value)}
            placeholder="학교 이름"
          />
          <button type="button" onClick={handleUniversitySearch}>
            🔍
          </button>
        </div>
        {universityList.length > 0 && (
          <div className="university-list">
            {universityList.map(univ => (
              <div
                key={univ}
                className="university-item"
                onClick={() => handleUniversitySelect(univ)}
                onKeyDown={e =>
                  e.key === 'Enter' && handleUniversitySelect(univ)
                }
                tabIndex={0} // 키보드 접근성을 위해 tabIndex 추가
                role="button" // 키보드 접근성을 위해 role 추가
              >
                {univ}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="major-search">
        <label>전공</label>
        <div className="search-bar">
          <input
            type="text"
            value={major}
            onChange={e => setMajor(e.target.value)}
            placeholder="전공"
          />
          <button type="button" onClick={handleMajorSearch}>
            🔍
          </button>
        </div>
        {majorList.length > 0 && (
          <div className="major-list">
            {majorList.map(mjr => (
              <div
                key={mjr}
                className="major-item"
                onClick={() => handleMajorSelect(mjr)}
                onKeyDown={e => e.key === 'Enter' && handleMajorSelect(mjr)}
                tabIndex={0} // 키보드 접근성을 위해 tabIndex 추가
                role="button" // 키보드 접근성을 위해 role 추가
              >
                {mjr}
              </div>
            ))}
          </div>
        )}
      </div>

      <InputField
        label="₩ 가격 입력"
        value={price}
        onChange={handlePriceChange} // 숫자만 허용
        placeholder="₩ 가격 입력"
        type="text" // type을 text로 설정하여 e 등의 입력을 막음
      />

      <div className="form-group">
        <textarea
          placeholder="올릴 게시글 내용을 작성해주세요."
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength={1000} // 최대 길이 제한
        />
      </div>

      <ImageGallery
        images={images}
        onImageRemove={handleImageRemove}
        onImageUpload={handleImageUpload}
      />

      <Button text="수정 완료" onClick={handleSubmit} />
      <Button
        className="delete-button"
        text="삭제하기"
        onClick={handleProductDelete}
      />
    </div>
  );
};

export default ProductEditPage;
