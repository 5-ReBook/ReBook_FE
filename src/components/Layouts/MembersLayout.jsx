import React from 'react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

const MembersLayout = ({children}) => {
    const nav = useNavigate();

    return (
      <div className='members-layout'>
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

export default MembersLayout;