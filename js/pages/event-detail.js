/**
 * WAYFARER - Event Detail Controller (`js/pages/event-detail.js`)
 * 
 * Handles URL ID lookup, error state for missing/invalid events,
 * rich event presentation, countdown timer, and registration form integration.
 */

import { events } from "../data/events.js";
import { initRegistrationForm } from "../modules/registration.js";
import { initTheme } from "../modules/theme.js";
import { startCountdown } from "../modules/countdown.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();

  // Extract ID from URL parameters: event.html?id=<event-id>
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  if (!eventId) {
    renderNotFoundState("No event identifier was provided in the URL.");
    return;
  }

  const eventRecord = events.find(e => e.id === eventId);
  if (!eventRecord) {
    renderNotFoundState(`We could not find an event with ID "${escapeHtml(eventId)}".`);
    return;
  }

  // Event found: render page content
  renderEventDetail(eventRecord);
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
}

/**
 * Renders fallback view when an event cannot be found.
 * @param {string} message 
 */
function renderNotFoundState(message) {
  const container = document.querySelector("#eventDetailContainer");
  const registrationSection = document.querySelector("#registrationSection");

  if (registrationSection) {
    registrationSection.classList.add("hidden");
  }

  if (!container) return;

  container.innerHTML = `
    <div class="not-found-card" role="alert">
      <div class="not-found-icon" aria-hidden="true">⚠️</div>
      <h1 class="not-found-title">Event Not Found</h1>
      <p class="not-found-msg">${message}</p>
      <div class="not-found-actions">
        <a href="index.html#eventsSection" class="btn btn-primary">
          <span>Return to All Events</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  `;
}

/**
 * Renders complete event information and hooks registration.
 * @param {Object} eventRecord 
 */
