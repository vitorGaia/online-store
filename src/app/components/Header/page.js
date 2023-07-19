import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCart, BiSearchAlt2 } from "react-icons/bi";
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
    <div className="fixed flex top-0 left-0 w-screen bg-accent p-3.5 justify-between shadow-md">
      <div className="flex justify-center align-middle gap-2">
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          className={`${activeSearch ? '' : 'hidden'} w-52 bg-transparent border-2 border-accentM font-normal text-lg px-2 rounded-sm`}
        />

        <button onClick={ () => handleActiveSearch('header') }>
          <BiSearchAlt2 className="text-2xl font-black text-accentM" />
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
        <BiCart className="text-2xl font-black text-accentM" />
        <span className="text-accentM">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;