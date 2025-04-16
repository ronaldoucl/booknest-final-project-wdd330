import {
  getFromStorage,
  saveToStorage,
  formatPrice,
  loadHeaderFooter,
} from "./utils.js";

const cartList = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

/**
 * Loads the shopping cart from localStorage and renders it in the cart view.
 * Calculates the total price and displays each item with title, price, and quantity.
 * If the cart is empty, displays a message.
 */
function loadCart() {
  const cart = getFromStorage("cart");

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item, index) => {
    // Generate a mock price for demonstration purposes
    const price = (Math.random() * (30 - 9.99) + 9.99).toFixed(2);
    total += parseFloat(price);
    console.log(item);

    const li = document.createElement("li");
    li.innerHTML = `
      <div class='cart-item'>
        <div>
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div>
          <p><strong>Title: </strong> ${item.title}</p>
          <p><strong>Price: </strong> ${formatPrice(price)}</p>
          <p><strong>Quantity: </strong> 1</p>
        </div>
      </div>
      <button class="btn-small" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = formatPrice(total);
}

/**
 * Handles click events on the cart item list.
 * When a "Remove" button is clicked, the corresponding item is removed from the cart
 * and the view is updated.
 */
cartList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    const cart = getFromStorage("cart");
    cart.splice(index, 1);
    saveToStorage("cart", cart);
    loadCart();
  }
});

// Initialize the cart and load header/footer content
loadCart();
loadHeaderFooter();
