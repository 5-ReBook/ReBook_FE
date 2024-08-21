import { useNavigate } from 'react-router-dom';
import './ProductListItem.css';

const ProductListItem = ({ product }) => {
  const nav = useNavigate();

  const getStatusLabel = status => {
    if (status === 'PENDING') {
      return <span className="status-label pending">판매중</span>;
    } else if (status === 'COMPLETED') {
      return <span className="status-label completed">판매완료</span>;
    }
  };

  const handleClick = () => {
    nav(`/products/${product.productId}`);
  };

  return (
    <div className="ProductListItem" onClick={handleClick}>
      <div className="img_section">
        <img
          src={`https://rb-dev-s3-images.s3.amazonaws.com/product/${product.storeFileName}`}
        />
      </div>
      <div className="info_section">
        <div className="title">{product.title}</div>
        <div className="univAndMajor">
          {product.university} {product.major}
        </div>
        <div className="price">{product.price}</div>
        {getStatusLabel(product.status)}
      </div>
    </div>
  );
};

export default ProductListItem;
