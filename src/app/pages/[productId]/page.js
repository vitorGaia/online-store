'use client';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/page';
import { getProductById } from '@/services/api';
import Image from 'next/image';
import { getProductsFromLocalStorage } from '@/services/localStorage';
import { AppContext } from '../../contexts/AppContext';
import FormProductAvaliation from '../../components/FormProductAvaliation/page';
import { HiOutlineShoppingCart, HiPlus, HiMinus } from "react-icons/hi2";
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

  const { id, title, thumbnail, shipping, price, available_quantity } = product !== undefined && product;
  const formatPrice = price && (countProductPrice[id] || price).toFixed(2).replace('.', ',');

  return (
    <section
      className='bg-base max-w-screen overflow-x-hidden min-h-screen text-font'
    >

      <Header />

      <main
        className='flex flex-col justify-center pt-14 pb-4 lg:pt-28 lg:pb-16 lg:gap-20 lg:px-24 lg:h-screen lg:w-screen lg:flex-row'
      >
        <div className='lg:w-2/5 lg:h-full lg:flex lg:justify-center lg:items-center lg:rounded-md lg:bg-baseM lg:shadow-md relative overflow-auto'>
          {thumbnail && (
            <Image
            src={ thumbnail }
            alt={ title }
            width={500}
            height={500}
            />
          )}
          {(shipping && shipping.free_shipping) && (
            <div className='diagonal-div-reverse bg-yellow-400 absolute top-7 -left-8 h-7 w-36 flex justify-center items-center shadow-lg'>
              <p className='text-sm font-semibold text-baseM'>Frete Grátis</p>
            </div>
          )}
        </div>

        <div className='px-2 flex flex-col gap-4 lg:h-full lg:w-2/5 lg:gap-10'>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <h3
              className='hidden text-3xl tracking-wide font-bold text-fontM lg:block lg:text-3xl'
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

            <p className='hidden lg:block'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper sapien vitae sagittis laoreet. Nam ut dolor vitae urna malesuada facilisis. Sed nec turpis et elit elementum condimentum. In risus magna, pulvinar vel posuere et, scelerisque non nibh. Vivamus sollicitudin elit nibh, vitae consectetur odio congue eget. Nunc aliquet nunc urna. Vestibulum sagittis facilisis nunc ac porta. Maecenas dictum scelerisque ornare. In condimentum viverra elit porta ornare
            </p>

            <h4
              className='text-accent text-4xl font-semibold'
            >
              {`R$ ${formatPrice}`}
            </h4>
          </div>

          <div className='flex items-center h-12 gap-7 lg:justify-evenly'>
            <Link
              href='/pages/ShoppingCart'
              className='bg-accent w-3/5 h-full lg:w-2/3 lg:h-12 rounded-md flex justify-center items-center gap-2 hover:bg-accentHover shadow-md'
            >
              <span className='text-xl text-font font-medium'>Ir ao carrinho</span>
              <HiOutlineShoppingCart className='text-2xl lg:text-3xl' />
            </Link>

            <div
              className='bg-gray-500 bg-opacity-10 flex shadow-md justify-center items-center h-9 rounded-full overflow-hidden'
            >
              <button
                onClick={ () => removeProductToCart(id) }
              >
                <HiMinus
                  className='text-xl w-7 lg:text-2xl hover:text-accent transition lg:w-10'
                />
              </button>

              <p
                className='text-lg w-7 text-center border-x border-fontM lg:w-10 lg:text-2xl'
              >
                { countProduct[id] || 0 }
              </p>

              <button
                onClick={ () => addProductToCart(product) }
                className='bg-gray-600 bg-opacity-10 h-full'
              >
                <HiPlus
                  className='text-xl w-7 lg:text-2xl hover:text-accent transition lg:w-10'
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      <FormProductAvaliation productId={ productId } />
    </section>
  );
}

export default ProductDetails;