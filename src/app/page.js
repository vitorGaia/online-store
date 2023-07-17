import Link from "next/link";
import AppLayout from "./AppLayout";
import CategoriesList from "./components/CategoriesList";

export default function Home() {
  return (
    <AppLayout>
      <section>
        <Link href='/shoppingCart'>Carrinho de Compras</Link>

        <CategoriesList />

        <h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>
      </section>
    </AppLayout>
  )
}
