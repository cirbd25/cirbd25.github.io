/*
 * Back-to-top button (markup in <site-footer>): shown after scrolling 400px.
 */
(function () {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  const updateBackToTop = () => {
    const show = window.scrollY > 400;
    backToTop.classList.toggle('opacity-0', !show);
    backToTop.classList.toggle('pointer-events-none', !show);
    backToTop.classList.toggle('translate-y-2', !show);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
