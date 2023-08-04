'use client';
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import Image from "next/image";
import logo from "../../../../public/logo-frontend-online-store.png";
import { HiMagnifyingGlass, HiOutlineShoppingCart, HiBars4 } from "react-icons/hi2";

function Header() {
  const { attLocalStorage, headerQueryInput, setHeaderQueryInput, activeSearch, handleActiveSearch, shoppingCart, activeCategories, setActiveCategories } = useContext(AppContext);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const products = getProductsFromLocalStorage();
    setCountProducts(products.length);
  }, [shoppingCart, attLocalStorage]);

  return (
    <div
      className="fixed flex top-0 left-0 w-full backdrop-blur-3xl h-14 p-2 px-4 items-center justify-between shadow-sm z-10 overflow-hidden 
      lg:h-16 lg:px-32"
    >
      <button
      className="hover:text-accent transition"
      onClick={ () => setActiveCategories(!activeCategories) }
      >
        <HiBars4 className="text-3xl lg:text-4xl" />
      </button>

      <div
        className={
          `${activeSearch ? '' : 'justify-between'}
          flex justify-center itens-center relative w-3/5 h-full`
        }
      >
        <Link href='/' className={`${activeSearch ? 'hidden' : ''} lg:block`}>
          <Image
            src={ logo }
            alt='Front end online store logo'
            width='auto'
            height='auto'
            className={
              `w-36 h-full lg:w-52 lg:h-full object-cover lg:object-center`
            }
          />
        </Link>

        <input
          type="text"
          placeholder="Pesquisa"
          value={ headerQueryInput }
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          onKeyDown={ (e) => e.key === 'Enter' && handleActiveSearch('header')}
          className={
            `${activeSearch ? 'block' : 'hidden'}
            w-52 h-full bg-gray-500 bg-opacity-10 font-normal text-lg px-2 rounded-full overflow-hidden pl-5
            lg:w-full lg:block lg:pl-8 hover:shadow placeholder:text-fontM transition`
          }
        />

        <button
          onClick={ () => handleActiveSearch('header') }
          className={
            `${activeSearch ? '' : ''}
            absolute flex justify-center items-center h-3/4 lg:right-1 right-2 pl-3 top-1 border-l border-font 
            lg:pl-0 lg:h-5/6 lg:w-14 hover:text-accent hover:border-accent transition`
          }
        >
          <HiMagnifyingGlass className="text-2xl lg:text-3xl" />
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