'use client';
import './globals.css';
import { useContext } from "react";
import ProductCard from "./components/ProductCard/page";
import { AppContext } from "./contexts/AppContext";
import CategoriesList from './components/CategoriesList/page';
import Header from './components/Header/page';
import Loading from './components/Loading/page';

export default function Home() {
  const { globalState, loading, activeSearch } = useContext(AppContext);
  const { homeProducts } = globalState;

  const mapHomeProducts = homeProducts && homeProducts.map((product) => ProductCard({ product }));

  const filters = (
    <select>
      <option></option>
      <option></option>
      <option></option>
      <option></option>
      <option></option>
      <option></option>
    </select>
  );

  return (
    <section
      className="bg-base flex flex-col min-w-screen min-h-screen text-font"
    >
      <Header />

      <main
        className={`
        ${(!homeProducts && !activeSearch) && 'lg:grid-cols-1' } 
        ${(homeProducts && !activeSearch) && 'lg:grid-cols-4 lg:pt-24 lg:px-28'} 
        ${(activeSearch && homeProducts) && 'lg:grid-cols-3 lg:pl-96 lg:pt-24'} 
        ${(!homeProducts && activeSearch) && 'lg:pl-80'} 
        flex flex-col justify-center items-center pt-20 pb-2 px-2 gap-6 lg:gap-10 lg:grid lg:pt-16 lg:min-h-screen`}
      >
        {loading && (<Loading/>)}

        <CategoriesList />

        {(!homeProducts && !loading)
        && (<div className='flex flex-col items-center lg:py-40 lg:gap-6'>
          <p className='hidden lg:flex text-4xl text-accent font-semibold text-center tracking-wide'>
            VOCÊ AINDA NÃO<br/> REALIZOU UMA BUSCA
          </p>
          <h3 className="text-center py-56 text-2xl font-medium text-fontM lg:py-0">
            Digite algum termo de pesquisa<br/> ou escolha uma categoria :)
          </h3>
        </div>)}

        {(homeProducts && homeProducts.length === 0 && !loading)
        && (<h3 className="text-center text-2xl font-medium py-56 text-fontM">Nenhum produto foi encontrado ;(</h3>)}

        {(homeProducts && homeProducts.length !== 0 && !loading) && mapHomeProducts}
      </main>
    </section>
  )
}