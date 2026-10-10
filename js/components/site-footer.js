/*
 * <site-footer> — footer columns, copyright bar and the back-to-top button.
 * Content comes from js/site-config.js; the button's behaviour lives in js/features/back-to-top.js.
 */
(function () {
  const { contact, social, footerLinks } = CIR.config;
  const link = CIR.link;

  const socialLinks = social.map(s => s.icon
    ? `<a href="${s.href}" class="text-navy-300 hover:text-brand-300 transition" aria-label="${s.label}"><i class="fa-brands ${s.icon}" aria-hidden="true"></i></a>`
    : `<a href="${s.href}" class="text-navy-300 hover:text-brand-300 transition inline-flex items-center justify-center w-5 h-5 rounded-[3px] border border-current text-[10px] font-bold leading-none" aria-label="${s.label}">${s.text}</a>`
  ).join('\n');

  const linkColumns = footerLinks.map(column => `
    <div>
      <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">${column.heading}</h4>
      <ul class="space-y-2 text-sm">
        ${column.links.map(l => `<li><a href="${link(l.href)}"${l.external ? ' target="_blank" rel="noopener"' : ''} class="hover:text-brand-300 transition">${l.label}</a></li>`).join('\n')}
      </ul>
    </div>`
  ).join('\n');

  const template = `
    <footer class="bg-navy-950 text-navy-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img src="./img/logo.png" alt="CIR logo" class="h-11 w-11 object-contain" />
            <div class="leading-tight">
              <div class="font-serif font-bold text-white">CIR</div>
              <div class="text-[10px] text-navy-300 uppercase tracking-wider">Innovation &amp; Research</div>
            </div>
          </div>
          <p class="text-sm text-navy-300 leading-relaxed">A hub for innovation, research, and development committed to inclusive policymaking and sustainable growth in Bangladesh.</p>
          <div class="flex items-center gap-4 mt-5 text-lg">
            ${socialLinks}
          </div>
        </div>
        ${linkColumns}
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-2"><i class="fa-solid fa-location-dot text-brand-400 mt-0.5" aria-hidden="true"></i> ${contact.address}</li>
            <li class="flex items-start gap-2"><i class="fa-solid fa-phone text-brand-400 mt-0.5" aria-hidden="true"></i> <a href="tel:${contact.phones[0].tel}" class="hover:text-brand-300 transition">${contact.phones[0].display}</a></li>
            <li class="flex items-start gap-2"><i class="fa-solid fa-envelope text-brand-400 mt-0.5" aria-hidden="true"></i> <a href="mailto:${contact.email}" class="hover:text-brand-300 transition">${contact.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-navy-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-300">
          <span>&copy; 2025 Centre for Innovation &amp; Research. All rights reserved.</span>
          <span class="italic">"Wisdom for the Service of Humanity through Creativity"</span>
        </div>
      </div>
    </footer>

    <!-- Back to top -->
    <button id="back-to-top" type="button" aria-label="Back to top"
      class="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full bg-navy-900 text-white shadow-lg flex items-center justify-center opacity-0 pointer-events-none translate-y-2 transition-all duration-300 hover:bg-brand-500">
      <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
    </button>
  `;

  customElements.define('site-footer', class extends HTMLElement {
    connectedCallback() {
      if (!this.hasChildNodes()) this.innerHTML = template;
    }
  });
})();
