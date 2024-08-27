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

const ProductDetailPage = () => {
  const { loginInfo } = useLoginInfo();
  const [product, setProduct] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const nav = useNavigate();
  const { productId } = useParams();
  const { setLayoutConfig } = useLayout();

  // 예시 seller
  const seller = {
    id: 3,
    profile: '809a9d80-5d4b-429e-b632-e4dfb2068031.png',
    nickName: '이창식',
    university: '서울대학교',
    major: '컴퓨터공학부',
  };

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  useEffect(() => {
    AxiosInstance.get(`/products/${productId}`)
      .then(response => setProduct(response.data.result))
      .catch(error => console.error('Failed to fetch product details:', error));
  }, [productId]);

  useEffect(() => {
    if (product && product.sellerUsername) {
      // 사용자 정보 조회 (sellerUsername를 사용하여 사용자 정보 조회)
      // AxiosInstance.get(`/users/${product.sellerId}`) // 예시로 사용자 정보를 /users/:userId API로 조회
      //   .then(response => setUserInfo(response.data.result))
      //   .catch(error => console.error('Failed to fetch user details:', error));

      setUserInfo(seller);
    }
  }, [product]);

  const handleChatButtonClick = () => {
    api
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <ProductImage imageFileNames={product.storeFileNameList} />
      <SellerInfo
        sellerImageUrl={seller.profile}
        sellerName={seller.nickName}
        sellerUniversity={seller.university}
        sellerMajor={seller.major}
        status={product.status}
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
      <Button onClick={handleChatButtonClick} text="채팅하기" />
    </div>
  );
};

export default ProductDetailPage;
