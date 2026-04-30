const WHATSAPP_NUMBER = '50672452898';
const instagramUrl = 'https://www.instagram.com/coucou_storecr';
const catalogUrl = 'assets/docs/catalogo-coucou-store-cr-mayo-2026.pdf';
const quoteStorageKey = 'coucou-store-cr-consulta';
const whatsappDisplay = '+506 7245 2898';

const els = {
  grid: document.querySelector('#productGrid'),
  search: document.querySelector('#searchInput'),
  category: document.querySelector('#categoryFilter'),
  brand: document.querySelector('#brandFilter'),
  sort: document.querySelector('#sortFilter'),
  count: document.querySelector('#productCount'),
  clear: document.querySelector('#clearFilters'),
  mobileToggle: document.querySelector('#mobileToggle'),
  navLinks: document.querySelector('#navLinks'),
  openQuote: document.querySelector('#openQuote'),
  openQuoteInline: document.querySelector('#openQuoteInline'),
  quoteFab: document.querySelector('#quoteFab'),
  closeQuote: document.querySelector('#closeQuote'),
  drawer: document.querySelector('#quoteDrawer'),
  backdrop: document.querySelector('#drawerBackdrop'),
  quoteList: document.querySelector('#quoteList'),
  clearQuote: document.querySelector('#clearQuote'),
  sendQuote: document.querySelector('#sendQuote'),
  quoteCounters: [
    document.querySelector('#navQuoteCount'),
    document.querySelector('#inlineQuoteCount'),
    document.querySelector('#quoteFabCount')
  ],
  modal: document.querySelector('#productModal'),
  modalContent: document.querySelector('#modalContent'),
  closeModal: document.querySelector('#closeModal')
};

let quote = loadQuote();

