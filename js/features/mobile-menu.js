/*
 * Mobile navigation: hamburger toggle and collapsible submenus (markup in <site-header>).
 */
(function () {
  // Smoothly expands/collapses an element by swapping max-height classes.
  function toggleCollapsible(el, openMaxHeightClass) {
    const opening = el.classList.contains('max-h-0');
    el.classList.toggle('max-h-0', !opening);
    el.classList.toggle(openMaxHeightClass, opening);
    return opening;
  }

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    const menuIcon = menuToggle.querySelector('i');
    menuToggle.addEventListener('click', () => {
      const opening = toggleCollapsible(mobileMenu, 'max-h-[1200px]');
      menuToggle.setAttribute('aria-expanded', String(opening));
      if (menuIcon) {
        menuIcon.classList.toggle('fa-bars', !opening);
        menuIcon.classList.toggle('fa-xmark', opening);
      }
    });
  }

  document.querySelectorAll('.toggle-submenu').forEach(button => {
    button.addEventListener('click', () => {
      const submenu = document.getElementById(button.getAttribute('data-target'));
      const opening = toggleCollapsible(submenu, 'max-h-[500px]');
      button.setAttribute('aria-expanded', String(opening));
    });
  });
})();
