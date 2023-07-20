'use client';
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiXCircle, BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import Header from "@/app/components/Header/page";

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
    <div
      className="flex py-2 gap-1"
      key={`shoppingCart${product.id}`}
    >
      <button onClick={ () => removeAllProductToCart(product.id)}>
        <BiXCircle />
      </button>
      <Image
        src={ product.thumbnail }
        alt={ product.title }
        width={150}
        height={150}
        className="rounded-sm w-24 h-24"
      />
      <div>
        <h3 className="font-medium text-sm">{product.title}</h3>
        <h4
          className="font-semibold"
        >
          {`R$${ (countProductPrice[product.id] || product.price)?.toFixed(2) }`}
        </h4>
      </div>
      <div className="flex justify-center items-center gap-1">
        <button onClick={ () => removeProductToCart(product.id) }>
          <BiMinusCircle />
        </button>
        <span>{ countProduct[product.id] }</span>
        <button onClick={ () => addProductToCart(product) }>
          <BiPlusCircle />
        </button>
      </div>
    </div>
  ));

  return (
    <section className="bg-base w-screen min-h-screen text-fontM">
      <Header />
      <main className="flex flex-wrap justify-center pt-16 gap-1 p-2">
        <h2 className="text-2xl font-semibold text-accentM">Carrinho de Compras</h2>
        {shoppingCart.length === 0 && (<h3>Seu carrinho está vazio</h3>)}
        {shoppingCart.length !== 0 && renderProducts}
        <h2 className="p-2 m-2 text-accent text-center font-semibold text-2xl">
          { `Valor total. R$${countTotalPrice.toFixed(2)}` }
        </h2>
        <Link
          href='/pages/Checkout'
          className="bg-accent text-fontM text-center font-semibold text-lg p-2 rounded-md shadow-sm w-full"
        >
          Finalizar Compra
        </Link>
      </main>
    </section>
  );
}