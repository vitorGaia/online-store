import Link from "next/link";
import { StoreContext } from "../contexts/StoreContext";
import { useContext } from "react";

function Header() {
  const { headerQueryInput, setHeaderQueryInput, requestProducts } = useContext(StoreContext);

  return (
    <div>
      <input type="text" onChange={ (e) => setHeaderQueryInput(e.target.value) } />

      <button onClick={ () => requestProducts(undefined, headerQueryInput) }>Pesquisar</button>

      <Link href='/shoppingCart'>Carrinho de Compras</Link>
    </div>
  );
}

export default Header;