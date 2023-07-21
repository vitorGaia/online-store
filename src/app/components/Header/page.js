import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCartAlt, BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import logo from "../../../../public/logo-frontend-online-store.svg";

function Header() {
  const { setHeaderQueryInput, activeSearch, handleActiveSearch, shoppingCart } = useContext(AppContext);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const products = getProductsFromLocalStorage();
    setCountProducts(products.length);
  }, [shoppingCart]);

  return (
    <div
      className="fixed flex top-0 left-0 w-full backdrop-blur-3xl h-14 p-2 px-4 items-center justify-between shadow-sm rounded-sm z-10"
    >
      <div
        className="flex justify-center align-middle gap-3"
      >
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          className={`${activeSearch ? '' : 'hidden'} w-52 bg-gray-800 bg-opacity-20 font-normal text-lg px-2 h-9 placeholder:text-gray-700 rounded-full`}
        />

        <button
          onClick={ () => handleActiveSearch('header') }
        >
          <BiSearchAlt className="text-3xl text-gray-300" />
        </button>
      </div>

      <Link href='/'>
        <Image
          src={ logo }
          alt='Front end online store logo'
          width='auto'
          height='auto'
          className={`${activeSearch ? 'hidden' : ''} w-28`}
        />
      </Link>

      <Link href='/pages/ShoppingCart' className="flex justify-center align-middle">
        <BiCartAlt className="text-3xl text-gray-300" />
        <span className="font-semibold text-xs text-accent">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;