'use client';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import Image from 'next/image';
import { getProductsFromLocalStorage } from '@/services/localStorage';
import FormCheckout from '../components/FormCheckout';
import Header from '../components/Header';

function Checkout(props) {
  const {
    setShoppingCart,
    setAttLocalStorage,
    removeAllProductToCart,
    countProduct,
    countProductPrice,
    uniqueArray,
  } = useContext(AppContext);
  
  useEffect(() => {
    const shoppingCart = getProductsFromLocalStorage();
    setShoppingCart(shoppingCart);
    setAttLocalStorage(false);
  }, [setAttLocalStorage, setShoppingCart]);

  const renderProducts = uniqueArray.map((product) => (
    <div key={product.id}>
      <button onClick={ () => removeAllProductToCart(product.id)}> x </button>
      <Image
        src={ product.thumbnail }
        alt={ product.title }
        width={150}
        height={150}
        priority
      />
      <h3>{product.title}</h3>

      <span>{ countProduct[product.id] }</span>
      
      <h4>{`R$${ countProductPrice[product.id] || product.price }`}</h4>
    </div>
  ));

  return (
    <section>
      <Header />
      <div>
        <h3>Revise seus produtos</h3>
        { renderProducts }
      </div>
      <div>
        <h2>Informações do comprador</h2>
        <FormCheckout />
      </div>
    </section>
  );
}

export default Checkout;