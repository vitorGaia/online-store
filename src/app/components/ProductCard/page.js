import { setProductToLocalStorage } from '@/services/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ product }) {
  return (
    <div key={product.id} className='flex-col justify-center align-middle w-2/4 h-64 p-2'>
      <Link href={`/pages/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={150}
          height={150}
          placeholder="blur"
          blurDataURL={product.thumbnail}
          className='w-screen rounded'
        />
        <div className='h-6 mt-1 overflow-hidden'>
          <p className={`${product.shipping.free_shipping && 'text-pink-200'} text-sm font-semibold truncate`}>
            {product.title}
          </p>
        </div>
      </Link>
      <p className='text-sm font-medium'>
        {`Estq. ${product.available_quantity} R$${product.price.toFixed(2)}`}
      </p>
      <button
        onClick={() => setProductToLocalStorage(product)}
        className='bg-accent tracking-wide font-bold text-sm w-full h-10 mt-1 py-0.5 leading-4 rounded px-1'
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCard;