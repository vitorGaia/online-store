'use client';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/page';
import { getProductById } from '@/services/api';
import Image from 'next/image';
import { getProductsFromLocalStorage } from '@/services/localStorage';
import { AppContext } from '../../contexts/AppContext';
import FormProductAvaliation from '../../components/FormProductAvaliation/page';
import CategoriesList from '@/app/components/CategoriesList/page';
import { BiCartAlt, BiMinus, BiPlus } from "react-icons/bi";
import Link from 'next/link';

function ProductDetails() {
  const {
    setShoppingCart,
    attLocalStorage,
    setAttLocalStorage,
    addProductToCart,
    removeProductToCart,
    countProduct,
    countProductPrice,
  } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const pathname = usePathname();
  const productId = pathname.replace("/pages/", "");

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(productId);
      setProduct(product);
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const shoppingCart = getProductsFromLocalStorage();
    setShoppingCart(shoppingCart);
    setAttLocalStorage(false);
  }, [attLocalStorage, setAttLocalStorage, setShoppingCart]);

  const { id, title, thumbnail, shipping, price, available_quantity } = product && product;

  return (
    <section
      className='bg-base w-screen min-h-screen text-fontM'
    >
      <Header />
      <main
        className='flex flex-wrap justify-center pt-16 pb-2 lg:pt-36 lg:pb-16 lg:gap-0 lg:px-40 lg:h-screen lg:w-screen lg:flex-col lg:bg-blue-300'
      >
        {window.innerWidth < 600 && <CategoriesList />}
        {thumbnail && (
          <Image
          src={ thumbnail }
          alt={ title }
          width={500}
          height={100}
          quality={100}
          />
        )}
        <div className='px-2 flex flex-col gap-2 lg:justify-between lg:bg-red-300 lg:h-full lg:w-2/5'>
          <div className='lg:flex lg:flex-col lg:gap-9 lg:bg-yellow-300'>
            <h3
              className='hidden text-3xl tracking-wide font-bold lg:block'
            >
              Especificações técnicas
            </h3>
            <h3
              className={ `${(shipping && shipping.free_shipping) && 'text-green-200'} text-xl font-bold leading-6 pt-2 lg:text-3xl`
            }>
              {title}
            </h3>
            <span className='font-medium text-gray-300'>
              {`Quantidade em estoque. ${available_quantity}`}
            </span>
          </div>
          <div className='flex items-center justify-between lg:bg-green-300'>
            <h4
              className='text-accent text-4xl font-semibold'
            >
              {`R$${ (countProductPrice[id] || price)?.toFixed(2) }`}
            </h4>
            <Link href='/pages/ShoppingCart'>
              <BiCartAlt className='text-4xl font-semibold mr-7' />
            </Link>
          </div>
          <div
            className='flex justify-center items-center align-middle gap-6 h-24'
          >
            <button
              onClick={ () => removeProductToCart(id) }
            >
              <BiMinus
                className='text-6xl text-gray-300 lg:text-4xl'
              />
            </button>
            <p
              className='text-7xl text-gray-300 lg:text-3xl lg:bg-gray-700 lg:rounded-full lg:w-9 lg:flex lg:justify-center'
            >
              { countProduct[id] || 0 }
            </p>
            <button
              onClick={ () => addProductToCart(product) }
            >
              <BiPlus
                className='text-6xl text-gray-300 lg:text-4xl'
              />
            </button>
          </div>
        </div>
      </main>
      <FormProductAvaliation productId={ productId } />
    </section>
  );
}

export default ProductDetails;