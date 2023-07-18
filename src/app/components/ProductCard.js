import { setProductToLocalStorage } from '@/services/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ product }) {
  return (
    <div key={ product.id }>
      <h4>{ product.title }</h4>
      <Link href={`/${ product.id }`}>
        <Image
          src={ product.thumbnail }
          alt={ product.title }
          width={150}
          height={150}
        />
      </Link>
      <span>{`Frete Grátis - ${product.shipping && product.shipping.free_shipping}`}</span>
      <span>{`Estoque - ${product.available_quantity}`}</span>
      <br/>
      <span>{ `R$${product.price}` }</span>
      <br/>
      <button onClick={ () => setProductToLocalStorage(product) }>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductCard;