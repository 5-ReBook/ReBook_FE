import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

/*
    회원 정보 업데이트를 위한 context
    nickname : String
    university : String
    majors : String[]
*/

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [majors, setMajors] = useState([]);

  return (
    <UpdateContext.Provider
      value={{
        nickname,
        setNickname,
        university,
        setUniversity,
        majors,
        setMajors,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};

UpdateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
