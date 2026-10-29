/*
 * <site-header> — skip link, top utility bar, main navbar, mobile menu and search overlay.
 * Content comes from js/site-config.js; behaviour lives in js/features/mobile-menu.js and search.js.
 *
 * Loaded without `defer` in <head> so the header renders during page parsing (no flash).
 */
(function () {
  const { nav, contact, social } = CIR.config;
  const link = CIR.link;

  const socialLinks = social.map(s => s.icon
    ? `<a href="${s.href}" class="hover:text-brand-300 transition" aria-label="${s.label}"><i class="fa-brands ${s.icon}" aria-hidden="true"></i></a>`
    : `<a href="${s.href}" class="hover:text-brand-300 transition inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] border border-current text-[9px] font-bold leading-none" aria-label="${s.label}">${s.text}</a>`
  ).join('\n');

  function desktopNavItem(item) {
    if (item.children) {
      return `
        <div class="relative group">
          <button class="nav-link text-navy-100 hover:text-white inline-flex items-center gap-1" aria-haspopup="true">
            ${item.label} <i class="fa-solid fa-chevron-down text-[10px]" aria-hidden="true"></i>
          </button>
          <div class="absolute left-0 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 ease-out">
            <div class="${item.menuWidth} bg-white text-slate-700 rounded-lg shadow-soft border border-slate-100 py-2">
              ${item.children.map(child => `<a href="${link(child.href)}" class="block px-4 py-2 text-sm hover:bg-brand-50 hover:text-brand-700">${child.label}</a>`).join('\n')}
            </div>
          </div>
        </div>`;
    }
    if (item.cta) {
      return `<a href="${link(item.href)}" class="ml-2 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-4 py-2 rounded-md transition shadow">${item.label}</a>`;
    }
    if (item.external) {
      return `<a href="${item.href}" target="_blank" rel="noopener" class="nav-link text-navy-100 hover:text-white inline-flex items-center gap-1">${item.label} <i class="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i></a>`;
    }
    return `<a href="${link(item.href)}" class="nav-link ${item.highlight ? 'text-white' : 'text-navy-100 hover:text-white'}">${item.label}</a>`;
  }

  function mobileNavItem(item) {
    if (item.children) {
      return `
        <div>
          <button type="button" class="w-full text-left px-3 py-2 rounded-md text-navy-100 hover:bg-navy-800 toggle-submenu flex justify-between items-center" data-target="${item.id}-submenu" aria-expanded="false">
            ${item.label} <i class="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
          </button>
          <div id="${item.id}-submenu" class="max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out pl-6 space-y-1 text-navy-200">
            ${item.children.map(child => `<a href="${link(child.href)}" class="block px-3 py-2">${child.label}</a>`).join('\n')}
          </div>
        </div>`;
    }
    if (item.cta) {
      return `<a href="${link(item.href)}" class="block px-3 py-2 rounded-md text-brand-300 font-semibold hover:bg-navy-800">${item.mobileLabel || item.label}</a>`;
    }
    const target = item.external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${link(item.href)}"${target} class="block px-3 py-2 rounded-md ${item.highlight ? 'text-white' : 'text-navy-100'} hover:bg-navy-800">${item.label}</a>`;
  }

  const template = `
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to main content</a>

    <!-- Top utility bar -->
    <div class="bg-navy-950 text-navy-100 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-brand-400"></span> Research &amp; Innovation</span>
          <span class="hidden sm:inline">Dhaka, Bangladesh</span>
          <span class="hidden md:flex items-center gap-3 pl-3 ml-1 border-l border-navy-800">
            ${socialLinks}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <span class="hidden sm:inline leading-tight">
            ${contact.emails.map(e => `<a href="mailto:${e}" class="block hover:text-brand-300 transition">${e}</a>`).join('\n')}
          </span>
          <span>${contact.phones[0].display}</span>
        </div>
      </div>
    </div>

    <header class="bg-navy-900 text-white sticky top-0 z-50 shadow-lg shadow-navy-950/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Brand -->
          <a href="./index.html" class="flex items-center gap-3 group">
            <img src="./img/logo.png" class="h-16 w-16 object-contain drop-shadow" alt="CIR logo">
            <div class="leading-tight">
              <div class="font-serif font-bold text-lg sm:text-xl tracking-wide group-hover:text-brand-300 transition">CIR</div>
              <div class="text-xs sm:text-sm text-navy-200 uppercase tracking-wider">Centre for Innovation &amp; Research</div>
              <div class="hidden md:block text-[11px] text-brand-300 italic mt-0.5">"Wisdom for the Service of Humanity through Creativity"</div>
            </div>
          </a>

          <!-- Desktop Nav -->
          <nav class="hidden xl:flex items-center gap-6 text-sm font-medium whitespace-nowrap">
            ${nav.map(desktopNavItem).join('\n')}
          </nav>

          <div class="flex items-center gap-1">
            <button id="search-toggle" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-navy-100 hover:text-white hover:bg-navy-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400" aria-label="Search the site">
              <i class="fa-solid fa-magnifying-glass text-lg" aria-hidden="true"></i>
            </button>
            <!-- Mobile Hamburger -->
            <button id="menu-toggle" type="button" class="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-navy-100 hover:text-white hover:bg-navy-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle navigation menu">
              <i class="fa-solid fa-bars text-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="xl:hidden max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-navy-800 bg-navy-900">
        <div class="px-4 py-3 space-y-1 text-sm">
          ${nav.map(mobileNavItem).join('\n')}
        </div>
      </div>
    </header>

    <!-- Search Overlay -->
    <div id="search-overlay" class="hidden fixed inset-0 z-[70] bg-navy-950/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
      <div class="bg-white rounded-xl shadow-soft w-full max-w-lg overflow-hidden">
        <div class="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <i class="fa-solid fa-magnifying-glass text-slate-400" aria-hidden="true"></i>
          <input id="search-input" type="text" placeholder="Search pages, team, publications..." class="flex-1 outline-none text-slate-800 placeholder:text-slate-400" autocomplete="off">
          <button id="search-close" type="button" class="text-slate-400 hover:text-slate-600" aria-label="Close search"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <div id="search-results" class="max-h-80 overflow-y-auto py-2"></div>
      </div>
    </div>
  `;

  customElements.define('site-header', class extends HTMLElement {
    connectedCallback() {
      if (!this.hasChildNodes()) this.innerHTML = template;
    }
  });
})();
