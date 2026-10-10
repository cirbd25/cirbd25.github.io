/*
 * Home page hero slideshow (#hero-slideshow): auto-advances every 5s,
 * with prev/next arrows and dot indicators; pauses while hovered.
 */
(function () {
  const slideshow = document.getElementById('hero-slideshow');
  if (!slideshow) return;

  let currentSlide = 0;
  const slides = slideshow.querySelectorAll('.slide');
  const indicators = slideshow.querySelectorAll('.slide-indicator');
  let slideshowInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'pointer-events-none');
        slide.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        slide.classList.remove('opacity-100', 'pointer-events-auto');
        slide.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.remove('bg-white/40');
        indicator.classList.add('bg-white', 'scale-125');
      } else {
        indicator.classList.remove('bg-white', 'scale-125');
        indicator.classList.add('bg-white/40');
      }
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
    }
  }

  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlideshow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlideshow();
    });
  }

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      showSlide(parseInt(indicator.getAttribute('data-slide'), 10));
      startSlideshow();
    });
  });

  // Start on load, pause while hovered
  showSlide(0);
  startSlideshow();
  slideshow.addEventListener('mouseenter', stopSlideshow);
  slideshow.addEventListener('mouseleave', startSlideshow);
})();
