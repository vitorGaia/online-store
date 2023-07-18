import Image from 'next/image';
import React from 'react';

function ProductCard({ product }) {
  return (
    <div key={ product.id }>
      <h4>{ product.title }</h4>
      <Image
        src={ product.thumbnail }
        alt={ product.title }
        width={150}
        height={150}
      />
      <span>{ product.price }</span>
    </div>
  );
}

export default ProductCard;