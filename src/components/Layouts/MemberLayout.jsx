import React from 'react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

const MemberLayout = ({children}) => {
    const nav = useNavigate();

    return (
      <div>
        <Header
          title={'ReBook'}
          leftChild={
            <button onClick={() => nav(-1)}>{'<'}</button>
          }
        />
        {children}
      </div>
    );
};

export default MemberLayout;