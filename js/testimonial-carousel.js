const testimonialsTrack = document.querySelector('#testimonialsTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

if (testimonialsTrack && testimonialCards.length && testimonialDots.length) {
  let scrollTimeout;

  function updateActiveDot(index) {
    testimonialDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;

      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function showTestimonial(index) {
    const card = testimonialCards[index];

    if (!card) return;

    testimonialsTrack.scrollTo({
      left: card.offsetLeft,
      behavior: 'smooth'
    });

    updateActiveDot(index);
  }

  testimonialDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showTestimonial(Number(dot.dataset.slide));
    });
  });

  testimonialsTrack.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const trackCenter =
        testimonialsTrack.scrollLeft + testimonialsTrack.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      testimonialCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(trackCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      updateActiveDot(closestIndex);
    }, 80);
  });
}