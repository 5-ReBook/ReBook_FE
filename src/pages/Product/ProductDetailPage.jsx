import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../api/AxiosInstance';
import ProductImage from '../../components/Product/ProductImage';
import SellerInfo from '../../components/Product/SellerInfo';
import ProductDescription from '../../components/Product/ProductDescription';
import ProductDetails from '../../components/Product/ProductDetails';
import Button from '../../components/Button';
import { useLoginInfo } from '../../provider/LoginInfoProvider';
import './ProductDetailPage.css';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';

function ProductDetailPage() {
  const { loginInfo } = useLoginInfo();
  const [product, setProduct] = useState(null);
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
  }, [setLayoutConfig]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await AxiosInstance.get(
          `/products/${productId}`
        );
        const fetchedProduct = productResponse.data.result;
        setProduct(fetchedProduct);
        setStatus(fetchedProduct.status.toUpperCase()); // 상태를 대문자로 설정

        if (fetchedProduct && fetchedProduct.sellerUsername) {
          const sellerInfoResponse = await AxiosInstance.get(
            `/members/info/${fetchedProduct.sellerUsername}`
          );
          const fetchedSellerInfo = sellerInfoResponse.data.result;
          setSellerInfo(fetchedSellerInfo);

          setIsOwner(fetchedSellerInfo.username === loginInfo.username);
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
        setStatus(newStatus.toUpperCase()); // 상태를 대문자로 설정
        alert('상태가 성공적으로 변경되었습니다.');
      }
    } catch (error) {
      console.error('Failed to change product status:', error);
      alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleChatButtonClick = () => {
    AxiosInstance
      .post('/chat/rooms', {
        sellerUsername: product.sellerUsername,
        buyerUsername: loginInfo.username,
        productId: product.productId,
      })
      .then(response => {
        const room = response.data.result;
        nav(`/chat/rooms/${room.roomId}`);
      })
      .catch(error => console.error('Failed to create chat room:', error));
  };

  const handleEditButtonClick = () => {
    nav(`/products/edit/${productId}`);
  };

  if (!product || !sellerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail">
        <ProductImage imageFileNames={product.storeFileNameList} />

        <SellerInfo
          sellerImageUrl={sellerInfo.storedFileName || ''}
          sellerName={sellerInfo.nickname || '이름 없음'}
          sellerUniversity={sellerInfo.university || '대학교 정보 없음'}
          sellerMajor={sellerInfo.majors || '전공 정보 없음'}
          status={status} // 상태를 사용
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
                status === 'COMPLETED' ? '판매중으로 변경' : '판매완료로 변경'
              }
              onClick={() =>
                handleStatusChange(
                  status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
                )
              }
            />
            <Button onClick={handleEditButtonClick} text="수정하기" />
          </>
        )}
        {!isOwner && <Button onClick={handleChatButtonClick} text="채팅하기" />}
      </div>
    </div>
  );
}

export default ProductDetailPage;
