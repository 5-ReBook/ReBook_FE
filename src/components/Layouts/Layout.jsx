import React, { useState } from 'react';
import Header from '../Header';
import FooterNav from '../FooterNav';
import Sidebar from '../SideBar';
import './Layout.css';
import { useLayout } from './provider/LayoutProvider';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const nav = useNavigate();
  const { layoutConfig } = useLayout();

  const buttonActions = {
    menu: () => setSidebarOpen(!isSidebarOpen),
    goBack: () => nav(-1),
    none: null,
  };

  return (
    <div className="container">
      <Header
        buttonAction={
          layoutConfig.leftButton && buttonActions[layoutConfig.leftButton]
        }
      />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => buttonActions.menu}
      />
      <div className="content">{children}</div>
      <FooterNav />
    </div>
  );
};

export default Layout;
