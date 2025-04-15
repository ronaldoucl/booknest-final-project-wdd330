export function formatPrice(number) {
  return `$${Number(number).toFixed(2)}`;
}

export function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function clearElement(element) {
  element.innerHTML = "";
}
