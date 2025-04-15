const orderSummary = document.getElementById('orderSummary');
const totalPaid = document.getElementById('totalPaid');

function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  if (cart.length === 0) {
    orderSummary.innerHTML = '<li>Your cart was empty.</li>';
    return;
  }

  cart.forEach(item => {
    const price = (Math.random() * (30 - 9.99) + 9.99).toFixed(2);
    total += parseFloat(price);

    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong> - $${price}`;
    orderSummary.appendChild(li);
  });

  totalPaid.textContent = total.toFixed(2);

  // Vaciar el carrito
  localStorage.removeItem('cart');
}

loadCheckout();
