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
    <section className="bg-base flex flex-col w-screen min-h-screen text-gray-300">
      <Header />

      <main className="flex flex-wrap justify-center pt-20 px-2 gap-4">
        <CategoriesList />

        {!homeProducts && (<h3 className="text-center text-2xl font-medium pt-48 text-gray-300 pb-20">Digite algum termo de pesquisa ou escolha uma categoria :)</h3>)}

        {(homeProducts && homeProducts.length === 0) && (<h3 className="text-center text-2xl font-medium pt-48 pb-20 text-gray-300">Nenhum produto foi encontrado ;(</h3>)}

        {(homeProducts && homeProducts.length !== 0) && mapHomeProducts}
      </main>
    </section>
  )
}