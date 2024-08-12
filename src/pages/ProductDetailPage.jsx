import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductImage from '../components/Product/ProductImage';
import SellerInfo from '../components/Product/SellerInfo';
import ProductDescription from '../components/Product/ProductDescription';
import ProductDetails from '../components/Product/ProductDetails';
import Button from '../components/Button';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // JSON 파일에서 데이터를 불러옴
    fetch('/src/db/productdetail.json')
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error(
          'Error fetching product detail:',
          error
        )
      );
  }, []);

  const handleChatButtonClick = () => {
    // 채팅하기 버튼 클릭시 실행될 로직
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <Header />
      <ProductImage
        imageUrl={product.imageUrl}
        title={product.title}
      />
      <SellerInfo
        sellerImageUrl={product.sellerImageUrl}
        sellerName={product.sellerName}
        sellerUniversity={product.sellerUniversity}
        status={product.status}
      />
      <ProductDescription
        title={product.title}
        description={product.description}
        price={product.price}
      />
      <ProductDetails
        university={product.university}
        major={product.major}
      />
      <Button
        onClick={handleChatButtonClick}
        text={'채팅하기'}
      />
    </div>
  );
};

export default ProductDetailPage;
