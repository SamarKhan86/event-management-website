/**
 * WAYFARER - Homepage Controller (`js/pages/home.js`)
 * 
 * Orchestrates category browsing, featured event presentation,
 * live search, category filtering, sorting, and event card rendering.
 */

import { events } from "../data/events.js";
import { filterEvents, getUniqueCategories } from "../modules/search-filter.js";
import { initTheme } from "../modules/theme.js";
import { startCountdown } from "../modules/countdown.js";

// Active filter state
const state = {
  query: "",
  category: "all",
  sort: "date-asc"
};

// Map each category to an appropriate SVG line icon
const categoryIcons = {
  "Technology & Engineering": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`,
  "Technology & Society": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/></svg>`,
  "Digital Humanities": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  "Social Sciences": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  "Creative Technology": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  "Music": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  "Gaming & Interactive": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/></svg>`,
  "Anime & Film": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  "Japanese Pop Culture": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 0 20 7 7 0 0 0 0-20z"/></svg>`
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  renderCategoryGrid();
  renderFeaturedEvent();
  initSearchAndFilterControls();
  renderEvents();
});

/**
 * Mobile Navigation Drawer Setup
 */
function initMobileNav() {
  const toggleBtn = document.querySelector("#mobileNavToggle");
  const navMenu = document.querySelector("#primaryNav");
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("open");
  });

  // Close when clicking nav link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Renders the "Explore by Category" tiles
 */
function renderCategoryGrid() {
  const container = document.querySelector("#categoryGrid");
  if (!container) return;

  const categories = getUniqueCategories(events);
  
  // Count events in each category
  const counts = {};
  events.forEach(e => {
    counts[e.category] = (counts[e.category] || 0) + 1;
  });

  container.innerHTML = categories.map(cat => {
    const icon = categoryIcons[cat] || categoryIcons["Creative Technology"];
    const count = counts[cat] || 0;
    return `
      <button type="button" class="category-tile" data-category="${escapeHtml(cat)}">
        <span class="category-icon" aria-hidden="true">${icon}</span>
        <span class="category-label">${escapeHtml(cat)}</span>
        <span class="category-count">${count} ${count === 1 ? 'event' : 'events'}</span>
      </button>
    `;
  }).join("");

  // Attach click listener to each tile to filter events
  container.querySelectorAll(".category-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      const selectedCat = tile.getAttribute("data-category");
      setCategoryFilter(selectedCat);
      
      // Scroll to events section
      const eventsSection = document.querySelector("#eventsSection");
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/**
 * Renders the prominent Featured Event Hero Showcase
 */
function renderFeaturedEvent() {
  const container = document.querySelector("#featuredEventContent");
  if (!container) return;

  // Pick first featured event (ICAMME 2026 or The Last Checkpoint)
  const featured = events.find(e => e.id === "icamme-2026") || events.find(e => e.featured) || events[0];
  if (!featured) return;

  const isKIIT = featured.sourceType === "kiit-verified";
  const dateStr = formatDateRange(featured.date, featured.endDate);

  container.innerHTML = `
    <div class="featured-card">
      <div class="featured-image-wrap">
        <img 
          src="${featured.image}" 
          alt="${escapeHtml(featured.title)} poster" 
          class="featured-img ${isKIIT ? 'poster-fit' : ''}" 
          loading="lazy"
        />
        <div class="featured-image-overlay"></div>
      </div>
      <div class="featured-body">
        <div class="featured-top-meta">
          <span class="badge badge-category">${escapeHtml(featured.category)}</span>
          <span class="badge ${isKIIT ? 'badge-kiit' : 'badge-concept'}">
            ${isKIIT ? 'KIIT LISTING' : 'K EXPLORE CONCEPT'}
          </span>
        </div>
        <h3 class="featured-title">
          <a href="event.html?id=${featured.id}">${escapeHtml(featured.title)}</a>
        </h3>
        <p class="featured-desc">${escapeHtml(featured.shortDescription)}</p>
        
        <div class="featured-meta-row">
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${dateStr}</span>
          </div>
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${escapeHtml(featured.venue)}</span>
          </div>
        </div>

        <div class="featured-countdown-wrap">
          <div class="countdown-title">Countdown to Commencement</div>
          <div id="featuredCountdown" class="featured-countdown"></div>
        </div>

        <div class="featured-actions">
          <a href="event.html?id=${featured.id}" class="btn btn-primary">
            <span>View Details & Register</span>
            <span aria-hidden="true">→</span>
          </a>
          ${isKIIT ? `
            <a href="${featured.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <span>Official KIIT Page ↗</span>
            </a>
          ` : ""}
        </div>
      </div>
    </div>
  `;

  // Start live countdown timer
  const timerContainer = document.querySelector("#featuredCountdown");
  if (timerContainer) {
    startCountdown(featured.date, featured.startTime || "08:00", timerContainer);
  }
}

/**
 * Initializes Search, Category dropdown, and Sort controls
 */
function initSearchAndFilterControls() {
  const searchInput = document.querySelector("#searchInput");
  const categorySelect = document.querySelector("#categorySelect");
  const sortSelect = document.querySelector("#sortSelect");
  const resetBtn = document.querySelector("#resetFiltersBtn");

  // Populate category select options
  if (categorySelect) {
    const categories = getUniqueCategories(events);
    categorySelect.innerHTML = `
      <option value="all">All Categories</option>
      ${categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}
    `;

    categorySelect.addEventListener("change", (e) => {
      state.category = e.target.value;
      renderEvents();
    });
  }

  // Live search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.query = e.target.value;
      renderEvents();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderEvents();
    });
  }

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetFilters();
    });
  }
}

