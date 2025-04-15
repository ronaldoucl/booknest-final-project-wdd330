const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const bookDetail = document.getElementById('bookDetail');

// Obtener el ID del libro desde la URL
function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Renderizar los detalles del libro
function renderBookDetail(book) {
  const info = book.volumeInfo;

  bookDetail.innerHTML = `
    <div class="book-detail__container">
      <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${info.title}" />
      <div>
        <h2>${info.title}</h2>
        <p><strong>Author:</strong> ${info.authors ? info.authors.join(', ') : 'Unknown'}</p>
        <p><strong>Publisher:</strong> ${info.publisher || 'N/A'}</p>
        <p><strong>Published Date:</strong> ${info.publishedDate || 'N/A'}</p>
        <p><strong>Pages:</strong> ${info.pageCount || 'N/A'}</p>
        <p><strong>Categories:</strong> ${info.categories?.join(', ') || 'N/A'}</p>
        <p><strong>Description:</strong> ${info.description || 'No description available.'}</p>
        <button class="btn" onclick="addToCart('${book.id}', '${info.title.replace(/'/g, "\\'")}')">Add to Cart</button>
      </div>
    </div>
  `;
}

// Simular "Add to Cart" (usando localStorage)
window.addToCart = function (id, title) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, title });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`"${title}" was added to your cart!`);
};

// Obtener y mostrar los datos
async function loadBook() {
  const id = getBookIdFromURL();
  if (!id) {
    bookDetail.innerHTML = '<p>Book ID not found.</p>';
    return;
  }

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