import './ProductDetails.css';

const ProductDetails = ({ university, major }) => {
  return (
    <div className="product-details">
      <p>
        <strong>사용 대학 :</strong> {university}
      </p>
      <p>
        <strong>전공 :</strong> {major}
      </p>
    </div>
  );
};

export default ProductDetails;
