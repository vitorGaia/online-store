import { AppContext } from '@/app/contexts/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

function ProductCard({ product }) {
  const { addProductToCart } = useContext(AppContext);
  return (
    <div key={product.id} className='flex flex-col justify-center gap-1 w-72 max-h-96 p-3 text-gray-300 bg-gray-700 bg-opacity-20 rounded-md'>
      <Link href={`/pages/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={product.thumbnail}
          className='w-11/12 pl-5 rounded-md'
        />
        <div className='h-6 mt-1 overflow-hidden'>
          <p className={`${product.shipping.free_shipping && 'text-green-200'} text-sm font-medium truncate px-6`}>
            {product.title}
          </p>
        </div>
      </Link>
      <p className='text-lg font-semibold text-center'>
        {`R$ ${product.price.toFixed(2)}`}
      </p>
      <button
        onClick={() => addProductToCart(product)}
        className='bg-accent tracking-wide font-bold text-sm text-base w-full h-10 mt-1 py-0.5 leading-4 rounded shadow-md px-1'
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCard;