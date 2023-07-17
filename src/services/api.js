export async function getCategories() {
  try {
    const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    let ENDPOINT;

    if (query && !categoryId) {
      ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    } else if (categoryId && !query) {
      ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    } else {
      ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
    }

    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(productId) {
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  try {
    const ENDPOINT = `https://api.mercadolibre.com/items/${productId}`;
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
