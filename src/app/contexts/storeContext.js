'use client';
import { createContext, useState } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    cartItens: [],
    user: null,
  });

  const values = {
    globalState,
    setGlobalState,
  }

  return (
    <StoreContext.Provider value={ values }>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };