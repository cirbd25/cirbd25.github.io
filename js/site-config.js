/*
 * Site-wide content shared by every page.
 *
 * Edit the navigation, contact details, social links and search entries here;
 * the header, contact section and footer components render from this file.
 * Labels may contain HTML entities (e.g. &amp;).
 */
window.CIR = window.CIR || {};

CIR.config = {
  contact: {
    // Each address is shown on its own line; the first is used by the "Email Us" button.
    emails: ['contact@cirbd.org', 'cirb25@yahoo.com'],
    // The first number is shown in the top bar and footer.
    phones: [
      { display: '+880 1710715032', tel: '+8801710715032' },
    ],
    address: 'House-11, Road-11, Block-C, Pallabi, Mirpur-12, Mirpur, Dhaka, Bangladesh',
    hours: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps?q=House+11%2C+Road+11%2C+Block+C%2C+Pallabi%2C+Mirpur-12%2C+Dhaka%2C+Bangladesh&output=embed',
  },

  // Shown in the top utility bar and the footer. Use `icon` (Font Awesome
  // brand icon) or `text` (small badge) for each entry.
  social: [
    { label: 'LinkedIn', href: '#', icon: 'fa-linkedin-in' },
    { label: 'Facebook', href: '#', icon: 'fa-facebook-f' },
    { label: 'Twitter / X', href: '#', icon: 'fa-x-twitter' },
    { label: 'ResearchGate', href: '#', text: 'RG' },
  ],

  // Main navigation (desktop bar and mobile menu).
  //   children    -> dropdown; `id` names the mobile submenu, `menuWidth` sizes the desktop dropdown
  //   external    -> opens in a new tab
  //   cta         -> rendered as the highlighted button (mobileLabel overrides the text on mobile)
  //   highlight   -> rendered in white instead of the muted link colour
  // Links starting with "#" point at sections of the home page.
  nav: [
    { label: 'Home', href: './index.html', highlight: true },
    {
      label: 'About Us', id: 'about', menuWidth: 'w-56',
      children: [
        { label: 'MD Message', href: './md_message.html' },
        { label: 'What We Do', href: '#whatwedo' },
        { label: 'Our Team', href: './our_team.html' },
      ],
    },
    { label: 'CIR Journal', href: 'https://cirjournal.cirbd.org', external: true },
    {
      label: 'Publications', id: 'publications', menuWidth: 'w-48',
      children: [
        { label: 'Book', href: './book.html' },
        { label: 'Journal', href: './journal.html' },
        { label: 'Columns', href: './columns.html' },
      ],
    },
    { label: 'News &amp; Events', href: '#news-media' },
    { label: 'Contact', mobileLabel: 'Contact Us', href: '#contact', cta: true },
  ],

  // Link columns in the footer.
  footerLinks: [
    {
      heading: 'Quick Links',
      links: [
        { label: 'Home', href: './index.html' },
        { label: 'About Us', href: '#whatwedo' },
        { label: 'Our Team', href: './our_team.html' },
        { label: 'News &amp; Events', href: '#news-media' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      heading: 'Publications',
      links: [
        { label: 'Book', href: './book.html' },
        { label: 'Journal', href: './journal.html' },
        { label: 'Columns', href: './columns.html' },
        { label: 'CIR Journal &#8599;', href: 'https://cirjournal.cirbd.org', external: true },
      ],
    },
  ],

  // Entries offered by the search overlay.
  searchIndex: [
    { title: "Home", href: "./index.html" },
    { title: "MD Message", href: "./md_message.html" },
    { title: "What We Do", href: "./index.html#whatwedo" },
    { title: "Our Vision & Mission", href: "./index.html#whatwedo" },
    { title: "Our Team", href: "./our_team.html" },
    { title: "Book: Bangladesh-India Cross-Border Trade", href: "./book.html" },
    { title: "Journal Publications", href: "./journal.html" },
    { title: "Columns & Articles", href: "./columns.html" },
    { title: "News & Events", href: "./index.html#news-media" },
    { title: "CIR Journal (CJIAR)", href: "https://cirjournal.cirbd.org" },
    { title: "Contact Us", href: "./index.html#contact" },
    { title: "Gallery", href: "./gallery.html" },
    { title: "Posters", href: "./poster.html" },
    { title: "Training", href: "./training.html" },
    { title: "Technical Assistance", href: "./technical_assistance.html" },
    { title: "Market Analysis", href: "./market_analysis.html" },
    { title: "Surveys", href: "./surveys.html" },
    { title: "Research Evaluation", href: "./research_evaluation.html" },
    { title: "Innovation & Research Domain", href: "./innovation_and_research_domain.html" },
    { title: "Innovation & Development", href: "./innovation_and_development.html" },
  ],
};

// True on index.html (or the site root), where home-page sections can be linked by "#id" alone.
CIR.isHomePage = /(^|\/)(index\.html)?$/.test(location.pathname);

// Resolves a "#section" link to the home page when used on any other page.
CIR.link = function (href) {
  return href.startsWith('#') && !CIR.isHomePage ? './index.html' + href : href;
};
