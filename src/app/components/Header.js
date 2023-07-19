import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCart, BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import logo from "../../../public/logo-frontend-online-store.svg";

function Header() {
  const { headerQueryInput, setHeaderQueryInput, requestProducts, activeSearch, setActiveSearch, handleActiveSearch } = useContext(AppContext);

  const countProducts = getProductsFromLocalStorage().length;

  return (
    <div className="fixed flex top-0 left-0 w-screen bg-blue-500 p-3.5 justify-between shadow-md">
      <div className="flex justify-center align-middle gap-2">
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={ (e) => setHeaderQueryInput(e.target.value) }
          className={`${activeSearch ? '' : 'hidden'} w-52 bg-transparent border-2 border-green-400 font-normal text-lg px-2 rounded-sm`}
        />

        <button onClick={ handleActiveSearch }>
          <BiSearchAlt2 className="text-2xl font-black text-green-400" />
        </button>
      </div>

      <Image
        src={ logo }
        alt='Front end online store logo'
        width={100}
        height={100}
        className={`${activeSearch ? 'hidden' : ''}`}
      />

      <Link href='/ShoppingCart' className="flex justify-center align-middle">
        <BiCart className="text-2xl font-black text-green-400" />
        <span className="text-green-400">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;