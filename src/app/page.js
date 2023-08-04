'use client';
import './globals.css';
import { useContext, useEffect } from "react";
import ProductCard from "./components/ProductCard/page";
import { AppContext } from "./contexts/AppContext";
import CategoriesList from './components/CategoriesList/page';
import Header from './components/Header/page';
import Loading from './components/Loading/page';

export default function Home() {
  const { globalState, loading, activeSearch, handleFilters, showFilter, setShowFilter, addProductToCart, activeCategories } = useContext(AppContext);
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

  const mapHomeProducts = homeProducts && homeProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      addProductToCart={addProductToCart}
    />
  ));

  const filters = (
    <select
      className={
        `${!homeProducts || homeProducts.length === 0 ? 'lg:hidden hidden' : 'lg:block block'}
        ${activeCategories && 'hidden'}
        fixed top-20 right-6 h-10 font-medium bg-gray-500 bg-opacity-10 pl-4 rounded-sm
        lg:top-20 lg:right-32 lg:h-8 lg:w-64 text-lg hover:shadow transition`
      }
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

      {loading === true ? (<Loading/>) : (
        <main
          className={`
          ${(!homeProducts && !activeSearch) && 'lg:grid-cols-1' } 
          ${(homeProducts && !activeCategories) && 'lg:grid-cols-4 lg:pt-32 lg:px-32 pt-36'} 
          ${(homeProducts && activeCategories) && 'lg:grid-cols-3 lg:pl-96 lg:pt-32 lg:pr-20 lg:mr-2'} 
          ${(!homeProducts && activeSearch) && 'lg:pl-80'} 
          flex flex-col justify-center items-center pt-16 pb-2 px-2 gap-6 lg:gap-10 lg:grid lg:pt-16 lg:min-h-screen lg:pb-10`}
        >

          <CategoriesList />

          {showFilter && filters}

          {(!homeProducts && !loading)
          && (
            <div className='flex flex-col gap-4 items-center pt-32 lg:py-40 lg:gap-6'>
              <p className='text-3xl lg:flex lg:text-4xl text-accent font-semibold text-center tracking-wide'>
                VOCÊ AINDA NÃO<br/> REALIZOU UMA BUSCA
              </p>

              <h3 className="text-center py-0 text-xl lg:text-2xl font-medium text-fontM">
                Digite algum termo de pesquisa<br/> ou escolha uma categoria :)
              </h3>
            </div>
          )}

          {(homeProducts && homeProducts.length === 0 && !loading)
          && (<h3 className="text-center text-2xl font-medium py-56 text-fontM">Nenhum produto foi encontrado ;(</h3>)}

          {(homeProducts && homeProducts.length !== 0 && !loading) && mapHomeProducts}
        </main>
      )}
    </section>
  )
}