import './ProductDescription.css';

const ProductDescription = ({ title, content, price }) => {
  return (
    <div className="product-description">
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="product-price">
        <strong>판매가격 :</strong> {price.toLocaleString()}원
      </div>
    </div>
  );
};

export default ProductDescription;
