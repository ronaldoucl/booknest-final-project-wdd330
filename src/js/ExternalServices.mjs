const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * Fetches books based on a search query.
 * @param {string} query - Search query for Google Books.
 * @param {number} maxResults - Maximum number of results to fetch.
 * @returns {Promise<Array>} - A list of book items.
 */
export async function fetchBooks(query, maxResults = 12) {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
    );
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

/**
 * Fetches a single book by its ID.
 * @param {string} id - Google Books volume ID.
 * @returns {Promise<Object>} - The book data.
 */
export async function fetchBookById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return null;
  }
}
