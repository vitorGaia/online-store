'use client';
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";

export default function ShoppingCart() {
  const {
    shoppingCart,
    setShoppingCart,
    attLocalStorage,
    setAttLocalStorage,
    addProductToCart,
    removeProductToCart,
    removeAllProductToCart,
    countProduct,
    countProductPrice,
    countTotalPrice,
    uniqueArray,
  } = useContext(AppContext);

  useEffect(() => {
    const shoppingCart = getProductsFromLocalStorage();
    setShoppingCart(shoppingCart);
    setAttLocalStorage(false);
  }, [attLocalStorage, setAttLocalStorage, setShoppingCart]);

  const renderProducts = uniqueArray.map((product) => (
    <div key={`shoppingCart${product.id}`}>
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
      <Link href='/pages/Checkout'>Finalizar Compra</Link>
    </section>
  );
}