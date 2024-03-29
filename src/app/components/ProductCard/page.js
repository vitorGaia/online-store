'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ product, addProductToCart }) {
  const { id, title, thumbnail, price, shipping } = product !== undefined && product;
  const formatPrice = price && price.toFixed(2).replace('.', ',');

  return (
    <div
      key={id}
      className='overflow-x-hidden flex flex-col justify-center gap-1 w-72 max-h-96 p-3 text-font bg-baseM shadow-md rounded-md relative overflow-auto hover:transform hover:scale-105 transition'
    >

      {shipping && shipping.free_shipping && (
        <div className='diagonal-div bg-yellow-400 absolute top-5 -right-10 h-7 w-36 flex justify-center items-center shadow-lg'>
          <p className='text-sm font-medium lg:font-semibold text-baseM'>Frete Grátis</p>
        </div>
      )}

      <Link href={`/pages/${id}`}>
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={thumbnail}
          className='w-11/12 pl-5 rounded-md'
        />

        <div className='h-6 mt-1 overflow-hidden'>
          <p className='font-medium truncate px-6 text-lg'>
            {title}
          </p>
        </div>
      </Link>

      <p className='text-lg font-semibold text-center'>
        {`R$ ${formatPrice}`}
      </p>

      <button
        onClick={() => addProductToCart(product)}
        className='bg-accent tracking-wide font-bold text-lg w-full h-12 mt-1 py-0.5 leading-4 rounded shadow-md px-1 text-baseM hover:bg-accentHover transition active:bg-accentHover'
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCard;