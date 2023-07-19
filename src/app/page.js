'use client';
import { useContext } from "react";
import CategoriesList from "./components/CategoriesList";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { AppContext } from "./contexts/AppContext";

export default function Home() {
  const { globalState } = useContext(AppContext);
  const { homeProducts } = globalState;

  const mapHomeProducts = homeProducts && homeProducts.map((product) => ProductCard({ product }));

  return (
    <section className="bg-gray-900 w-screen min-h-screen text-slate-100">
      <Header />

      <main className="flex flex-wrap items-center justify-center pt-14">
        <CategoriesList />

        {!homeProducts && (<h3 className="text-center">Digite algum termo de pesquisa ou escolha uma categoria.</h3>)}

        {(homeProducts && homeProducts.length === 0) && (<h3 className="text-center">Nenhum produto foi encontrado.</h3>)}

        {(homeProducts && homeProducts.length !== 0) && mapHomeProducts}
      </main>
    </section>
  )
}