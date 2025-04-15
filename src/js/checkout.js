import { getFromStorage, formatPrice } from './utils.js';

const orderSummary = document.getElementById('orderSummary');
const totalPaid = document.getElementById('totalPaid');

function loadCheckout() {
  const cart = getFromStorage('cart');
  let total = 0;

  orderSummary.innerHTML = '';

  if (cart.length === 0) {
    orderSummary.innerHTML = '<li>Your cart was empty.</li>';
    return;
  }

  cart.forEach(item => {
    const price = (Math.random() * (30 - 9.99) + 9.99).toFixed(2);
    total += parseFloat(price);

    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong> - ${formatPrice(price)}`;
    orderSummary.appendChild(li);
  });

  totalPaid.textContent = formatPrice(total);

  // Limpiar carrito después de la compra
  localStorage.removeItem('cart');
}

loadCheckout();
