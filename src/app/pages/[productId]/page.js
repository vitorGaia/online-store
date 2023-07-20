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
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

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
      <div
        className='flex-col justify-center pt-14'
      >
        <CategoriesList />
        {thumbnail && (
          <Image
          src={ thumbnail }
          alt={ title }
          width={500}
          height={100}
          quality={100}
          />
        )}
        <div className='px-2'>
          <h3
            className={ `${(shipping && shipping.free_shipping) && 'text-pink-200'} text-lg font-bold leading-6 pt-2`
          }>
            {title}
          </h3>
          <h3
            className='hidden'
          >
            Especificações técnicas
          </h3>
          <span>
            {`Quantidade em estoque. ${available_quantity}`}
          </span>
          <h4
            className='text-accentM text-3xl font-semibold'
          >
            {`R$${ countProductPrice[id] || price }`}
          </h4>
          <div
            className='flex justify-center items-center align-middle gap-6 h-24'
          >
            <button
              onClick={ () => removeProductToCart(id) }
            >
              <BiChevronsLeft
                className='text-6xl border-2 border-accentM rounded-full'
              />
            </button>
            <p
              className='text-7xl'
            >
              { countProduct[id] || 0 }
            </p>
            <button
              onClick={ () => addProductToCart(product) }
            >
              <BiChevronsRight
                className='text-6xl border-2 border-accentM rounded-full'
              />
            </button>
          </div>
        </div>
      </div>
      <FormProductAvaliation productId={ productId } />
    </section>
  );
}

export default ProductDetails;