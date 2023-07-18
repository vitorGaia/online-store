'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AppLayout from '../AppLayout';
import { getProductById } from '@/services/api';
import Image from 'next/image';
import { getProductsFromLocalStorage, removeProductFromLocalStorage, setProductToLocalStorage } from '@/services/localStorage';

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [shoppingCart, setShoppingCart] = useState([]);
  const [attLocalStorage, setAttLocalStorage] = useState(false);
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
  }, [attLocalStorage]);

  const addProductToCart = (product) => {
    setProductToLocalStorage(product);
    setAttLocalStorage(true);
  };

  const removeProductToCart = (productId) => {
    removeProductFromLocalStorage(productId);
    setAttLocalStorage(true);
  };

  const countProduct = shoppingCart.reduce((acc, crr) => {
    if (acc[crr.id]) {
      acc[crr.id] += 1;
    } else {
      acc[crr.id] = 1;
    }

    return acc;
  }, {});

  const countProductPrice = shoppingCart.reduce((acc, crr) => {
    if (acc[crr.id]) {
      acc[crr.id] += crr.price;
    } else {
      acc[crr.id] = crr.price;
    }

    return acc;
  }, {});

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
    <AppLayout>
      <section>
        <Header />
        <div>
          {renderProduct}
          {renderProductInfos}
        </div>
      </section>
    </AppLayout>
  );
}

export default ProductDetails;