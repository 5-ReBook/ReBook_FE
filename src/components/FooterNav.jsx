import React from 'react';
import './FooterNav.css';
import { useNavigate } from 'react-router-dom';
import registericon from '../assets/images/product_registration.png';
import mylisticon from '../assets/images/my_product_list.png';
import homeicon from '../assets/images/home.png';
import mychatlisticon from '../assets/images/chat_list.png';
import mypageicon from '../assets/images/my_profile.png';
import { useLayout } from './Layouts/provider/LayoutProvider';

function FooterNav() {
  const { layoutConfig } = useLayout();
  const navigate = useNavigate();

  if (!layoutConfig.footerNav) {
    return null;
  }

  return (
    <div className="footer-nav-container">
      <div className="footer-button-container">
        <button
          type="button"
          className="footer-button"
          onClick={() => navigate('/products/new')}
        >
          <img src={registericon} alt="New Post" />
        </button>
        <span className="footer-button-label">새 글 작성</span>
      </div>
      <div className="footer-button-container">
        <button
          type="button"
          className="footer-button"
          onClick={() => navigate('/products/me')}
        >
          <img src={mylisticon} alt="My Posts" />
        </button>
        <span className="footer-button-label">내 글 목록</span>
      </div>
      <div className="footer-button-container">
        <button
          type="button"
          className="footer-button"
          onClick={() => navigate('/')}
        >
          <img src={homeicon} alt="Home" />
        </button>
        <span className="footer-button-label">홈</span>
      </div>
      <div className="footer-button-container">
        <button
          type="button"
          className="footer-button"
          onClick={() => navigate('/chat/roomlist')}
        >
          <img src={mychatlisticon} alt="Chat List" />
        </button>
        <span className="footer-button-label">내 채팅 목록</span>
      </div>
      <div className="footer-button-container">
        <button
          type="button"
          className="footer-button"
          onClick={() => navigate('/mypage')}
        >
          <img src={mypageicon} alt="My Page" />
        </button>
        <span className="footer-button-label">마이페이지</span>
      </div>
    </div>
  );
}

export default FooterNav;
