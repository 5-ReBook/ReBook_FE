import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

function MembersLayout({ children }) {
  const nav = useNavigate();

  return (
    <div className="members-layout">
      <Header
        title="ReBook"
        leftChild={
          <button type="button" onClick={() => nav(-1)}>
            {'<'}
          </button>
        }
      />
      {children}
    </div>
  );
}

export default MembersLayout;
