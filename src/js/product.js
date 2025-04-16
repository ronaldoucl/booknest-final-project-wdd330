import { getQueryParam, saveToStorage, getFromStorage, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const bookDetail = document.getElementById('bookDetail');

window.addToCart = function (image, id, title) {
  const cart = getFromStorage('cart');
  cart.push({ id, title, image });
  saveToStorage('cart', cart);
  alert(`"${title}" was added to your cart!`);
};

window.addToFavorites = function (authors, image, id, title) {
  const favorites = getFromStorage('favorites');
  if (!favorites.find(book => book.id === id)) {
    favorites.push({ id, title, image, authors });
    saveToStorage('favorites', favorites);
    alert(`"${title}" was added to your favorites!`);
  } else {
    alert(`"${title}" is already in your favorites.`);
  }
};

function renderBookDetail(book) {
  console.log(book);
  const info = book.volumeInfo;
  bookDetail.innerHTML = `
    <div class="book-detail__container">
      <img src="${info.imageLinks?.thumbnail || 'https://placehold.co/128x193'}" alt="${info.title}" />
      <div>
        <h2>${info.title}</h2>
        <p><strong>Author:</strong> ${info.authors?.join(', ') || 'Unknown'}</p>
        <p><strong>Description:</strong> ${info.description || 'No description available.'}</p>
        <button class="btn" onclick="addToCart('${info.imageLinks?.thumbnail || "https://placehold.co/128x193"}', '${book.id}', '${info.title.replace(/'/g, "\\'")}')">Add to Cart</button>
        <button class="btn" onclick="addToFavorites('${info.authors?.join(', ') || 'Unknown'}', '${info.imageLinks?.thumbnail || "https://placehold.co/128x193"}', '${book.id}', '${info.title.replace(/'/g, "\\'")}')">Add to Favorites</button>
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
