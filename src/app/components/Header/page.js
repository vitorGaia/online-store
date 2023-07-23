import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCartAlt, BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import logo from "../../../../public/logo-frontend-online-store.png";

function Header() {
  const { attLocalStorage, setHeaderQueryInput, activeSearch, handleActiveSearch, shoppingCart } = useContext(AppContext);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const products = getProductsFromLocalStorage();
    setCountProducts(products.length);
  }, [shoppingCart, attLocalStorage]);

  return (
    <div
      className="fixed flex top-0 left-0 w-full backdrop-blur-3xl h-14 p-2 px-4 items-center justify-between shadow-sm z-10 lg:backdrop-blur-3xl lg:h-16 lg:px-10 overflow-hidden"
    >
      <div
        className="flex justify-center itens-center gap-3 relative"
      >
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          className={`${activeSearch ? 'block' : 'hidden'} w-52 bg-gray-500 bg-opacity-10 font-normal text-lg px-2 h-9 placeholder:text-fontM rounded-full lg:w-60 lg:px-4 hover:bg-slate-300 transition`}
        />

        <button
          onClick={ () => handleActiveSearch('header') }
          className={`${activeSearch ? 'absolute' : 'block'} right-2 top-1 hover:text-accent transition`}
        >
          <BiSearchAlt className="text-3xl" />
        </button>
      </div>

      <Link href='/'>
        <Image
          src={ logo }
          alt='Front end online store logo'
          width='auto'
          height='auto'
          className={`${activeSearch ? 'hidden' : ''} w-36 lg:w-48 lg:block`}
        />
      </Link>

      <Link
        href='/pages/ShoppingCart'
        className="flex justify-center itens-center hover:text-accent transition"
      >
        <BiCartAlt className="text-3xl" />
        <span className="font-semibold text-xs text-fontM lg:font-bold lg:text-sm">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;