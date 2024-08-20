import React from 'react';
import './FooterNav.css';
import { useLayout } from './Layouts/provider/LayoutProvider';
import { layout } from '@chakra-ui/react';

const FooterNav = () => {
  const { layoutConfig } = useLayout();

  if (!layoutConfig.footerNav) {
    return null;
  }
  
  return <div className="footer-nav-container">FOOTER NAV</div>;
};

export default FooterNav;
