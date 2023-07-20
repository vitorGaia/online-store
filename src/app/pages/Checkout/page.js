'use client';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Image from 'next/image';
import { getProductsFromLocalStorage } from '@/services/localStorage';
import FormCheckout from '../../components/FormCheckout/page';
import Header from '../../components/Header/page';
import { BiXCircle } from "react-icons/bi";

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
    <div key={`checkout${product.id}`} className="flex p-2 gap-1 bg-gray-700 bg-opacity-20 z-0 h-28 relative rounded-sm">
      <button onClick={ () => removeAllProductToCart(product.id)} className="absolute top-3 left-3 text-red-400">
        <BiXCircle />
      </button>
      <Image
        src={ product.thumbnail }
        alt={ product.title }
        width={150}
        height={150}
        className="rounded-sm w-24 h-24 mr-2"
      />
      <div className='flex flex-col gap-2'>
        <h3 className="font-medium text-sm">{product.title}</h3>
        <div className='flex gap-2'>
          <span>{ `Unid. ${countProduct[product.id]}` }</span>
          
          <h4 className='font-semibold text-accent'>{`R$ ${ (countProductPrice[product.id] || product.price)?.toFixed(2) }`}</h4>
        </div>
      </div>
    </div>
  ));

  return (
    <section className='bg-base flex flex-col w-screen text-gray-300 min-h-screen'>
      <Header />
      <div className='flex flex-wrap justify-center pt-16 p-2 min-h-full gap-3'>
        <h3 className="text-2xl py-2 font-medium">Revise seus produtos</h3>
        { renderProducts }
        <h2 className="text-xl py-4 font-semibold">Informações do comprador</h2>
      </div>
      <FormCheckout />
    </section>
  );
}

export default Checkout;