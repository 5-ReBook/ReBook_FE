import React, { createContext, useContext, useState } from 'react';

const LoginInfoContext = createContext();

export const useLoginInfo = () => useContext(LoginInfoContext);

export const LoginInfoProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState(null);

  return (
    <LoginInfoContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </LoginInfoContext.Provider>
  );
};

export default LoginInfoProvider;
