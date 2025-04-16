import { getFromStorage, formatPrice, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const orderSummary = document.getElementById('orderSummary');
const subtotalAmount = document.getElementById('subTotal');
const taxAmount = document.getElementById('tax');
const totalPaid = document.getElementById('totalPaid');

function loadCheckout() {
  const cart = getFromStorage('cart');
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  orderSummary.innerHTML = '';

  if (cart.length === 0) {
    orderSummary.innerHTML = '<li>Your cart was empty.</li>';
    return;
  }

  cart.forEach(item => {
    const price = (Math.random() * (30 - 9.99) + 9.99).toFixed(2);
    subtotal += parseFloat(price);

    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong> - ${formatPrice(price)}`;
    orderSummary.appendChild(li);
  });

  tax = subtotal * 0.06;
  total = subtotal + tax;
  subtotalAmount.textContent = formatPrice(subtotal);
  taxAmount.textContent = formatPrice(tax);
  totalPaid.textContent = formatPrice(total);

  localStorage.removeItem('cart');
}

loadCheckout();