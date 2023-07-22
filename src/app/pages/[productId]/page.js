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
      className='bg-base max-w-screen overflow-x-hidden min-h-screen text-font'
    >
      <Header />
      <main
        className='flex flex-col justify-center pt-14 pb-2 lg:pt-28 lg:pb-16 lg:gap-20 lg:px-24 lg:h-screen lg:w-screen lg:flex-row'
      >
        <div className='lg:w-2/5 lg:h-full lg:flex lg:justify-center lg:items-center lg:rounded-md lg:bg-baseM lg:shadow-md relative overflow-auto'>
          {thumbnail && (
            <Image
            src={ thumbnail }
            alt={ title }
            width={500}
            height={100}
            quality={100}
            />
          )}
          {(shipping && shipping.free_shipping) && (
            <div className='diagonal-div-reverse bg-blue-500 absolute top-7 -left-8 h-7 w-36 flex justify-center items-center shadow-md'>
              <p className='text-sm font-medium text-baseM'>Frete Grátis</p>
            </div>
          )}
        </div>
        <div className='px-2 flex flex-col gap-2 lg:justify-between lg:h-full lg:w-2/5'>
          <div className='lg:flex lg:flex-col lg:gap-2'>
            <h3
              className='hidden text-3xl tracking-wide font-bold lg:block lg:text-4xl'
            >
              Especificações técnicas
            </h3>
            <h3
              className="text-xl font-bold leading-6 pt-2 lg:text-2xl"
            >
              {title}
            </h3>
            <span className='font-medium text-lg'>
              {`Quantidade em estoque. ${available_quantity}`}
            </span>
          </div>
          <div className='flex items-center justify-between lg:pb-10'>
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
            className='flex justify-center items-center align-middle gap-6 h-24 lg:absolute lg:bottom-16 lg:right-80'
          >
            <button
              onClick={ () => removeProductToCart(id) }
            >
              <BiMinus
                className='text-6xl lg:text-4xl'
              />
            </button>
            <p
              className='text-7xl lg:bg-gray-500 lg:bg-opacity-20 lg:text-2xl lg:rounded-full lg:w-8 lg:flex lg:justify-center'
            >
              { countProduct[id] || 0 }
            </p>
            <button
              onClick={ () => addProductToCart(product) }
            >
              <BiPlus
                className='text-6xl lg:text-4xl'
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