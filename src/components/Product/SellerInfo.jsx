const SellerInfo = ({
  sellerImageUrl,
  sellerName,
  sellerUniversity,
  status,
}) => {
  return (
    <div className="seller-info">
      <img src={sellerImageUrl} alt={sellerName} />
      <div>
        <h3>{sellerName}</h3>
        <p>{sellerUniversity}</p>
      </div>
      <span className="status">{status}</span>
    </div>
  );
};

export default SellerInfo;
