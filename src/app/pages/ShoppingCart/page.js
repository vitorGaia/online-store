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
      className="flex p-2 gap-1 z-0 relative rounded-sm lg:w-5/6 bg-slate-100 shadow-sm items-center"
      key={`shoppingCart${product.id}`}
    >
      <button onClick={ () => removeAllProductToCart(product.id)} className="absolute top-3 left-3 text-red-400 hover:text-red-600 transition">
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
        <Link href={`/pages/${product.id}`} className="hover:text-accent transition">
          <h3 className="font-medium text-sm">{product.title}</h3>
        </Link>
        <span className='font-normal text-sm hidden lg:block'>
          {`Quantidade em estoque. ${product.available_quantity}`}
        </span>
        <h4
          className="font-semibold"
        >
          {`R$${ (countProductPrice[product.id] || product.price)?.toFixed(2) }`}
        </h4>
      </div>
      <div className="flex justify-center items-center gap-1">
        <button className="hover:text-accent transition" onClick={ () => removeProductToCart(product.id) }>
          <BiMinusCircle />
        </button>
        <span>{ countProduct[product.id] }</span>
        <button className="hover:text-accent transition" onClick={ () => addProductToCart(product) }>
          <BiPlusCircle />
        </button>
      </div>
    </div>
  ));

  return (
    <section className="bg-base overflow-x-hidden max-w-screen max-h-screen text-font">
      <Header />
      <main
        className="flex flex-col justify-center pt-20 pb-8 gap-10 p-2 lg:max-h-screen lg:px-36 lg:pt-28 lg:pb-16 lg:flex-row min-h-screen"
      >
        <div className="flex flex-col gap-4 items-center lg:bg-baseM lg:overflow-auto lg:max-h-full lg:w-2/4 lg:py-8 lg:rounded-md lg:shadow-md">
          <h2 className="text-2xl pb-2 font-semibold">Carrinho de Compras</h2>
          {shoppingCart.length === 0 && (<h3>Seu carrinho está vazio</h3>)}
          {shoppingCart.length !== 0 && renderProducts}
        </div>
        <div className="flex flex-col lg:w-2/4 lg:items-center lg:justify-center lg:gap-6">
          <h2 className="p-2 m-2 text-center font-semibold text-2xl">
            { `Valor total. R$${countTotalPrice.toFixed(2)}` }
          </h2>
          <Link
            href='/pages/Checkout'
            className="bg-accent text-center text-base font-semibold text-lg p-2 rounded-md shadow-md w-full lg:w-80 hover:bg-accentHover transition"
          >
            Finalizar Compra
          </Link>
        </div>
      </main>
    </section>
  );
}