function escapeHtml(value = ''){
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function showToast(message){
  let toast = document.querySelector('#siteToast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'site-toast';
    toast.setAttribute('role','status');
    toast.setAttribute('aria-live','polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
}


function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function productMessage(product){
  return `Hola Coucou Store CR, me interesa este producto: ${product.name} ${product.id} de la colección ${product.collection}. Precio de referencia: ${product.priceLabel}. ¿Me confirmás disponibilidad, colores y precio final?`;
}

function quoteMessage(){
  const products = quote
    .map(id => PRODUCTS.find(product => product.id === id))
    .filter(Boolean);

  if(!products.length){
    return 'Hola Coucou Store CR, quiero información del catálogo.';
  }

  const lines = products.map((product, index) => `${index + 1}. ${product.name} ${product.id} · ${product.collection} · ${product.priceLabel}`);
  return `Hola Coucou Store CR, quiero consultar disponibilidad, colores y precio final de estos productos:\n\n${lines.join('\n')}\n\nGracias.`;
}

function unique(list, key){
  return [...new Set(list.map(item => item[key]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
}

function fillSelect(select, values, label){
  select.innerHTML = `<option value="">${label}</option>` + values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
}

function loadQuote(){
  try{
    const parsed = JSON.parse(localStorage.getItem(quoteStorageKey) || '[]');
    return Array.isArray(parsed) ? parsed.filter(id => PRODUCTS.some(product => product.id === id)) : [];
  }catch(error){
    return [];
  }
}

function saveQuote(){
  localStorage.setItem(quoteStorageKey, JSON.stringify(quote));
}

function isInQuote(id){
  return quote.includes(id);
}

function addToQuote(id){
  const product = PRODUCTS.find(item => item.id === id);
  if(!isInQuote(id)){
    quote.push(id);
    if(product) showToast(`${product.name} agregado a tu consulta`);
  }else if(product){
    showToast(`${product.name} ya está en tu consulta`);
  }
  saveQuote();
  renderQuote();
}

function removeFromQuote(id){
  quote = quote.filter(item => item !== id);
  saveQuote();
  renderQuote();
  renderProducts();
  showToast('Producto eliminado de tu consulta');
}

function clearQuote(){
  quote = [];
  saveQuote();
  renderQuote();
  renderProducts();
  showToast('Tu consulta quedó vacía');
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

function productImageMarkup(product){
  if(product.image){
    return `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} ${escapeHtml(product.id)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\'fallback\'>${escapeHtml(product.collection)}</div>'">`;
  }
  return `<div class="fallback">${escapeHtml(product.collection)}</div>`;
}

function renderProducts(){
  const list = getFiltered();
  els.count.innerHTML = `<strong>${list.length}</strong> productos visibles`;
  if(!list.length){
    els.grid.innerHTML = `<div class="empty"><strong>No encontramos productos con esos filtros.</strong><br>Probá con otro código, colección o categoría.</div>`;
    return;
  }
  els.grid.innerHTML = list.map(product => {
    const added = isInQuote(product.id);
    return `
      <article class="product-card" data-category="${escapeHtml(product.category)}">
        <button class="product-img" data-detail="${escapeHtml(product.id)}" aria-label="Ver detalle de ${escapeHtml(product.name)} ${escapeHtml(product.id)}" type="button">
          <span class="tag">${escapeHtml(product.category)}</span>
          ${productImageMarkup(product)}
        </button>
        <div class="product-body">
          <div>
            <div class="product-title">${escapeHtml(product.name)}</div>
            <div class="product-code">${escapeHtml(product.id)} · ${escapeHtml(product.brand)} · ${escapeHtml(product.collection)}</div>
          </div>
          <div class="product-price">${escapeHtml(product.priceLabel)}</div>
          <div class="product-measures">${escapeHtml(product.measures)}</div>
          <div class="product-actions">
            <button class="btn btn-primary btn-small" data-add="${escapeHtml(product.id)}" type="button">${added ? 'Agregado' : 'Agregar'}</button>
            <button class="btn btn-small" data-detail="${escapeHtml(product.id)}" type="button">Detalle</button>
            <a class="btn btn-ghost btn-small product-wa" href="${waLink(productMessage(product))}" target="_blank" rel="noopener">WhatsApp</a>
            <span class="page-chip">p. ${product.page}</span>
          </div>
        </div>
      </article>`;
  }).join('');
}

function renderQuote(){
  els.quoteCounters.forEach(counter => { if(counter) counter.textContent = quote.length; });
  els.quoteFab.classList.toggle('has-items', quote.length > 0);
  els.sendQuote.href = waLink(quoteMessage());
  els.clearQuote.disabled = quote.length === 0;
  els.sendQuote.classList.toggle('disabled', quote.length === 0);

  const products = quote.map(id => PRODUCTS.find(product => product.id === id)).filter(Boolean);
  if(!products.length){
    els.quoteList.innerHTML = `<div class="empty empty-quote"><strong>Tu consulta está vacía.</strong><br>Agregá productos desde el catálogo para enviarlos por WhatsApp.</div>`;
    return;
  }

  els.quoteList.innerHTML = products.map(product => `
    <div class="quote-item">
      <div class="quote-thumb">${product.image ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">` : `<span>${escapeHtml(product.collection.slice(0,2))}</span>`}</div>
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <span>${escapeHtml(product.id)} · ${escapeHtml(product.collection)}</span>
        <em>${escapeHtml(product.priceLabel)}</em>
      </div>
      <button class="icon-btn" data-remove="${escapeHtml(product.id)}" type="button" aria-label="Eliminar ${escapeHtml(product.name)}">×</button>
    </div>
  `).join('');
}

function openDrawer(){
  els.backdrop.hidden = false;
  requestAnimationFrame(() => {
    els.drawer.classList.add('open');
    els.backdrop.classList.add('open');
    els.drawer.setAttribute('aria-hidden', 'false');
  });
}

function closeDrawer(){
  els.drawer.classList.remove('open');
  els.backdrop.classList.remove('open');
  els.drawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => { els.backdrop.hidden = true; }, 220);
}

function openProductModal(id){
  const product = PRODUCTS.find(item => item.id === id);
  if(!product) return;
  const added = isInQuote(product.id);
  els.modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">${productImageMarkup(product)}</div>
      <div class="modal-info">
        <span class="tag modal-tag">${escapeHtml(product.category)}</span>
        <h2>${escapeHtml(product.name)}</h2>
        <p class="product-code">${escapeHtml(product.id)} · ${escapeHtml(product.brand)} · ${escapeHtml(product.collection)}</p>
        <div class="product-price modal-price">${escapeHtml(product.priceLabel)}</div>
        <p class="modal-copy"><strong>Medidas:</strong> ${escapeHtml(product.measures)}</p>
        <p class="modal-copy">Precio de referencia sujeto a disponibilidad, color, impuestos y confirmación final.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" data-add="${escapeHtml(product.id)}" type="button">${added ? 'Ya está en mi consulta' : 'Agregar a mi consulta'}</button>
          <a class="btn" href="${waLink(productMessage(product))}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>
      </div>
    </div>
  `;
  if(typeof els.modal.showModal === 'function') els.modal.showModal();
}

function initCategories(){
  const categories = unique(PRODUCTS, 'category');
  const brands = unique(PRODUCTS, 'brand');
  fillSelect(els.category, categories, 'Todas las categorías');
  fillSelect(els.brand, brands, 'Todas las marcas');

  document.querySelectorAll('[data-product-count]').forEach(el => { el.textContent = PRODUCTS.length; });
  document.querySelectorAll('[data-whatsapp-display]').forEach(el => { el.textContent = whatsappDisplay; });

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

  els.grid.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add]');
    const detailButton = event.target.closest('[data-detail]');
    if(addButton){
      addToQuote(addButton.dataset.add);
      renderProducts();
      return;
    }
    if(detailButton){
      openProductModal(detailButton.dataset.detail);
    }
  });

  els.modalContent.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add]');
    if(addButton){
      addToQuote(addButton.dataset.add);
      openProductModal(addButton.dataset.add);
    }
  });

  els.quoteList.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-remove]');
    if(removeButton) removeFromQuote(removeButton.dataset.remove);
  });

  els.clearQuote.addEventListener('click', clearQuote);
  [els.openQuote, els.openQuoteInline, els.quoteFab].forEach(button => button.addEventListener('click', openDrawer));
  els.closeQuote.addEventListener('click', closeDrawer);
  els.backdrop.addEventListener('click', closeDrawer);

  els.closeModal.addEventListener('click', () => els.modal.close());
  els.modal.addEventListener('click', event => {
    if(event.target === els.modal) els.modal.close();
  });

  els.mobileToggle.addEventListener('click', () => {
    const open = els.navLinks.classList.toggle('open');
    els.mobileToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
    els.navLinks.classList.remove('open');
    els.mobileToggle.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-whatsapp]').forEach(a => {
    a.href = waLink(a.dataset.whatsapp || 'Hola Coucou Store CR, quiero información del catálogo.');
  });

  document.querySelectorAll('[data-instagram]').forEach(a => a.href = instagramUrl);
  document.querySelectorAll('[data-catalog]').forEach(a => a.href = catalogUrl);
}

initCategories();
bindEvents();
renderQuote();
renderProducts();
