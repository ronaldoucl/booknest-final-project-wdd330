import { loadHeaderFooter } from "./utils.js";

// Load header and footer on the page
loadHeaderFooter();

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const authorInput = document.getElementById("authorInput");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.getElementById("bookList");

/**
 * Renders a list of books into the DOM.
 * @param {Array} books - Array of book objects from the Google Books API.
 */
function renderBooks(books) {
  bookList.innerHTML = "";

  if (!books || books.length === 0) {
    bookList.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach((book) => {
    const info = book.volumeInfo;
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <img src="${
        info.imageLinks?.thumbnail || "https://placehold.co/128x193"
      }" alt="${info.title}" />
      <h3>${info.title}</h3>
      <p>${info.authors ? info.authors.join(", ") : "Unknown Author"}</p>
      <a href="/src/product/index.html?id=${book.id}" class="btn">Details</a>
    `;

    bookList.appendChild(bookCard);
  });
}

/**
 * Fetches books from the Google Books API based on a query.
 * @param {string} query - The search query string.
 */
async function fetchBooks(query) {
  try {
    const res = await fetch(
      `${API_URL}${encodeURIComponent(query)}&maxResults=12`
    );
    const data = await res.json();
    renderBooks(data.items);
  } catch (err) {
    console.error("Error fetching books:", err);
    bookList.innerHTML = "<p>Error fetching data. Try again later.</p>";
  }
}

/**
 * Builds the query string based on user input for keyword, category, and author.
 * @returns {string} - The complete search query for the API.
 */
function buildQuery() {
  const keyword = searchInput.value.trim();
  const category = categoryFilter.value.trim();
  const author = authorInput.value.trim();

  let query = "";

  if (keyword) {
    query += keyword;
  }

  if (category) {
    query += `+subject:${category}`;
  }

  if (author) {
    query += `+inauthor:${author}`;
  }

  return query || "subject:fiction"; 
}

/**
 * Handles search button click and fetches books based on built query.
 */
searchBtn.addEventListener("click", () => {
  const query = buildQuery();
  fetchBooks(query);
});

/**
 * Loads books on page load, using a saved category from localStorage if available.
 */
window.addEventListener("DOMContentLoaded", () => {
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    const query = buildQuery();
    fetchBooks(query);
    localStorage.removeItem("selectedCategory");
  } else {
    fetchBooks("subject:fiction");
  }
});

/**
 * Handles Enter key press in the search input to trigger a search.
 */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = buildQuery();
    fetchBooks(query);
  }
});

/**
 * Handles category filter changes to update the book list dynamically.
 */
categoryFilter.addEventListener("change", () => {
  const query = buildQuery();
  fetchBooks(query);
});
