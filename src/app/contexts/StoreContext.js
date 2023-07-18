'use client';
import { getProductsFromCategoryAndQuery } from "@/services/api";
import { createContext, useEffect, useState } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    homeProducts: undefined,
  });
  const [headerQueryInput, setHeaderQueryInput] = useState('');

  const requestProducts = async (categoryId, queryInput) => {
    const products = await getProductsFromCategoryAndQuery(categoryId, queryInput);
    setGlobalState({ ...globalState, homeProducts: products.results });
  };

  const values = {
    globalState,
    setGlobalState,
    headerQueryInput,
    setHeaderQueryInput,
    requestProducts,
  }

  return (
    <StoreContext.Provider value={ values }>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };