function compararPorId(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

export const getProductsFromLocalStorage = () => {
  const products = localStorage.getItem('cartProducts');
  return products ? JSON.parse(products) : [];
};

export const setProductToLocalStorage = (product) => {
  const localProducts = getProductsFromLocalStorage();
  const newProducts = [...localProducts, product].sort(compararPorId);
  localStorage.setItem('cartProducts', JSON.stringify(newProducts));
};

export const removeProductFromLocalStorage = (id) => {
  const localProducts = getProductsFromLocalStorage();
  const indexProduct = localProducts.findIndex((product) => product.id === id);
  const newProducts = localProducts
    .filter((_product, index) => index !== indexProduct)
    .sort(compararPorId);
  localStorage.setItem('cartProducts', JSON.stringify(newProducts));
};

export const removeAllProductFromLocalStorage = (id) => {
  const localProducts = getProductsFromLocalStorage();
  const newProducts = localProducts
    .filter((product) => product.id !== id)
    .sort(compararPorId);
  localStorage.setItem('cartProducts', JSON.stringify(newProducts));
};
