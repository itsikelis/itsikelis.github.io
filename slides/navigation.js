// Switch between slides using the left/right arrow keys.
document.addEventListener('keydown', function(event) {
  // Get the current file name (e.g., "1.html")
  const path = window.location.pathname;
  const page = path.split("/").pop();

  // Extract the number from the file name
  const currentSlide = parseInt(page.replace('.html', '')) || 1;

  if (event.key === 'ArrowRight') {
    // Go to next slide
    window.location.href = (currentSlide + 1) + '.html';
  } else if (event.key === 'ArrowLeft') {
    // Go to previous slide (ensure we don't go below slide 1)
    if (currentSlide > 1) {
      window.location.href = (currentSlide - 1) + '.html';
    }
  }
});

// Trigger entrance animations when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const slide = document.querySelector('.slide');
  if (slide) {
    // A tiny delay ensures the browser registers the initial hidden state
    // before applying the active class, guaranteeing a smooth animation.
    setTimeout(() => {
      slide.classList.add('is-active');
    }, 50);
  }
});
