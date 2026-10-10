/*
 * Site search overlay (markup in <site-header>, entries in js/site-config.js).
 */
(function () {
  const SEARCH_INDEX = CIR.config.searchIndex;

  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const searchClose = document.getElementById('search-close');
  const searchResults = document.getElementById('search-results');
  if (!searchToggle || !searchOverlay) return;

  function renderSearchResults(query) {
    const q = query.trim().toLowerCase();
    const matches = q ? SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(q)) : SEARCH_INDEX;
    searchResults.innerHTML = matches.length
      ? matches.map(item => `<a href="${item.href}" class="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700">${item.title}</a>`).join('')
      : '<p class="px-4 py-3 text-sm text-slate-400">No matches found.</p>';
  }

  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.remove('hidden');
    renderSearchResults('');
    searchInput.value = '';
    searchInput.focus();
  });
  searchClose.addEventListener('click', () => searchOverlay.classList.add('hidden'));
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.add('hidden');
  });
  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.add('hidden');
  });
})();
