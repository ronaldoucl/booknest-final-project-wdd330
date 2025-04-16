import { loadHeaderFooter } from "./utils";

loadHeaderFooter();

document.querySelectorAll(".category").forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.dataset.category;
    localStorage.setItem("selectedCategory", category);
    window.location.href = "/src/catalog/index.html";
  });
});
