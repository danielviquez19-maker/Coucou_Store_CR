const WHATSAPP_NUMBER = '50674252898';
const instagramUrl = 'https://www.instagram.com/coucou_storecr';
const catalogUrl = 'assets/docs/catalogo-coucou-store-cr-mayo-2026.pdf';

const els = {
  grid: document.querySelector('#productGrid'),
  search: document.querySelector('#searchInput'),
  category: document.querySelector('#categoryFilter'),
  brand: document.querySelector('#brandFilter'),
  sort: document.querySelector('#sortFilter'),
  count: document.querySelector('#productCount'),
  clear: document.querySelector('#clearFilters'),
  mobileToggle: document.querySelector('#mobileToggle'),
  navLinks: document.querySelector('#navLinks')
};

function money(value){
  return new Intl.NumberFormat('es-CR', { style:'currency', currency:'CRC', maximumFractionDigits:0 }).format(value).replace('CRC', '₡');
}

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function productMessage(product){
  return `Hola Coucou Store CR, me interesa este producto: ${product.name} ${product.id} de la colección ${product.collection}. Precio de referencia: ${product.priceLabel}. ¿Me confirmás disponibilidad y precio final?`;
}

function unique(list, key){
  return [...new Set(list.map(item => item[key]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
}

function fillSelect(select, values, label){
  select.innerHTML = `<option value="">${label}</option>` + values.map(value => `<option value="${value}">${value}</option>`).join('');
}

function getFiltered(){
  const term = els.search.value.trim().toLowerCase();
  const category = els.category.value;
  const brand = els.brand.value;
  let list = PRODUCTS.filter(product => {
    const text = `${product.name} ${product.id} ${product.collection} ${product.category} ${product.brand}`.toLowerCase();
    const matchesTerm = !term || text.includes(term);
    const matchesCategory = !category || product.category === category;
    const matchesBrand = !brand || product.brand === brand;
    return matchesTerm && matchesCategory && matchesBrand;
  });

  switch(els.sort.value){
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    case 'name': list.sort((a,b)=>a.name.localeCompare(b.name,'es')); break;
    default: list.sort((a,b)=>a.page-b.page || a.id.localeCompare(b.id));
  }
  return list;
}

function renderProducts(){
  const list = getFiltered();
  els.count.innerHTML = `<strong>${list.length}</strong> productos visibles`;
  if(!list.length){
    els.grid.innerHTML = `<div class="empty"><strong>No encontramos productos con esos filtros.</strong><br>Probá con otro código, colección o categoría.</div>`;
    return;
  }
  els.grid.innerHTML = list.map(product => {
    const image = product.image ? `<img src="${product.image}" alt="${product.name} ${product.id}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\'fallback\'>${product.collection}</div>'">` : `<div class="fallback">${product.collection}</div>`;
    return `
      <article class="product-card" data-category="${product.category}">
        <div class="product-img">
          <span class="tag">${product.category}</span>
          ${image}
        </div>
        <div class="product-body">
          <div>
            <div class="product-title">${product.name}</div>
            <div class="product-code">${product.id} · ${product.brand} · ${product.collection}</div>
          </div>
          <div class="product-price">${product.priceLabel}</div>
          <div class="product-measures">${product.measures}</div>
          <div class="product-actions">
            <a class="btn btn-primary btn-small" href="${waLink(productMessage(product))}" target="_blank" rel="noopener">Consultar</a>
            <span class="page-chip">p. ${product.page}</span>
          </div>
        </div>
      </article>`;
  }).join('');
}

function initCategories(){
  const categories = unique(PRODUCTS, 'category');
  const brands = unique(PRODUCTS, 'brand');
  fillSelect(els.category, categories, 'Todas las categorías');
  fillSelect(els.brand, brands, 'Todas las marcas');

  document.querySelectorAll('[data-filter-category]').forEach(card => {
    card.addEventListener('click', () => {
      els.category.value = card.dataset.filterCategory;
      document.querySelector('#catalogo').scrollIntoView({ behavior:'smooth' });
      renderProducts();
    });
  });
}

function bindEvents(){
  [els.search, els.category, els.brand, els.sort].forEach(el => el.addEventListener('input', renderProducts));
  els.clear.addEventListener('click', () => {
    els.search.value = '';
    els.category.value = '';
    els.brand.value = '';
    els.sort.value = 'featured';
    renderProducts();
  });
  els.mobileToggle.addEventListener('click', () => els.navLinks.classList.toggle('open'));
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => els.navLinks.classList.remove('open')));

  document.querySelectorAll('[data-whatsapp]').forEach(a => {
    a.href = waLink(a.dataset.whatsapp || 'Hola Coucou Store CR, quiero información del catálogo.');
  });

  document.querySelectorAll('[data-instagram]').forEach(a => a.href = instagramUrl);
  document.querySelectorAll('[data-catalog]').forEach(a => a.href = catalogUrl);
}

initCategories();
bindEvents();
renderProducts();
