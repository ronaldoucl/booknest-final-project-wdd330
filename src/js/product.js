import {
  getQueryParam,
  saveToStorage,
  getFromStorage,
  loadHeaderFooter,
} from "./utils.js";
import { fetchBookById } from "./ExternalServices.mjs";

loadHeaderFooter();

const bookDetail = document.getElementById("bookDetail");

/**
 * Adds a book to the cart and saves it in localStorage.
 * @param {string} image - The image URL of the book.
 * @param {string} id - The unique ID of the book.
 * @param {string} title - The title of the book.
 */
window.addToCart = function (image, id, title) {
  const cart = getFromStorage("cart");
  cart.push({ id, title, image });
  saveToStorage("cart", cart);
  alert(`"${title}" was added to your cart!`);
};

/**
 * Adds a book to the favorites list if it doesn't already exist.
 * @param {string} authors - The authors of the book.
 * @param {string} image - The image URL of the book.
 * @param {string} id - The unique ID of the book.
 * @param {string} title - The title of the book.
 */
window.addToFavorites = function (authors, image, id, title) {
  const favorites = getFromStorage("favorites");
  if (!favorites.find((book) => book.id === id)) {
    favorites.push({ id, title, image, authors });
    saveToStorage("favorites", favorites);
    alert(`"${title}" was added to your favorites!`);
  } else {
    alert(`"${title}" is already in your favorites.`);
  }
};

/**
 * Renders the book details in the DOM, including image, title, author,
 * description, and buttons to add to cart or favorites.
 * @param {Object} book - The book object returned by the Google Books API.
 */
function renderBookDetail(book) {
  console.log(book);
  const info = book.volumeInfo;
  bookDetail.innerHTML = `
    <div class="book-detail__container">
      <img src="${
        info.imageLinks?.thumbnail || "https://placehold.co/128x193"
      }" alt="${info.title}" />
      <div>
        <h2>${info.title}</h2>
        <p><strong>Author:</strong> ${info.authors?.join(", ") || "Unknown"}</p>
        <p><strong>Description:</strong> ${
          info.description || "No description available."
        }</p>
        <button class="btn" onclick="addToCart('${
          info.imageLinks?.thumbnail || "https://placehold.co/128x193"
        }', '${book.id}', '${info.title.replace(
    /'/g,
    "\\'"
  )}')">Add to Cart</button>
        <button class="btn" onclick="addToFavorites('${
          info.authors?.join(", ") || "Unknown"
        }', '${
    info.imageLinks?.thumbnail || "https://placehold.co/128x193"
  }', '${book.id}', '${info.title.replace(
    /'/g,
    "\\'"
  )}')">Add to Favorites</button>
      </div>
    </div>
  `;
}

/**
 * Loads the book details using the ID from the URL query parameter.
 * Fetches data from the Google Books API and renders it.
 */
async function loadBook() {
  const id = getQueryParam("id");
  if (!id) return;

  const book = await fetchBookById(id);
  if (!book) {
    bookDetail.innerHTML = "<p>Error loading book details.</p>";
    return;
  }
  renderBookDetail(book);
}

// Initialize the page by loading book data
loadBook();
