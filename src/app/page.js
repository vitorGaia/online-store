'use client';
import './globals.css';
import { useContext } from "react";
import ProductCard from "./components/ProductCard/page";
import { AppContext } from "./contexts/AppContext";
import CategoriesList from './components/CategoriesList/page';
import Header from './components/Header/page';
import Loading from './components/Loading/page';

export default function Home() {
  const { globalState, loading } = useContext(AppContext);
  const { homeProducts } = globalState;

  const mapHomeProducts = homeProducts && homeProducts.map((product) => ProductCard({ product }));

  return (
    <section
      className="bg-base flex flex-col min-w-screen min-h-screen text-gray-300"
    >
      <Header />

      <main
        className="flex flex-col justify-center items-center pt-16 pb-2 px-2 lg:pt-20 lg:pl-80"
      >
        {loading && (<Loading/>)}

        <CategoriesList />

        {(!homeProducts && !loading) && (<h3 className="text-center py-60 text-2xl font-medium text-gray-300">Digite algum termo de pesquisa ou escolha uma categoria :)</h3>)}

        {(homeProducts && homeProducts.length === 0 && !loading) && (<h3 className="text-center text-2xl font-medium py-60 text-gray-300">Nenhum produto foi encontrado ;(</h3>)}

        {(homeProducts && homeProducts.length !== 0 && !loading) && mapHomeProducts}
      </main>
    </section>
  )
}