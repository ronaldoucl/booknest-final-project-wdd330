import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const authorInput = document.getElementById("authorInput");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.getElementById("bookList");

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

searchBtn.addEventListener("click", () => {
  const query = buildQuery();
  fetchBooks(query);
});

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

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = buildQuery();
    fetchBooks(query);
  }
});

categoryFilter.addEventListener("change", () => {
  const query = buildQuery();
  fetchBooks(query);
});
