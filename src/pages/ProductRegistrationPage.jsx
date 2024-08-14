import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../components/Product/InputField';
import Button from '../components/Button';
import Header from '../components/Header';
import ImageGallery from '../components/Product/ImageGallery';

const ProductRegistrationPage = () => {
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const nav = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      alert(
        '이미지는 최대 3개까지만 업로드할 수 있습니다.'
      );
      return;
    }

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImages) =>
      [...prevImages, ...newImages].slice(0, 3)
    );

    e.target.value = null;
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    // 여기에 form 데이터를 서버로 전송하는 로직을 추가하세요.
    const formData = {
      title,
      university,
      major,
      price,
      description,
      images,
    };

    console.log('Submitted:', formData);
    // 서버로 데이터를 전송하는 코드 (예: fetch 또는 axios)
  };

  return (
    <div className="product-registration">
      <Header
        title={'ReBook'}
        leftChild={
          <button onClick={() => nav(-1)}>{'<'}</button>
        }
      />

      <InputField
        label="글 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="글 제목"
      />

      <InputField
        label="학교 이름"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        placeholder="학교 이름"
      />

      <InputField
        label="전공"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="전공"
      />

      <InputField
        label="₩ 가격 입력"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="₩ 가격 입력"
        type="number"
      />

      <div className="form-group">
        <textarea
          placeholder="올릴 게시글 내용을 작성해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
