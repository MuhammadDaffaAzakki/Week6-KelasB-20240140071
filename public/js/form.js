// Aturan Validasi Sesuai Ketentuan
const rules = {
  minNameLen: 3,
  maxNameLen: 60,
  minPrice: 1000,
  maxPrice: 100000000
};

// Template Caption
const templates = {
  Promo: (name, price, hashtag) => 
    `🔥 PROMO SPESIAL! 🔥\nDapatkan ${name} sekarang juga hanya dengan ${price}! Stok terbatas, yuk diorder sebelum kehabisan!\n\n${hashtag} #PromoSpesial #DiskonHariIni`,
  Santai: (name, price, hashtag) => 
    `☕ Ngedrop butuh yang seger? Cobain ${name} deh. Harganya cuma ${price} aja lho. Cocok banget buat nemenin hari kamu!\n\n${hashtag} #NongkrongYuk #Rekomendasi`,
  Formal: (name, price, hashtag) => 
    `✨ Penawaran Eksklusif ✨\nKami mempersembahkan ${name} dengan kualitas terbaik. Dapatkan produk ini senilai ${price}.\n\n${hashtag} #ProdukBerkualitas #PilihanTerbaik`
};

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('productName');
  const priceInput = document.getElementById('productPrice');
  const form = document.getElementById('captionForm');

  // Validasi real-time saat mengetik
  nameInput.addEventListener('input', validateName);
  priceInput.addEventListener('input', validatePrice);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPriceValid = validatePrice();

    if (isNameValid && isPriceValid) {
      generateCaption();
    }
  });
});

function validateName() {
  const nameInput = document.getElementById('productName');
  const errorEl = document.getElementById('nameError');
  const val = nameInput.value.trim();

  const hasLetter = /[a-zA-Z]/.test(val);
  const isValid = val.length >= rules.minNameLen && val.length <= rules.maxNameLen && hasLetter;

  if (!isValid) {
    nameInput.classList.add('invalid');
    errorEl.style.display = 'block';
    return false;
  } else {
    nameInput.classList.remove('invalid');
    errorEl.style.display = 'none';
    return true;
  }
}

function validatePrice() {
  const priceInput = document.getElementById('productPrice');
  const errorEl = document.getElementById('priceError');
  const val = Number(priceInput.value);

  const isInteger = Number.isInteger(val);
  const isValid = priceInput.value !== '' && isInteger && val >= rules.minPrice && val <= rules.maxPrice;

  if (!isValid) {
    priceInput.classList.add('invalid');
    errorEl.style.display = 'block';
    return false;
  } else {
    priceInput.classList.remove('invalid');
    errorEl.style.display = 'none';
    return true;
  }
}

// Format Nama ke Hashtag CamelCase (#KopiSusuAren)
function createHashtag(str) {
  return '#' + str
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Format Angka ke IDR (Rupiah)
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

function generateCaption() {
  const nameVal = document.getElementById('productName').value;
  const priceVal = Number(document.getElementById('productPrice').value);
  const selectedTemplate = document.getElementById('templateSelect').value;

  const formattedPrice = formatRupiah(priceVal);
  const hashtag = createHashtag(nameVal);

  const captionText = templates[selectedTemplate](nameVal, formattedPrice, hashtag);

  // Masukkan hasil caption ke dalam textarea
  const resultContent = document.getElementById('resultContent');
  resultContent.value = captionText;
}