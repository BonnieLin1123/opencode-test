(function () {
  "use strict";

  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const status = document.getElementById("filter-status");

  /**
   * Show only project cards whose data-tags include the selected tag.
   * Pass "all" to show every card again.
   */
  function applyFilter(tag) {
    let visibleCount = 0;
    cards.forEach(function (card) {
      const tags = (card.getAttribute("data-tags") || "").split(/\s+/);
      const show = tag === "all" || tags.indexOf(tag) !== -1;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    buttons.forEach(function (btn) {
      const isActive = btn.getAttribute("data-filter") === tag;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (status) {
      status.textContent = "Showing " + visibleCount + " project" +
        (visibleCount === 1 ? "" : "s") + " for tag \"" + tag + "\".";
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-filter"));
    });
    // Buttons handle Enter/Space natively; keep an explicit guard anyway.
    btn.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyFilter(btn.getAttribute("data-filter"));
      }
    });
  });

  // Ensure initial state matches the default "All" button.
  applyFilter("all");
})();