function renderEventDetail(eventRecord) {
  document.title = `${eventRecord.title} — WAYFARER`;

  const container = document.querySelector("#eventDetailContainer");
  const form = document.querySelector("#registrationForm");
  const confirmationContainer = document.querySelector("#registrationConfirmation");

  if (!container) return;

  const isKIIT = eventRecord.sourceType === "kiit-verified";
  const dateFormatted = formatDateRange(eventRecord.date, eventRecord.endDate);

  container.innerHTML = `
    <!-- Top Return Bar -->
    <div class="detail-nav-bar">
      <a href="index.html#eventsSection" class="back-link">
        <span aria-hidden="true">←</span>
        <span>Back to Events Catalogue</span>
      </a>
      <div class="detail-badges">
        <span class="badge badge-category">${escapeHtml(eventRecord.category)}</span>
        <span class="badge ${isKIIT ? 'badge-kiit' : 'badge-concept'}">
          ${isKIIT ? 'KIIT LISTING' : 'K EXPLORE CONCEPT'}
        </span>
      </div>
    </div>

    <!-- Main Event Hero Banner -->
    <div class="detail-hero-card">
      <div class="detail-banner-wrap">
        <img 
          src="${eventRecord.image}" 
          alt="${escapeHtml(eventRecord.title)} presentation banner" 
          class="detail-banner-img ${isKIIT ? 'poster-fit' : ''}" 
        />
        <div class="detail-banner-overlay"></div>
      </div>

      <div class="detail-hero-content">
        <h1 class="detail-title">${escapeHtml(eventRecord.title)}</h1>

        <div class="detail-meta-list">
          <div class="detail-meta-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <div>
              <span class="meta-label">Date & Duration</span>
              <strong class="meta-value">${dateFormatted}</strong>
            </div>
          </div>

          <div class="detail-meta-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <span class="meta-label">Schedule</span>
              <strong class="meta-value">${eventRecord.startTime ? `${eventRecord.startTime}${eventRecord.endTime ? ` – ${eventRecord.endTime}` : ''}` : 'Full Day Session'}</strong>
            </div>
          </div>

          <div class="detail-meta-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
              <span class="meta-label">Venue</span>
              <strong class="meta-value">${escapeHtml(eventRecord.venue)}</strong>
            </div>
          </div>
        </div>

        <!-- Detail Actions -->
        <div class="detail-banner-actions">
          <a href="#registrationSection" class="btn btn-primary btn-lg">
            <span>Register for this Event</span>
            <span aria-hidden="true">↓</span>
          </a>
          ${isKIIT ? `
            <a href="${eventRecord.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg">
              <span>Official KIIT Portal ↗</span>
            </a>
          ` : ""}
        </div>
      </div>
    </div>

    <!-- Detail Two-Column Content Layout -->
    <div class="detail-layout-grid">
      <!-- Left Column: Overview and Narrative -->
      <div class="detail-main-column">
        <section class="detail-section">
          <h2 class="section-title-sm">About the Event</h2>
          <p class="detail-narrative">${escapeHtml(eventRecord.description)}</p>
        </section>

        ${isKIIT ? `
          <div class="kiit-provenance-box">
            <div class="provenance-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <h3>Official Academic Listing</h3>
            </div>
            <p>
              This conference is officially scheduled at Kalinga Institute of Industrial Technology (KIIT Deemed to be University), Bhubaneswar.
            </p>
            <p class="text-muted">
              Note: The registration form below stores a demonstration entry in your local browser for assignment evaluation. To submit papers, register as an official university delegate, or view faculty schedules, please consult the official portal.
            </p>
            <a href="${eventRecord.sourceUrl}" target="_blank" rel="noopener noreferrer" class="link-gold">
              Visit ${escapeHtml(eventRecord.title)} on KIIT.ac.in ↗
            </a>
          </div>
        ` : `
          <div class="concept-provenance-box">
            <div class="provenance-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <h3>K Explore Demonstration Concept</h3>
            </div>
            <p>
              This is a creative concept event curated to reflect the WAYFARER atmospheric theme. Dates, venues, and descriptions are sample content for demonstration purposes.
            </p>
          </div>
        `}
      </div>

      <!-- Right Column: Event Quick Facts & Countdown -->
      <aside class="detail-sidebar-column">
        <div class="detail-sidebar-card">
          <h3 class="sidebar-heading">Event Snapshot</h3>
          
          <div class="sidebar-fact-list">
            <div class="sidebar-fact">
              <span class="fact-label">Category</span>
              <span class="fact-value">${escapeHtml(eventRecord.category)}</span>
            </div>
            <div class="sidebar-fact">
              <span class="fact-label">Date</span>
              <span class="fact-value">${dateFormatted}</span>
            </div>
            <div class="sidebar-fact">
              <span class="fact-label">Time</span>
              <span class="fact-value">${eventRecord.startTime || 'Check Schedule'}</span>
            </div>
            <div class="sidebar-fact">
              <span class="fact-label">Venue</span>
              <span class="fact-value">${escapeHtml(eventRecord.venue)}</span>
            </div>
            <div class="sidebar-fact">
              <span class="fact-label">Status</span>
              <span class="fact-value text-accent">${eventRecord.registrationOpen ? 'Registration Active' : 'Closed'}</span>
            </div>
          </div>

          <hr class="sidebar-divider" />

          <div class="sidebar-countdown-section">
            <h4 class="sidebar-countdown-label">Time Remaining</h4>
            <div id="detailCountdown" class="detail-countdown-container"></div>
          </div>
        </div>
      </aside>
    </div>
  `;

  // Initialize countdown on detail page
  const countdownEl = document.querySelector("#detailCountdown");
  if (countdownEl) {
    startCountdown(eventRecord.date, eventRecord.startTime || "09:00", countdownEl);
  }

  // Initialize registration form
  initRegistrationForm(eventRecord, form, confirmationContainer);
}

/**
 * Formats start date and optional end date
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
    const month = startDate.toLocaleDateString("en-US", { month: "short" });
    return `${month} ${sD} – ${eD}, ${sY}`;
  }

  return `${startFormatted} – ${endFormatted}`;
}

/**
 * Basic HTML escaping helper to prevent XSS.
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
