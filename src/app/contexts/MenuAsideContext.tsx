"use client";

import React, { createContext, useState, ReactNode } from "react";

interface MenuAsideContextType {
  viewMenuAside: boolean;
  setViewMenuAside: (viewMenu: boolean) => void;
}

const MenuAsideContext = createContext<MenuAsideContextType | undefined>(
  undefined
);

const MenuAsideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMenuAside, setViewMenuAside] = useState<boolean>(false);

  const value = {
    viewMenuAside,
    setViewMenuAside,
  };

  return (
    <MenuAsideContext.Provider value={value}>
      {children}
    </MenuAsideContext.Provider>
  );
};

const useMenuAside = () => {
  const context = React.useContext(MenuAsideContext);
  if (!context) {
    throw new Error("useMenuAside must be used within a MenuAsideProvider");
  }
  return context;
};

export { MenuAsideProvider, useMenuAside };
