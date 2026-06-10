// Switch between slides or reveal steps using the left/right arrow keys.
document.addEventListener('keydown', function(event) {
  // Get the current file name (e.g., "1.html")
  const path = window.location.pathname;
  let page = path.split("/").pop();

  // Fallback to 1 if no page is specified in the URL
  if (!page || page === "") {
    page = "1.html";
  }

  // Extract the number from the file name
  const currentSlide = parseInt(page.replace('.html', '')) || 1;

  // Select all step elements on the current slide
  const steps = document.querySelectorAll('.hidden');
  const visibleSteps = document.querySelectorAll('.hidden.is-visible').length;

  if (event.key === 'ArrowRight') {
    if (visibleSteps < steps.length) {
      // Reveal the next step in the sequence
      steps[visibleSteps].classList.add('is-visible');
    } else {
      // Go to next slide if all steps are shown
      window.location.href = (currentSlide + 1) + '.html';
    }
  } else if (event.key === 'ArrowLeft') {
    if (visibleSteps > 0) {
      steps[visibleSteps - 1].classList.remove('is-visible');
    } else {
      // Go to previous slide (ensure we don't go below slide 1)
      if (currentSlide > 1) {
        window.location.href = (currentSlide - 1) + '.html';
      }
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
