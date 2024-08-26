import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/AxiosInstance';
import Header from '../../components/Header';
import ProductImage from '../../components/Product/ProductImage';
import SellerInfo from '../../components/Product/SellerInfo';
import ProductDescription from '../../components/Product/ProductDescription';
import ProductDetails from '../../components/Product/ProductDetails';
import Button from '../../components/Button';
import { useLoginInfo } from '../../provider/LoginInfoProvider';

const ProductDetailPage = () => {
  const { loginInfo } = useLoginInfo();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    api
      .get(`/products/${productId}`)
      .then(response => setProduct(response.data.result))
      .catch(error => console.error('Failed to fetch product details:', error));
  }, [productId]);

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
      <Header
        title="ReBook"
        leftChild={
          <button type="button" onClick={() => nav(-1)}>
            {'<'}
          </button>
        }
      />
      <ProductImage imageFileNames={product.storeFileNameList} />
      <SellerInfo
        sellerImageUrl={product.sellerImageUrl}
        sellerName={product.sellerName}
        sellerUniversity={product.sellerUniversity}
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
