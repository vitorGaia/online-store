'use client';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Image from 'next/image';
import { getProductsFromLocalStorage } from '@/services/localStorage';
import FormCheckout from '../../components/FormCheckout/page';
import Header from '../../components/Header/page';
import { BiXCircle } from "react-icons/bi";
import Link from 'next/link';

function Checkout(props) {
  const {
    setShoppingCart,
    setAttLocalStorage,
    removeAllProductToCart,
    countProduct,
    countProductPrice,
    uniqueArray,
    attLocalStorage,
    countTotalPrice,
  } = useContext(AppContext);
  
  useEffect(() => {
    const shoppingCart = getProductsFromLocalStorage();
    setShoppingCart(shoppingCart);
    setAttLocalStorage(false);
  }, [ attLocalStorage, setAttLocalStorage, setShoppingCart]);

  const renderProducts = uniqueArray.map((product) => (
    <div key={`checkout${product.id}`} className="flex p-2 gap-1 bg-slate-100 shadow-sm z-0 h-28 relative rounded-sm lg:w-5/6 lg:items-center">
      <button onClick={ () => removeAllProductToCart(product.id)} className="absolute top-3 left-3 text-red-400 hover:text-red-600 transition">
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
        <Link href={`/pages/${product.id}`} className='hover:text-accent transition'>
          <h3 className="font-medium text-sm">{product.title}</h3>
        </Link>
        <div className='flex gap-2'>
          <span className='font-normal'>{ `Unid. ${countProduct[product.id]}` }</span>
          
          <h4 className='font-semibold text-accent'>{`R$ ${ (countProductPrice[product.id] || product.price)?.toFixed(2) }`}</h4>
        </div>
      </div>
    </div>
  ));

  return (
    <section
      className='bg-base flex flex-col w-screen text-font min-h-screen'>
      <Header />
      <div className='flex flex-col justify-center pt-16 p-2 gap-32 lg:max-h-screen lg:px-36 lg:pt-28 lg:pb-16 lg:flex-row'>
        <div
          className='flex flex-col gap-4 lg:bg-baseM lg:overflow-auto lg:max-h-full lg:w-2/4 lg:py-8 lg:rounded-md lg:shadow-md lg:items-center'
        >
          <h3 className="text-2xl py-2 font-medium lg:font-semibold">Revise seus produtos</h3>
          { renderProducts }
          <h2 className="p-2 m-2 text-center font-semibold text-2xl">
            { `Valor total. R$${countTotalPrice}` }
          </h2>
        </div>
        <div className='lg:flex'>
          <FormCheckout />
        </div>
      </div>
    </section>
  );
}

export default Checkout;