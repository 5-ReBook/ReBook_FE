import React, { useState, useEffect } from 'react';
import SlidingSwitch from './components/SlidingSwitch';
import MyInfo from './components/MyInfo';
import MySecurity from './components/MySecurity';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';

function MyPage() {
  const [activeTab, setActiveTab] = useState('info');
  const { setLayoutConfig } = useLayout();
  useEffect(() => {
    import('./styles/MyPage.css');
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  return (
    <div className="mypage-outer-container">
      <SlidingSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className="myinfo-container__content"
        style={{ display: activeTab === 'info' ? 'block' : 'none' }}
      >
        <MyInfo />
      </div>
      <div
        className="mysecurity-container__content"
        style={{ display: activeTab === 'security' ? 'block' : 'none' }}
      >
        <MySecurity />
      </div>
    </div>
  );
}

export default MyPage;
