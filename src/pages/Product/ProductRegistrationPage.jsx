import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/AxiosInstance';
import InputField from '../../components/Product/InputField';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ImageGallery from '../../components/Product/ImageGallery';

const ProductRegistrationPage = () => {
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const nav = useNavigate();

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

  const handleSubmit = async () => {
    const formData = new FormData();

    // JSON 형태의 데이터를 추가
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

    // 이미지 파일 추가
    images.forEach(image => {
      formData.append('imageFiles', image.file);
    });

    try {
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 폼 데이터 전송 시 필요
        },
      });

      console.log('Submitted:', response.data);
      // nav('/'); // 등록 후 이동할 페이지 설정
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <div className="product-registration">
      <Header
        title="ReBook"
        leftChild={
          <button type="button" onClick={() => nav(-1)}>
            {'<'}
          </button>
        }
      />

      <InputField
        label="글 제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="글 제목"
      />

      <InputField
        label="학교 이름"
        value={university}
        onChange={e => setUniversity(e.target.value)}
        placeholder="학교 이름"
      />

      <InputField
        label="전공"
        value={major}
        onChange={e => setMajor(e.target.value)}
        placeholder="전공"
      />

      <InputField
        label="₩ 가격 입력"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="₩ 가격 입력"
        type="number"
      />

      <div className="form-group">
        <textarea
          placeholder="올릴 게시글 내용을 작성해주세요."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <ImageGallery
        images={images}
        onImageRemove={handleImageRemove}
        onImageUpload={handleImageUpload}
      />

      <Button text="완료" onClick={handleSubmit} />
    </div>
  );
};

export default ProductRegistrationPage;
