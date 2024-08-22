import ProfileImage from '../Common/ProfileImage';
import './SellerInfo.css';

const SellerInfo = ({
  sellerImageUrl,
  sellerName,
  sellerUniversity,
  sellerMajor,
  status,
}) => {
  return (
    <div className="seller-info">
      <ProfileImage
        src={`https://rb-dev-s3-images.s3.amazonaws.com/product/${sellerImageUrl}`}
        name={`${sellerName} 의 프로필사진`}
        size="md"
      />
      <div>
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
