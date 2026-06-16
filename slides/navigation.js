// Helper functions for navigation logic
function navigateNext() {
  const path = window.location.pathname;
  let page = path.split("/").pop() || "1.html";
  const currentSlide = parseInt(page.replace('.html', '')) || 1;
  const steps = document.querySelectorAll('.hidden');
  const visibleSteps = document.querySelectorAll('.hidden.is-visible').length;

  if (visibleSteps < steps.length) {
    // Reveal the next step in the sequence
    steps[visibleSteps].classList.add('is-visible');
  } else {
    // Go to next slide if all steps are shown
    window.location.href = (currentSlide + 1) + '.html';
  }
}

function navigatePrev() {
  const path = window.location.pathname;
  let page = path.split("/").pop() || "1.html";
  const currentSlide = parseInt(page.replace('.html', '')) || 1;
  const steps = document.querySelectorAll('.hidden');
  const visibleSteps = document.querySelectorAll('.hidden.is-visible').length;

  if (visibleSteps > 0) {
    steps[visibleSteps - 1].classList.remove('is-visible');
  } else {
    // Go to previous slide (ensure we don't go below slide 1)
    if (currentSlide > 1) {
      window.location.href = (currentSlide - 1) + '.html';
    }
  }
}

// 1. Keyboard Navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    navigateNext();
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    navigatePrev();
  }
});

// 2. Swipe Navigation
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const SWIPE_THRESHOLD = 50; // Minimum pixel distance to register as a swipe

document.addEventListener('touchstart', function(event) {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;

  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Check if the swipe is mostly horizontal to ignore vertical scrolling
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
    if (deltaX < 0) {
      // Swiped Left (Pulling from the right -> Next)
      navigateNext();
    } else {
      // Swiped Right (Pulling from the left -> Previous)
      navigatePrev();
    }
  }
}

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
