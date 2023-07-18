import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function Header() {
  const { headerQueryInput, setHeaderQueryInput, requestProducts } = useContext(AppContext);

  return (
    <div>
      <input type="text" placeholder="Pesquisa" onChange={ (e) => setHeaderQueryInput(e.target.value) } />

      <button onClick={ () => requestProducts(undefined, headerQueryInput) }>Pesquisar</button>

      <Link href='/ShoppingCart'>Carrinho de Compras</Link>
    </div>
  );
}

export default Header;