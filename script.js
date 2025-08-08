// Theme toggle with localStorage
(function () {
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  const saved = localStorage.getItem("lumina-theme");
  if (saved === "light" || (!saved && prefersLight))
    document.body.classList.add("light");
})();

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "lumina-theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });
}

// Mobile nav toggle
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav-list");
if (hamburger && navList) {
  hamburger.addEventListener("click", () => {
    navList.closest(".site-nav").classList.toggle("open");
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// Pricing toggle monthly/yearly
const billingSwitch = document.getElementById("billingSwitch");
function updatePrices(yearly) {
  document.querySelectorAll(".price").forEach((el) => {
    const m = el.getAttribute("data-monthly");
    const y = el.getAttribute("data-yearly");
    const value = yearly && y ? y : m;
    el.innerHTML = "$" + value + "<span>/bln</span>";
  });
}
if (billingSwitch) {
  billingSwitch.addEventListener("change", (e) =>
    updatePrices(e.target.checked)
  );
  updatePrices(false);
}

// CTA form validation + store
const ctaForm = document.getElementById("ctaForm");
const formSuccess = document.getElementById("formSuccess");
if (ctaForm) {
  ctaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = ctaForm.name.value.trim();
    const email = ctaForm.email.value.trim();
    if (!name) {
      alert("Nama wajib diisi.");
      ctaForm.name.focus();
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Email tidak valid.");
      ctaForm.email.focus();
      return;
    }

    // Simulasi submit: simpan ke localStorage (untuk demo)
    const subscribers = JSON.parse(localStorage.getItem("lumina-subs") || "[]");
    subscribers.push({ name, email, ts: Date.now() });
    localStorage.setItem("lumina-subs", JSON.stringify(subscribers));

    ctaForm.reset();
    formSuccess.textContent = "Terima kasih! Pendaftaran Anda berhasil.";
    setTimeout(() => {
      formSuccess.textContent = "";
    }, 5000);
  });
}

// Back to top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (!backToTop) return;
  backToTop.style.opacity = window.scrollY > 600 ? "1" : "0.3";
});
if (backToTop) {
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

// Current year
const yy = document.getElementById("year");
if (yy) yy.textContent = new Date().getFullYear();
