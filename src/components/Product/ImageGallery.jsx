import './ImageGallery.css';

const ImageGallery = ({ images, onImageRemove, onImageUpload }) => {
  return (
    <div className="image-gallery">
      {images.length < 3 && (
        <label className="image-upload-placeholder">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImageUpload}
            style={{ display: 'none' }}
          />
          <div className="upload-icon">📷</div>
        </label>
      )}
      {images.map((image, index) => (
        <div key={index} className="image-preview">
          <img src={image.url} alt={`uploaded ${index}`} />
          <button type="button" onClick={() => onImageRemove(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
