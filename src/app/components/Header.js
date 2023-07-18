import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";
import { BiCart, BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import logo from "../../../public/logo-frontend-online-store.svg";

function Header() {
  const { headerQueryInput, setHeaderQueryInput, requestProducts } = useContext(AppContext);

  const countProducts = getProductsFromLocalStorage().length;

  return (
    <div className="fixed flex top-0 left-0 w-screen bg-blue-500 p-3.5 justify-between shadow-md">
      <input
        type="text"
        placeholder="Pesquisa"
        onChange={ (e) => setHeaderQueryInput(e.target.value) }
        className="w-40 hidden"
      />

      <button onClick={ () => requestProducts(undefined, headerQueryInput) }>
        <BiSearchAlt2 className="text-2xl font-black text-green-500" />
      </button>

      <Image
        src={ logo }
        alt='Front end online store logo'
        width={100}
        height={100}
        priority
      />

      <Link href='/ShoppingCart' className="flex justify-center items-center">
        <BiCart className="text-2xl font-black text-green-500" />
        <span className="text-green-500">{countProducts}</span>
      </Link>
    </div>
  );
}

export default Header;