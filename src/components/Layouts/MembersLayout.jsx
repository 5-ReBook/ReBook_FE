import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './MembersLayout.css';

function MembersLayout({ children }) {
  const nav = useNavigate();

  return (
    <div className="members-layout">
      <Header
        title="ReBook"
        leftChild={
          <button type="button" onClick={() => nav(-1)}>
            <img src="src/assets/images/left-chevron.png" alt="버튼" />
          </button>
        }
      />
      {children}
    </div>
  );
}

export default MembersLayout;
