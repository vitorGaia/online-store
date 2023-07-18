'use client';
import { getProductsFromCategoryAndQuery } from '@/services/api';
import { getAvaliationsFromLocalStorage, removeAllProductFromLocalStorage, removeProductFromLocalStorage, setAvaliationToLocalStorage, setProductToLocalStorage } from '@/services/localStorage';
import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    homeProducts: undefined,
  });
  const [headerQueryInput, setHeaderQueryInput] = useState('');
  const [shoppingCart, setShoppingCart] = useState([]);
  const [attLocalStorage, setAttLocalStorage] = useState(false);
  const [avaliation, setAvaliation] = useState({
    avaliationId: getAvaliationsFromLocalStorage().length + 1,
    productId: '',
    email: '',
    rating: 0,
    message: '',
  });

  const requestProducts = async (categoryId, queryInput) => {
    const products = await getProductsFromCategoryAndQuery(categoryId, queryInput);
    setGlobalState({ ...globalState, homeProducts: products.results });
  };

  const addProductToCart = (product) => {
    setProductToLocalStorage(product);
    setAttLocalStorage(true);
  };

  const removeProductToCart = (productId) => {
    removeProductFromLocalStorage(productId);
    setAttLocalStorage(true);
  };

  const removeAllProductToCart = (productId) => {
    removeAllProductFromLocalStorage(productId);
    setAttLocalStorage(true);
  };

  const countProduct = shoppingCart.reduce((acc, crr) => {
    if (acc[crr.id]) {
      acc[crr.id] += 1;
    } else {
      acc[crr.id] = 1;
    }

    return acc;
  }, {});

  const countProductPrice = shoppingCart.reduce((acc, crr) => {
    if (acc[crr.id]) {
      acc[crr.id] += crr.price;
    } else {
      acc[crr.id] = crr.price;
    }

    return acc;
  }, {});

  const countTotalPrice = Object.values(countProductPrice).reduce((acc, crr) => acc + crr, 0);

  const uniqueArray = shoppingCart.filter((obj, index, self) => {
    return index === self.findIndex((o) => o.id === obj.id);
  });

  const handleForm = (e) => setAvaliation({ ...avaliation, [e.target.name]: e.target.value });

  const addAvaliation = (productId) => {
    setAvaliationToLocalStorage({ ...avaliation, productId});
    setAttLocalStorage(true);
    setAvaliation({
      avaliationId: getAvaliationsFromLocalStorage().length + 1,
      productId: '',
      email: '',
      rating: 0,
      message: '',
    });
  };

  const values = {
    globalState,
    setGlobalState,
    headerQueryInput,
    setHeaderQueryInput,
    requestProducts,
    shoppingCart,
    setShoppingCart,
    attLocalStorage,
    setAttLocalStorage,
    addProductToCart,
    removeProductToCart,
    removeAllProductToCart,
    countProduct,
    countProductPrice,
    countTotalPrice,
    uniqueArray,
    handleForm,
    avaliation,
    addAvaliation,
  };

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };