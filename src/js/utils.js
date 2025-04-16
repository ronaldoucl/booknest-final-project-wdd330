/**
 * Formats a number as a price string with 2 decimal places.
 * @param {number} number - The number to format.
 * @returns {string} - Formatted price string.
 */
export function formatPrice(number) {
  return `$${Number(number).toFixed(2)}`;
}

/**
 * Retrieves a query parameter value from the URL.
 * @param {string} param - The query parameter name.
 * @returns {string|null} - The value of the query parameter or null if not found.
 */
export function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Saves data to localStorage as a JSON string.
 * @param {string} key - The localStorage key.
 * @param {*} data - The data to store.
 */
export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Retrieves data from localStorage and parses it as JSON.
 * @param {string} key - The localStorage key.
 * @returns {Array|Object} - The parsed data or an empty array if nothing found.
 */
export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Clears the innerHTML of a given DOM element.
 * @param {HTMLElement} element - The DOM element to clear.
 */
export function clearElement(element) {
  element.innerHTML = "";
}

/**
 * Renders a list of items into a parent element using a template function.
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

/**
 * Renders a single block of HTML and optionally runs a callback after render.
 */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

/**
 * Loads an HTML template from a given path via fetch.
 */
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

/**
 * Loads and injects header and footer templates into their respective elements on the page.
 */
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../../partials/header.html");
  const footerTemplate = await loadTemplate("../../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}