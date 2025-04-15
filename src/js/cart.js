const cartList = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item, index) => {
    // Simular precio entre $9.99 y $29.99
    const price = (Math.random() * (30 - 9.99) + 9.99).toFixed(2);
    total += parseFloat(price);

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.title}</strong> - $${price}
      <button class="btn-small" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Eliminar un libro
cartList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});

loadCart();
