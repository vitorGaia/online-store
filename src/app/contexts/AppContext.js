'use client';
import { getProductsFromCategoryAndQuery } from '@/services/api';
import { getAvaliationsFromLocalStorage, removeAllProductFromLocalStorage, removeProductFromLocalStorage, setAvaliationToLocalStorage, setProductToLocalStorage } from '@/services/localStorage';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    homeProducts: undefined,
  });
  const [headerQueryInput, setHeaderQueryInput] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [attLocalStorage, setAttLocalStorage] = useState(false);
  const [avaliations, setAvaliations] = useState(getAvaliationsFromLocalStorage() || []);
  const [avaliation, setAvaliation] = useState({
    avaliationId: avaliations.length + 1,
    productId: '',
    email: '',
    rating: 0,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const route = useRouter();

  const requestProducts = async (categoryId, queryInput) => {
    const products = await getProductsFromCategoryAndQuery(categoryId, queryInput);
    setGlobalState({ ...globalState, homeProducts: products.results });
    setShowFilter(true);
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

  const handleFormAvaliation = (e) => setAvaliation({ ...avaliation, [e.target.name]: e.target.value });

  const addAvaliation = (productId) => {
    setAvaliationToLocalStorage({ ...avaliation, productId});
    setAttLocalStorage(true);
    setAvaliation({
      avaliationId: avaliations.length + 1,
      productId: '',
      email: '',
      rating: 0,
      message: '',
    });
  };

  const handleActiveSearch = (requestType, targetValue) => {
    setLoading(true);
    if (activeSearch && requestType === 'header') {
      if (headerQueryInput === '') {
        setActiveSearch(!activeSearch);
        setLoading(false);
        return;
      }
      if ( route !== '/') route.push('/');
      requestProducts(undefined, headerQueryInput);
      setActiveSearch(false);
      setLoading(false);
      return;
    }
    else if (activeSearch && requestType === 'category') {
      requestProducts( targetValue, undefined);
      setActiveSearch(false);
      setLoading(false);
      return;
    }
    else if (!activeSearch && requestType === 'category') {
      requestProducts( targetValue, undefined);
      setLoading(false);
      return;
    }
    setActiveSearch(!activeSearch);
    setLoading(false);
    return;
  };

  const handleFilters = (selectedValue) => {
    setLoading(true);
    const { homeProducts } = globalState;
    let filteredProducts = [...homeProducts];
  
    if (selectedValue === 'priceDesc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedValue === 'priceAsc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedValue === 'nameDesc') {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedValue === 'nameAsc') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    setGlobalState({ ...globalState, homeProducts: filteredProducts });
    setLoading(false);
  };

  const values = {
    globalState, setGlobalState,
    headerQueryInput, setHeaderQueryInput,
    activeSearch, setActiveSearch,
    requestProducts,
    shoppingCart, setShoppingCart,
    attLocalStorage, setAttLocalStorage,
    addProductToCart,
    removeProductToCart,
    removeAllProductToCart,
    countProduct,
    countProductPrice,
    countTotalPrice,
    uniqueArray,
    handleFormAvaliation,
    avaliation, addAvaliation,
    handleActiveSearch,
    avaliations, setAvaliations,
    loading,
    handleFilters,
    showFilter, setShowFilter,
  };

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };