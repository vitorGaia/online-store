const compararPorId = (a, b) => {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

const countProductQuantity = (product) => {
  const localProducts = getProductsFromLocalStorage();
  const filterProducts = localProducts.filter((localProduct) => localProduct.id === product.id);
  if (product.available_quantity <= filterProducts.length) {
    return false
  }
  return true;
}

export const getProductsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const products = localStorage.getItem('cartProducts');
    return products ? JSON.parse(products) : [];
  }
};

export const setProductToLocalStorage = (product) => {
  if (!countProductQuantity(product)) return;
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

export const getAvaliationsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const avaliations = localStorage.getItem('avaliationProducts');
    return avaliations ? JSON.parse(avaliations) : [];
  }
};

export const setAvaliationToLocalStorage = (avaliation) => {
  const localAvaliations = getAvaliationsFromLocalStorage();
  const newAvaliations = [...localAvaliations, avaliation];
  localStorage.setItem('avaliationProducts', JSON.stringify(newAvaliations));
};

export const removeAvaliationFromLocalStorage = (avaliationId) => {
  const localAvaliations = getAvaliationsFromLocalStorage();
  const indexAvaliation = localAvaliations
    .findIndex((avaliation) => avaliation.avaliationId === avaliationId);
  const newAvaliations = localAvaliations
    .filter((_avaliation, index) => index !== indexAvaliation);
  localStorage.setItem('avaliationProducts', JSON.stringify(newAvaliations));
};
