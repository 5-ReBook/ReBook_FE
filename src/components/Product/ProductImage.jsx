const ProductImage = ({ imageUrl, title }) => {
  return (
    <div className="product-image">
      <img src={imageUrl} alt={title} />
    </div>
  );
};

export default ProductImage;
