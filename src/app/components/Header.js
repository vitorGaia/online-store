import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getProductsFromLocalStorage } from "@/services/localStorage";

function Header() {
  const { headerQueryInput, setHeaderQueryInput, requestProducts } = useContext(AppContext);

  const countProducts = getProductsFromLocalStorage().length;

  return (
    <div>
      <input type="text" placeholder="Pesquisa" onChange={ (e) => setHeaderQueryInput(e.target.value) } />

      <button onClick={ () => requestProducts(undefined, headerQueryInput) }>Pesquisar</button>

      <Link href='/ShoppingCart'>{ `Carrinho de compras - ${countProducts}` }</Link>
    </div>
  );
}

export default Header;