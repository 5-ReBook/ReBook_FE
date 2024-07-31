import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={footerStyle}>
      <button style={buttonStyle}>새 상품 등록</button>
      <button style={buttonStyle}>채팅</button>
      <Link to="/products" style={buttonStyle}>
        홈
      </Link>
      <button style={buttonStyle}>내가 쓴 글</button>
      <Link to="/myinfo" style={buttonStyle}>
        마이페이지
      </Link>
    </footer>
  );
}

const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  padding: "10px 0",
  backgroundColor: "#f1f1f1",
  borderTop: "1px solid #ccc",
};

const buttonStyle = {
  flex: 1,
  textAlign: "center",
  padding: "10px",
  border: "none",
  background: "none",
  fontSize: "16px",
  cursor: "pointer",
  textDecoration: "none",
  color: "black",
};

export default Footer;
