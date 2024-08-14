const ProductDescription = ({
  title,
  description,
  price,
}) => {
  return (
    <div className="product-description">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="product-price">
        <strong>판매가격 :</strong> {price.toLocaleString()}
        원
      </div>
    </div>
  );
};

export default ProductDescription;
