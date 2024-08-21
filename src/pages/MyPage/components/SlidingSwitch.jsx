import React from 'react';
import './SlidingSwitch.css';

function SlidingSwitch({ activeTab, setActiveTab }) {
  return (
    <div className="sliding-switch">
      <div
        className={`slider ${activeTab === 'security' ? 'slide-right' : 'slide-left'}`}
      />
      <button
        type="button"
        className={activeTab === 'info' ? 'active' : ''}
        onClick={() => setActiveTab('info')}
      >
        <img
          className="info-icon"
          src="src/assets/images/Members/info.png"
          alt="내 정보"
        />
      </button>
      <button
        type="button"
        className={activeTab === 'security' ? 'active' : ''}
        onClick={() => setActiveTab('security')}
      >
        <img
          className="security-icon"
          src="src/assets/images/Members/shield.png"
          alt="보안"
        />
      </button>
    </div>
  );
}

export default SlidingSwitch;
