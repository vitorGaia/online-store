'use client';
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCartAlt, BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import logo from "../../../../public/logo-frontend-online-store.png";
import { HiMagnifyingGlass, HiOutlineShoppingCart, HiBars4 } from "react-icons/hi2";

function Header() {
  const { attLocalStorage, setHeaderQueryInput, activeSearch, handleActiveSearch, shoppingCart } = useContext(AppContext);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const products = getProductsFromLocalStorage();
    setCountProducts(products.length);
  }, [shoppingCart, attLocalStorage]);

  return (
    <div
      className="fixed flex top-0 left-0 w-full backdrop-blur-3xl h-14 p-2 px-4 items-center justify-between shadow-sm z-10 overflow-hidden 
      lg:h-16 lg:px-10"
    >
      <Link href='/' className="">
        {/* <Image
          src={ logo }
          alt='Front end online store logo'
          width='auto'
          height='auto'
          className={
            `w-36 bg-blue-300
            lg:w-48 lg:block`
          } */}
        <HiBars4 className="text-3xl" />
      </Link>

      <div
        className="flex justify-center itens-center gap-3 relative w-2/6"
      >
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          onKeyDown={ (e) => e.key === 'Enter' && handleActiveSearch('header')}
          className={
            `w-52 bg-gray-500 bg-opacity-10 font-normal text-lg px-2 h-9 rounded-full overflow-hidden
            lg:w-full lg:h-12 lg:pl-6 hover:bg-slate-300 placeholder:text-fontM transition`
          }
        />

        <button
          onClick={ () => handleActiveSearch('header') }
          className={
            `absolute flex justify-center items-center right-1 top-1 border-l border-font h-5/6 hover:text-accent transition
            lg:w-14`
          }
        >
          <HiMagnifyingGlass className="text-2xl" />
        </button>
      </div>

      <Link
        href='/pages/ShoppingCart'
        className="flex justify-center itens-center hover:text-accent transition"
      >
        <HiOutlineShoppingCart className="text-3xl" />
        <span className="font-semibold text-xs text-accent lg:font-semibold">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;