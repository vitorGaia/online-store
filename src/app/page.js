'use client';
import './globals.css';
import { useContext, useEffect, useState } from "react";
import ProductCard from "./components/ProductCard/page";
import { AppContext } from "./contexts/AppContext";
import CategoriesList from './components/CategoriesList/page';
import Header from './components/Header/page';
import Loading from './components/Loading/page';

export default function Home() {
  const { globalState, loading, activeSearch, handleFilters, showFilter, setShowFilter } = useContext(AppContext);
  const { homeProducts } = globalState;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowFilter(true);
      } else {
        setShowFilter(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, [setShowFilter]);

  const mapHomeProducts = homeProducts && homeProducts.map((product) => ProductCard({ product }));

  const filters = (
    <select
      className='fixed top-20 right-32 h-8 w-64 text-lg font-medium bg-slate-200 pl-4 hidden lg:block hover:bg-slate-300 transition rounded-sm'
      onChange={ (e) => handleFilters(e.target.value) }
    >
      <option>Selecione um filtro</option>
      <option value='priceDesc'>Filtrar por preço ↑</option>
      <option value='priceAsc'>Filtrar por preço ↓</option>
      <option value='nameDesc'>Filtrar por nome ↑</option>
      <option value='nameAsc'>Filtrar por nome ↓</option>
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
        ${(homeProducts && !activeSearch) && 'lg:grid-cols-4 lg:pt-32 lg:px-28'} 
        ${(activeSearch && homeProducts) && 'lg:grid-cols-3 lg:pl-96 lg:pt-32'} 
        ${(!homeProducts && activeSearch) && 'lg:pl-80'} 
        flex flex-col justify-center items-center pt-20 pb-2 px-2 gap-6 lg:gap-10 lg:grid lg:pt-16 lg:min-h-screen`}
      >
        {loading && (<Loading/>)}

        <CategoriesList />

        {showFilter && filters}

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