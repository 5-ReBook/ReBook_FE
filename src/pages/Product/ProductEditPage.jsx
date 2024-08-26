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

function ProductEditPage() {
  const [title, setTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지를 저장하는 상태
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

  const handleSubmit = async () => {
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

  return (
    <div className="product-registration">
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

      <Button text="수정 완료" onClick={handleSubmit} />
    </div>
  );
}

export default ProductEditPage;
