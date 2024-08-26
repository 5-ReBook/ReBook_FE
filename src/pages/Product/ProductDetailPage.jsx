import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../api/AxiosInstance';
import ProductImage from '../../components/Product/ProductImage';
import SellerInfo from '../../components/Product/SellerInfo';
import ProductDescription from '../../components/Product/ProductDescription';
import ProductDetails from '../../components/Product/ProductDetails';
import Button from '../../components/Button';
import './ProductDetailPage.css';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [status, setStatus] = useState(''); // 상태 관리 추가
  const nav = useNavigate();
  const { productId } = useParams();
  const { setLayoutConfig } = useLayout();

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await AxiosInstance.get(
          `/products/${productId}`
        );
        const fetchedProduct = productResponse.data.result;
        setProduct(fetchedProduct);
        setStatus(fetchedProduct.status); // 상태 초기화

        const userInfoResponse = await AxiosInstance.get('/members/me');
        const fetchedUserInfo = userInfoResponse.data.result;
        setUserInfo(fetchedUserInfo);

        if (fetchedProduct && fetchedProduct.sellerUsername) {
          const sellerInfoResponse = await AxiosInstance.get(
            `/members/info/${fetchedProduct.sellerUsername}`
          );
          const fetchedSellerInfo = sellerInfoResponse.data.result;
          setSellerInfo(fetchedSellerInfo);

          setIsOwner(fetchedSellerInfo.username === fetchedUserInfo.username);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [productId]);

  const handleStatusChange = async newStatus => {
    try {
      const response = await AxiosInstance.patch(
        `/products/status/${productId}`,
        {
          status: newStatus,
        }
      );

      if (response.status === 200) {
        setStatus(newStatus);
        alert('상태가 성공적으로 변경되었습니다.');
      }
    } catch (error) {
      console.error('Failed to change product status:', error);
      alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleChatButtonClick = () => {
    // 채팅하기 버튼 클릭시 실행될 로직
  };

  const handleEditButtonClick = () => {
    nav(`/products/edit/${productId}`);
  };

  if (!product || !sellerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <ProductImage imageFileNames={product.storeFileNameList} />

      <SellerInfo
        sellerImageUrl={''}
        sellerName={sellerInfo.nickname || '이름 없음'}
        sellerUniversity={sellerInfo.university || '대학교 정보 없음'}
        sellerMajor={sellerInfo.majors || '전공 정보 없음'}
        status={product.status || ''}
      />

      <ProductDescription
        title={product.title}
        content={product.content}
        price={product.price}
      />
      <ProductDetails
        university={product.bookUniversity}
        major={product.bookMajor}
      />
      {/* 상태 변경 버튼 추가 */}
      {isOwner && (
        <>
          <Button
            text={
              status === 'Completed' ? '거래완료로 변경' : '판매중으로 변경'
            }
            onClick={() =>
              handleStatusChange(
                status === 'Completed' ? 'Pending' : 'Completed'
              )
            }
          />
          <Button onClick={handleEditButtonClick} text="수정하기" />
        </>
      )}
      {!isOwner && <Button onClick={handleChatButtonClick} text="채팅하기" />}
    </div>
  );
};

export default ProductDetailPage;
