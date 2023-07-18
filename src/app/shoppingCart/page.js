'use client';
import { getProductsFromLocalStorage, removeAllProductFromLocalStorage, removeProductFromLocalStorage, setProductToLocalStorage } from "@/services/localStorage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [attLocalStorage, setAttLocalStorage] = useState(false);

  useEffect(() => {
    const shoppingCart = getProductsFromLocalStorage();
    setShoppingCart(shoppingCart);
    setAttLocalStorage(false);
  }, [attLocalStorage]);

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
      <button onClick={ () => removeProductToCart(product.id) }> - </button>
      <span>{ countProduct[product.id] }</span>
      <button onClick={ () => addProductToCart(product) }> + </button>
      <h4>{`R$${ countProductPrice[product.id] || product.price }`}</h4>
    </div>
  ));

  return (
    <section>
      <h2>Carrinho de Compras</h2>
      {shoppingCart.length === 0 && (<h3>Seu carrinho está vazio</h3>)}
      {shoppingCart.length !== 0 && renderProducts}
      <h2>{ `Total - R$${countTotalPrice}` }</h2>
    </section>
  );
}