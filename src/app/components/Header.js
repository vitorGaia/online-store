import Link from "next/link";

function Header() {
  return (
    <div>
      <input type="text" />

      <button>Pesquisar</button>

      <Link href='/shoppingCart'>Carrinho de Compras</Link>
    </div>
  );
}

export default Header;