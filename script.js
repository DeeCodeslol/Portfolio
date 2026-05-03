// Auto-update copyright year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Nav: add shadow on scroll
const header = document.querySelector(".header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });
}

// Scroll indicator: hide once user scrolls
const indicator = document.querySelector(".scroll-indicator");
if (indicator) {
  window.addEventListener("scroll", () => {
    indicator.classList.toggle("hidden", window.scrollY > 50);
  }, { passive: true });
}

// Scroll reveal: fade-up elements as they enter the viewport
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => observer.observe(el));
}

// Cursor-following background blob
(function () {
  const blob = document.createElement("div");
  blob.classList.add("cursor-blob");
  document.body.appendChild(blob);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let blobX = mouseX;
  let blobY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function tick() {
    blobX += (mouseX - blobX) * 0.07;
    blobY += (mouseY - blobY) * 0.07;
    blob.style.left = blobX + "px";
    blob.style.top  = blobY + "px";
    requestAnimationFrame(tick);
  }
  tick();
})();

// Cursor sparkle trail
(function () {
  const COLORS = ["#86efac", "#c4b5fd", "#fde68a", "#67e8f9", "#f9a8d4", "#bbf7d0"];
  let lastSpawn = 0;

  function spawnParticle(cx, cy) {
    const el = document.createElement("span");
    el.classList.add("cursor-particle");
    const size = 5 + Math.random() * 7;
    const tx = (Math.random() - 0.5) * 48;
    const ty = -18 - Math.random() * 32;
    el.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `background:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
      `--ox:${cx - size / 2}px`,
      `--oy:${cy - size / 2}px`,
      `--tx:${tx}px`,
      `--ty:${ty}px`,
    ].join(";");
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSpawn < 55) return;
    lastSpawn = now;
    spawnParticle(e.clientX, e.clientY);
  });
})();
