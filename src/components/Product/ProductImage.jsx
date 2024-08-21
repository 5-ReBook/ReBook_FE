import { useState } from 'react';
import './ProductImage.css';

const ProductImage = ({ imageFileNames }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? imageFileNames.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === imageFileNames.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="product-image-slider">
      <button type="button" onClick={handlePrevClick}>
        &lt;
      </button>
      <img
        src={`https://rb-dev-s3-images.s3.amazonaws.com/product/${imageFileNames[currentIndex]}`}
        alt={`Product pic ${currentIndex + 1}`}
        className="product-image"
      />
      <button type="button" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
};

export default ProductImage;
