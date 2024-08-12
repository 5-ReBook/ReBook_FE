import './ProductListItem.css';

const ProductListItem = ({ product }) => {
  return (
    <div className="ProductListItem">
      <div className="img_section">
        <img
          src={`https://rebookbucket.s3.amazonaws.com/${product.storeFileName}`}
        />
      </div>
      <div className="info_section">
        <div className="title">{product.title}</div>
        <div className="univAndMajor">
          {product.university} {product.major}
        </div>
        <div className="price">{product.price}</div>
        <div className="status">{product.status}</div>
      </div>
    </div>
  );
};

export default ProductListItem;
