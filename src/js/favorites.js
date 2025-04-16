import { getFromStorage, saveToStorage, clearElement, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const favoritesList = document.getElementById('favoritesList');

/**
 * Loads favorite books from localStorage and renders them in a list.
 * If there are no favorites, displays a placeholder message.
 */
function loadFavorites() {
  const favorites = getFromStorage('favorites');
  clearElement(favoritesList);

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<li>You have no favorite books.</li>';
    return;
  }

  favorites.forEach((item, index) => {
    const li = document.createElement('li');
    console.log(item);
    li.innerHTML = `
      <div class='cart-item'>
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <p><strong>Title: </strong>${item.title}</p>
          <p><strong>Author/s: </strong>${item.authors}</p>
        </div>
      </div>
      <div>
        <a href="/src/product/index.html?id=${item.id}" class="btn-small">View</a>
        <button class="btn-small" data-index="${index}">Remove</button>
      </div>
    `;
    favoritesList.appendChild(li);
  });
}

/**
 * Handles click events on the favorites list.
 * If the "Remove" button is clicked, the book is removed from localStorage
 * and the list is refreshed.
 */
favoritesList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    const favorites = getFromStorage('favorites');
    favorites.splice(index, 1);
    saveToStorage('favorites', favorites);
    loadFavorites();
  }
});

loadFavorites();
