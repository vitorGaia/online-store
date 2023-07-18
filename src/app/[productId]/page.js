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

  const renderProduct = product && [product].map((product) => (
    <div key={product.id}>
      <h3>{product.title}</h3>
      <Image
        src={ product.thumbnail }
        alt={ product.title }
        width={500}
        height={500}
        priority
      />
    </div>
  ));

  const renderProductInfos = product && [product].map((product) => (
    <div key={`0${product.id}`}>
      <h3>Especificações técnicas</h3>
      <span>{`Frete Grátis - ${product.shipping && product.shipping.free_shipping}`}</span>
      <span>{`Estoque - ${product.available_quantity}`}</span>

      <div>
        <h4>{`R$${ countProductPrice[product.id] || product.price }`}</h4>

        <button onClick={ () => removeProductToCart(product.id) }> - </button>
        <span>{ countProduct[product.id] || 0 }</span>
        <button onClick={ () => addProductToCart(product) }> + </button>
      </div>
    </div>
  ));

  return (
    <section>
      <Header />
      <div>
        {renderProduct}
        {renderProductInfos}
      </div>
      <FormProductAvaliation />
    </section>
  );
}

export default ProductDetails;