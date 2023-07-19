'use client';
import './globals.css';
import { useContext } from "react";
import ProductCard from "./components/ProductCard/page";
import { AppContext } from "./contexts/AppContext";
import CategoriesList from './components/CategoriesList/page';
import Header from './components/Header/page';

export default function Home() {
  const { globalState } = useContext(AppContext);
  const { homeProducts } = globalState;

  const mapHomeProducts = homeProducts && homeProducts.map((product) => ProductCard({ product }));

  return (
    <section className="bg-base w-screen min-h-screen text-fontM">
      <Header />

      <main className="flex flex-wrap align-middle justify-center pt-16 px-1">
        <CategoriesList />

        {!homeProducts && (<h3 className="text-center pt-6">Digite algum termo de pesquisa ou escolha uma categoria.</h3>)}

        {(homeProducts && homeProducts.length === 0) && (<h3 className="text-center pt-6">Nenhum produto foi encontrado.</h3>)}

        {(homeProducts && homeProducts.length !== 0) && mapHomeProducts}
      </main>
    </section>
  )
}