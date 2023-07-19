import { setProductToLocalStorage } from '@/services/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ product }) {
  return (
    <div key={ product.id } className='flex-col gap-1 w-2/4 h-64 p-3 border-solid border-red-500'>
      <Link href={`/pages/${ product.id }`}>
        <Image
          src={ product.thumbnail }
          alt={ product.title }
          width={150}
          height={150}
          placeholder="blur"
          blurDataURL={ product.thumbnail }
          className='w-screen'
          />
      </Link>
      <p className={`${ product.shipping.free_shipping && 'text-green-400' } text-xs`}>
        { `${product.title.slice(0, 45)}...` }
      </p>
      <p className='text-tx text-justify'>
        {`Estq. ${product.available_quantity} R$${product.price}`}
      </p>
      <button
        onClick={ () => setProductToLocalStorage(product) }
        className='bg-blue-500 hover:bg-blue-700 font-bold'
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCard;