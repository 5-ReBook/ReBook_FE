import React, { createContext, useContext, useEffect, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const defaultLayoutConfig = {
  header: true,
  leftButton: 'menu', // "menu" | "goBack" | "none"
  footerNav: true,
};

export const LayoutProvider = ({ children }) => {
  const [layoutConfig, setLayoutConfig] = useState(defaultLayoutConfig);

  return (
    <LayoutContext.Provider value={{ layoutConfig, setLayoutConfig }}>
      {children}
    </LayoutContext.Provider>
  );
};