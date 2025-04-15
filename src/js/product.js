import { getQueryParam, saveToStorage, getFromStorage } from './utils.js';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const bookDetail = document.getElementById('bookDetail');

window.addToCart = function (id, title) {
  const cart = getFromStorage('cart');
  cart.push({ id, title });
  saveToStorage('cart', cart);
  alert(`"${title}" was added to your cart!`);
};

window.addToFavorites = function (id, title) {
  const favorites = getFromStorage('favorites');
  if (!favorites.find(book => book.id === id)) {
    favorites.push({ id, title });
    saveToStorage('favorites', favorites);
    alert(`"${title}" was added to your favorites!`);
  } else {
    alert(`"${title}" is already in your favorites.`);
  }
};

function renderBookDetail(book) {
  const info = book.volumeInfo;
  bookDetail.innerHTML = `
    <div class="book-detail__container">
      <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${info.title}" />
      <div>
        <h2>${info.title}</h2>
        <p><strong>Author:</strong> ${info.authors?.join(', ') || 'Unknown'}</p>
        <p><strong>Description:</strong> ${info.description || 'No description available.'}</p>
        <button class="btn" onclick="addToCart('${book.id}', '${info.title.replace(/'/g, "\\'")}')">Add to Cart</button>
        <button class="btn" onclick="addToFavorites('${book.id}', '${info.title.replace(/'/g, "\\'")}')">Add to Favorites</button>
      </div>
    </div>
  `;
}

async function loadBook() {
  const id = getQueryParam('id');
  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    renderBookDetail(data);
  } catch (err) {
    console.error(err);
    bookDetail.innerHTML = '<p>Error loading book details.</p>';
  }
}

loadBook();
