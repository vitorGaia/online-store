'use client';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { getProductById } from '@/services/api';
import Image from 'next/image';
import { getProductsFromLocalStorage } from '@/services/localStorage';
import { AppContext } from '../contexts/AppContext';
import FormProductAvaliation from '../components/FormProductAvaliation';

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
  const productId = pathname.replace("/", "");

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
    <section>
      <Header />
      <div>
        <div>
          <h3>{title}</h3>
          {thumbnail && (
            <Image
              src={ thumbnail }
              alt={ title }
              width={500}
              height={500}
              quality={100}
            />
          )}
        </div>
        <div>
          <h3>Especificações técnicas</h3>
          <span>{`Frete Grátis - ${shipping && shipping.free_shipping}`}</span>
          <span>{`Estoque - ${available_quantity}`}</span>

          <div>
            <h4>{`R$${ countProductPrice[id] || price }`}</h4>

            <button onClick={ () => removeProductToCart(id) }> - </button>
            <span>{ countProduct[id] || 0 }</span>
            <button onClick={ () => addProductToCart(product) }> + </button>
          </div>
        </div>
      </div>
      <FormProductAvaliation productId={ productId } />
    </section>
  );
}

export default ProductDetails;