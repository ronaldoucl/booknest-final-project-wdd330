const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const bookList = document.getElementById('bookList');

// Función para renderizar libros
function renderBooks(books) {
  bookList.innerHTML = ''; // Limpiar antes de insertar

  if (!books || books.length === 0) {
    bookList.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach(book => {
    const info = book.volumeInfo;
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193'}" alt="${info.title}" />
      <h3>${info.title}</h3>
      <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
      <a href="/src/product/index.html?id=${book.id}" class="btn">Details</a>
    `;

    bookList.appendChild(bookCard);
  });
}

// Buscar libros al hacer click
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchBooks(query);
  }
});

// Búsqueda inicial por defecto
window.addEventListener('DOMContentLoaded', () => {
  fetchBooks('subject:fiction');
});

// Función para obtener libros de la API
async function fetchBooks(query) {
  try {
    const res = await fetch(`${API_URL}${encodeURIComponent(query)}&maxResults=12`);
    const data = await res.json();
    renderBooks(data.items);
  } catch (err) {
    console.error('Error fetching books:', err);
    bookList.innerHTML = '<p>Error fetching data. Try again later.</p>';
  }
}
