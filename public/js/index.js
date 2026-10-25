let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();

  document.getElementById('searchInput').addEventListener('input', filterProducts);
  document.getElementById('categorySelect').addEventListener('change', filterProducts);
});

// Fetch Data menggunakan Fetch API
async function fetchProducts() {
  const container = document.getElementById('productGrid');
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error('Gagal mengambil data dari server');
    
    const data = await response.json();
    allProducts = data.products;

    populateCategories(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    container.innerHTML = `<div class="error-msg">Terjadi kesalahan: ${error.message}</div>`;
  }
}

// Opsi Kategori Dinamis
function populateCategories(products) {
  const categorySelect = document.getElementById('categorySelect');
  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

// Render DOM Produk
function renderProducts(products) {
  const container = document.getElementById('productGrid');
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<div class="empty-msg">Produk tidak ditemukan.</div>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    // Badge Stok Menipis (stok < 10)
    const stockBadge = product.stock < 10 
      ? `<span class="badge-menipis">Stok Menipis (${product.stock})</span>` 
      : '';

    card.innerHTML = `
      ${stockBadge}
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="card-body">
        <h3 class="card-title">${product.title}</h3>
        <p class="card-price">$${product.price.toFixed(2)}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Logika Filter & Cari
function filterProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categorySelect').value;

  const filtered = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}