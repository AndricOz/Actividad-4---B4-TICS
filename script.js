const API_URL = "https://fakestoreapi.com/products";

const productList = document.getElementById("productList");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const reloadBtn = document.getElementById("reloadBtn");

let allProducts = [];

function setStatus(message) {
  statusEl.textContent = message;
}

function renderProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    setStatus("No se encontraron productos con esos criterios.");
    return;
  }

  setStatus(`Mostrando ${products.length} producto(s).`);

  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const category = document.createElement("p");
    category.textContent = product.category;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `$${product.price.toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(price);

    fragment.appendChild(card);
  });

  productList.appendChild(fragment);
}

function populateCategories(products) {
  const categories = [...new Set(products.map((p) => p.category))];

  categoryFilter.innerHTML = '<option value="all">Todas las categorías</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = allProducts.filter((product) => {
    const matchesTerm = product.title.toLowerCase().includes(term);
    const matchesCategory = category === "all" || product.category === category;
    return matchesTerm && matchesCategory;
  });

  renderProducts(filtered);
}

async function loadProducts() {
  setStatus("Cargando productos...");
  productList.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    allProducts = data;

    populateCategories(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    setStatus(`Ocurrió un error al obtener los datos: ${error.message}`);
  }
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
reloadBtn.addEventListener("click", loadProducts);

document.addEventListener("DOMContentLoaded", loadProducts);
