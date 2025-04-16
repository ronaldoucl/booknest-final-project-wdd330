import { loadHeaderFooter } from "./utils";

loadHeaderFooter();

/**
 * Adds click event listeners to each category element.
 * When a category is clicked:
 * - The category value is stored in localStorage.
 * - The user is redirected to the catalog page.
 */
document.querySelectorAll(".category").forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.dataset.category;
    localStorage.setItem("selectedCategory", category);
    window.location.href = "/src/catalog/index.html";
  });
});
