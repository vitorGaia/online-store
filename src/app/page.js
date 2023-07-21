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
        className={`${!homeProducts && 'lg:grid-cols-1'} flex flex-col justify-center items-center pt-20 pb-2 px-2 gap-6 lg:gap-16 lg:pl-96 lg:grid lg:grid-cols-3 lg:pt-36 lg:ml-10 lg:pr-24`}
      >
        {loading && (<Loading/>)}

        <CategoriesList />

        {(!homeProducts && !loading)
        && (<div className='flex flex-col items-center lg:py-40 lg:gap-6'>
          <p className='hidden lg:flex text-4xl text-accent font-semibold text-center tracking-wide'>VOCÊ AINDA NÃO<br/> REALIZOU UMA BUSCA</p>
          <h3 className="text-center py-60 text-2xl font-medium text-gray-300 lg:py-0">Digite algum termo de pesquisa<br/> ou escolha uma categoria :)</h3>
        </div>)}

        {(homeProducts && homeProducts.length === 0 && !loading)
        && (<h3 className="text-center text-2xl font-medium py-60 text-gray-300">Nenhum produto foi encontrado ;(</h3>)}

        {(homeProducts && homeProducts.length !== 0 && !loading) && mapHomeProducts}
      </main>
    </section>
  )
}