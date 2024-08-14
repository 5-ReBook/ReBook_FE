import './ProductListItem.css';

const ProductListItem = ({ product }) => {
  const getStatusLabel = (status) => {
    if (status === 'PENDING') {
      return (
        <span className="status-label pending">판매중</span>
      );
    } else if (status === 'COMPLETED') {
      return (
        <span className="status-label completed">
          판매완료
        </span>
      );
    }
  };

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
        {getStatusLabel(product.status)}
      </div>
    </div>
  );
};

export default ProductListItem;