/**
 * Programmatically updates category filter (e.g. from category tile click)
 */
function setCategoryFilter(category) {
  state.category = category;
  const categorySelect = document.querySelector("#categorySelect");
  if (categorySelect) {
    categorySelect.value = category;
  }
  renderEvents();
}

/**
 * Resets search, category, and sort to defaults
 */
function resetFilters() {
  state.query = "";
  state.category = "all";
  state.sort = "date-asc";

  const searchInput = document.querySelector("#searchInput");
  if (searchInput) searchInput.value = "";

  const categorySelect = document.querySelector("#categorySelect");
  if (categorySelect) categorySelect.value = "all";

  const sortSelect = document.querySelector("#sortSelect");
  if (sortSelect) sortSelect.value = "date-asc";

  renderEvents();
}

/**
 * Renders the filtered events grid and updates result counts
 */
function renderEvents() {
  const grid = document.querySelector("#eventsGrid");
  const countLabel = document.querySelector("#resultsCount");
  const emptyState = document.querySelector("#emptyState");

  if (!grid) return;

  const filtered = filterEvents(events, state);

  // Update count indicator
  if (countLabel) {
    const isFiltered = state.query.trim() !== "" || state.category !== "all";
    if (isFiltered) {
      countLabel.textContent = `Showing ${filtered.length} of ${events.length} events`;
    } else {
      countLabel.textContent = `Showing all ${events.length} upcoming events`;
    }
  }

  // Handle empty state
  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (emptyState) {
      emptyState.classList.remove("hidden");
    }
    return;
  }

  if (emptyState) {
    emptyState.classList.add("hidden");
  }

  // Render cards
  grid.innerHTML = filtered.map(item => {
    const isKIIT = item.sourceType === "kiit-verified";
    const dateFormatted = formatDateRange(item.date, item.endDate);

    return `
      <article class="event-card" data-id="${item.id}">
        <div class="card-media">
          <img 
            src="${item.image}" 
            alt="${escapeHtml(item.title)} poster" 
            class="card-img ${isKIIT ? 'poster-fit' : ''}" 
            loading="lazy"
          />
          <div class="card-badges">
            <span class="badge badge-category">${escapeHtml(item.category)}</span>
            <span class="badge ${isKIIT ? 'badge-kiit' : 'badge-concept'}">
              ${isKIIT ? 'KIIT LISTING' : 'K EXPLORE CONCEPT'}
            </span>
          </div>
        </div>

        <div class="card-content">
          <div class="card-meta">
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>${dateFormatted}</span>
            </div>
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${escapeHtml(item.venue)}</span>
            </div>
          </div>

          <h3 class="card-title">
            <a href="event.html?id=${item.id}">${escapeHtml(item.title)}</a>
          </h3>

          <p class="card-desc">${escapeHtml(item.shortDescription)}</p>

          <div class="card-footer">
            <a href="event.html?id=${item.id}" class="card-cta" aria-label="View details for ${escapeHtml(item.title)}">
              <span>View Details</span>
              <span class="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Formats start date and optional end date into human-readable range
 * e.g., "Dec 4 – Dec 5, 2026"
 */
function formatDateRange(startDateStr, endDateStr) {
  if (!startDateStr) return "";
  const [sY, sM, sD] = startDateStr.split("-").map(Number);
  const startDate = new Date(sY, sM - 1, sD);

  const startFormatted = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  if (!endDateStr) {
    return startFormatted;
  }

  const [eY, eM, eD] = endDateStr.split("-").map(Number);
  const endDate = new Date(eY, eM - 1, eD);

  const endFormatted = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  if (sY === eY && sM === eM) {
    // Same month, e.g. "Dec 4 – 5, 2026"
    const month = startDate.toLocaleDateString("en-US", { month: "short" });
    return `${month} ${sD} – ${eD}, ${sY}`;
  }

  return `${startFormatted} – ${endFormatted}`;
}

/**
 * Escapes HTML characters to prevent XSS injection
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
