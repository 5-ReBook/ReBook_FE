import React, { useState } from 'react';
import MembersLayout from '../../components/Layouts/MembersLayout';
import SlidingSwitch from './components/SlidingSwitch';
import './styles/MyPage.css';
import MyInfo from './components/MyInfo';
import MySecurity from './components/MySecurity';

function MyPage() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <MembersLayout>
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
    </MembersLayout>
  );
}

export default MyPage;
