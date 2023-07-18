import { useContext } from "react";
import CategoriesList from "./components/CategoriesList";
import Header from "./components/Header";
import { StoreContext } from "./contexts/StoreContext";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const { globalState } = useContext(StoreContext);
  const { homeProducts } = globalState;

  const mapHomeProducts = homeProducts && homeProducts.map((product) => ProductCard({ product }));

  return (
    <section>
      <Header />

      <CategoriesList />

      {!homeProducts && (<h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>)}

      {(homeProducts && homeProducts.length === 0) && (<h3>Nenhum produto foi encontrado.</h3>)}

      {(homeProducts && homeProducts.length !== 0) && mapHomeProducts}
    </section>
  )
}