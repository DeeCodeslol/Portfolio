// Scroll Indicator: hides the bouncing arrow once the user scrolls down
const indicator = document.querySelector(".scroll-indicator");

if (indicator) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
      indicator.classList.add("hidden");
    } else {
      indicator.classList.remove("hidden");
    }
  }, { passive: true });
}