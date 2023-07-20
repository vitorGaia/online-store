import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCart, BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import logo from "../../../../public/logo-frontend-online-store.svg";

function Header() {
  const { setHeaderQueryInput, activeSearch, handleActiveSearch } = useContext(AppContext);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const products = getProductsFromLocalStorage();
    setCountProducts(products.length);
  }, []);

  return (
    <div
      className="fixed flex top-0 left-0 w-full bg-accent h-14 p-2 px-5 items-center justify-between shadow-sm rounded-md"
    >
      <div className="flex justify-center align-middle gap-2">
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          className={`${activeSearch ? '' : 'hidden'} w-52 bg-transparent border-2 border-accentM font-normal text-lg px-2 rounded-2xl h-9`}
        />

        <button onClick={ () => handleActiveSearch('header') }>
          <BiSearchAlt className="text-3xl font-black text-accentM" />
        </button>
      </div>

      <Image
        src={ logo }
        alt='Front end online store logo'
        width='auto'
        height='auto'
        className={`${activeSearch ? 'hidden' : ''} w-28`}
      />

      <Link href='/pages/ShoppingCart' className="flex justify-center align-middle">
        <BiCart className="text-3xl font-bold text-accentM" />
        <span className="text-accentM font-medium text-xs">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;