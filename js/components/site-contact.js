/*
 * <site-contact> — "Get In Touch" section with contact details and the office map.
 * Content comes from js/site-config.js.
 */
(function () {
  const { contact } = CIR.config;

  const phoneLinks = contact.phones
    .map(p => `<a href="tel:${p.tel}" class="hover:text-brand-700 hover:underline">${p.display}</a>`)
    .join(', ');

  const template = `
    <div id="contact" class="bg-white py-16 md:py-20 border-t border-slate-100">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <span class="h-1 w-10 bg-brand-500 rounded"></span>
            <span class="text-sm font-semibold uppercase tracking-wider text-brand-600">Get In Touch</span>
          </div>
          <h2 class="font-serif text-3xl font-bold text-navy-900">We'd love to hear from you</h2>
          <div class="space-y-3 text-slate-600 pt-2">
            <p class="flex items-center gap-3"><i class="fa-solid fa-location-dot text-brand-500 w-4" aria-hidden="true"></i> ${contact.address}</p>
            <p class="flex items-center gap-3"><i class="fa-solid fa-phone text-brand-500 w-4" aria-hidden="true"></i> ${phoneLinks}</p>
            <p class="flex items-center gap-3"><i class="fa-solid fa-envelope text-brand-500 w-4" aria-hidden="true"></i> <a href="mailto:${contact.email}" class="hover:text-brand-700 hover:underline">${contact.email}</a></p>
            <p class="flex items-center gap-3"><i class="fa-solid fa-clock text-brand-500 w-4" aria-hidden="true"></i> ${contact.hours}</p>
          </div>
        </div>
        <div class="bg-navy-900 text-white p-8 rounded-xl shadow-soft">
          <h3 class="font-serif text-xl font-bold mb-4">Have a message?</h3>
          <p class="mb-6 text-navy-100">Send us an email and our team will get back to you shortly.</p>
          <a href="mailto:${contact.email}"
            class="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-md transition shadow-lg">
            Email Us <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 mt-10">
        <div class="rounded-xl overflow-hidden shadow-soft border border-slate-100 h-72 md:h-96">
          <iframe
            src="${contact.mapEmbedUrl}"
            class="w-full h-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="CIR office location on Google Maps"></iframe>
        </div>
      </div>
    </div>
  `;

  customElements.define('site-contact', class extends HTMLElement {
    connectedCallback() {
      if (!this.hasChildNodes()) this.innerHTML = template;
    }
  });
})();
