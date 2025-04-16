import { getFromStorage, saveToStorage, formatPrice, loadHeaderFooter } from './utils.js';

const cartList = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function loadCart() {
  const cart = getFromStorage("cart");

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item, index) => {
    const price = (Math.random() * (30 - 9.99) + 9.99).toFixed(2);
    total += parseFloat(price);

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.title}</strong> - ${formatPrice(price)}
      <button class="btn-small" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = formatPrice(total);
}

cartList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    const cart = getFromStorage("cart");
    cart.splice(index, 1);
    saveToStorage("cart", cart);
    loadCart();
  }
});

loadCart();
loadHeaderFooter();