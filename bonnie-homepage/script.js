(function () {
  "use strict";

  /* ---------- Theme switch ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
      themeToggle.setAttribute("aria-pressed", "true");
      themeToggle.setAttribute("aria-label", "Switch to light mode");
      themeToggle.textContent = "☀️";
    } else {
      htmlElement.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-pressed", "false");
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
      themeToggle.textContent = "🌙";
    }
  }

  function loadTheme() {
    let theme = getSystemTheme();
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        theme = stored;
      }
    } catch (e) {
      // localStorage blocked; fall back to system preference
    }
    applyTheme(theme);
  }

  themeToggle.addEventListener("click", function () {
    const isDark = htmlElement.hasAttribute("data-theme");
    const next = isDark ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // localStorage blocked; still toggle the UI
    }
    applyTheme(next);
  });

  loadTheme();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Project filter ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  function applyFilter(category) {
    let visibleCount = 0;

    projectCards.forEach(function (card) {
      const show =
        category === "all" ||
        card.getAttribute("data-category") === category;
      card.hidden = !show;
      if (show) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach(function (btn) {
      const isActive = btn.getAttribute("data-category") === category;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-category"));
    });
    // Explicit keyboard guard; buttons also respond natively to Enter/Space.
    btn.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyFilter(btn.getAttribute("data-category"));
      }
    });
  });

  applyFilter("all");

  /* ---------- Expandable pet details ---------- */
  const expandButtons = document.querySelectorAll(".expand-btn");

  expandButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const next = !expanded;
      btn.setAttribute("aria-expanded", String(next));

      const detailsId = btn.getAttribute("aria-controls");
      const details = document.getElementById(detailsId);
      if (details) {
        details.hidden = !next;
      }
    });
    // Explicit keyboard guard; buttons also respond natively to Enter/Space.
    btn.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        btn.click();
      }
    });
  });
})();
