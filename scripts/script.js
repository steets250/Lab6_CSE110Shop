// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('products')) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data));
      processData();
    });
  } else {
    processData();
  }
});

function processData() {
  const products = JSON.parse(localStorage.getItem('products'));

  const productList = document.getElementById('product-list');

  for (const i in products) {
    const productData = products[i];

    productList.appendChild(new ProductItem(productData));
  }

  const cartLabel = document.getElementById('cart-count');

  const cartCount = parseInt(localStorage.getItem('cart')) || 0;

  cartLabel.textContent = cartCount;
}