import ProfileImage from '../Common/ProfileImage';
import './SellerInfo.css';
import defaultImage from '/src/assets/images/basicprofile.png';

const SellerInfo = ({
  sellerImageUrl,
  sellerName,
  sellerUniversity,
  sellerMajor,
  status,
}) => {
  const imageUrl = sellerImageUrl
    ? `https://rb-dev-s3-images.s3.amazonaws.com/product/${sellerImageUrl}`
    : defaultImage;

  return (
    <div className="seller-info">
      <ProfileImage src={imageUrl} name={`${sellerName}`} size="md" />
      <div className="seller-info-detail">
        <h3>{sellerName}</h3>
        <p>
          {sellerUniversity} {sellerMajor}
        </p>
      </div>
      <span className={`status-label ${status.toLowerCase()}`}>
        {status === 'PENDING' ? '판매중' : '판매완료'}
      </span>
    </div>
  );
};

export default SellerInfo;
