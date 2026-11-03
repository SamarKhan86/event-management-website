/**
 * WAYFARER - Registration Handling Module
 * 
 * Manages form input, field-level error feedback, submit guards,
 * Local Storage persistence, and truthful confirmation display.
 */

import { validateName, validateEmail, validatePhone, validateRegistrationForm } from "../utils/validation.js";
import { saveRegistration, hasAlreadyRegisteredLocally } from "./storage.js";

/**
 * Initializes registration form behavior for a selected event.
 * 
 * @param {Object} eventRecord - The active event data record
 * @param {HTMLFormElement} formElement - The registration form DOM element
 * @param {HTMLElement} confirmationContainer - Container to show success confirmation
 */
export function initRegistrationForm(eventRecord, formElement, confirmationContainer) {
  if (!formElement || !eventRecord) return;

  const nameInput = formElement.querySelector("#participantName");
  const emailInput = formElement.querySelector("#email");
  const phoneInput = formElement.querySelector("#phone");
  const eventIdInput = formElement.querySelector("#eventId");
  const submitButton = formElement.querySelector("button[type='submit']");

  // Ensure hidden/disabled event ID field has correct value
  if (eventIdInput) {
    eventIdInput.value = eventRecord.id;
  }

  // Display selected event name label
  const selectedEventNameEl = document.querySelector("#selectedEventName");
  if (selectedEventNameEl) {
    selectedEventNameEl.textContent = eventRecord.displayTitle || eventRecord.title;
  }

  // Real-time blur validation for each field
  if (nameInput) {
    nameInput.addEventListener("blur", () => {
      const err = validateName(nameInput.value);
      showFieldError("participantName", err);
    });
    nameInput.addEventListener("input", () => {
      // Clear error as user types
      showFieldError("participantName", null);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      const err = validateEmail(emailInput.value);
      showFieldError("email", err);
    });
    emailInput.addEventListener("input", () => {
      showFieldError("email", null);
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", () => {
      const err = validatePhone(phoneInput.value);
      showFieldError("phone", err);
    });
    phoneInput.addEventListener("input", () => {
      showFieldError("phone", null);
    });
  }

  // Form submit handler
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      participantName: nameInput ? nameInput.value : "",
      email: emailInput ? emailInput.value : "",
      phone: phoneInput ? phoneInput.value : "",
      eventId: eventRecord.id
    };

    // Full validation
    const { isValid, errors } = validateRegistrationForm(formData);

    // Render all errors
    showFieldError("participantName", errors.participantName || null);
    showFieldError("email", errors.email || null);
    showFieldError("phone", errors.phone || null);

    if (!isValid) {
      // Focus first erroneous field
      if (errors.participantName && nameInput) nameInput.focus();
      else if (errors.email && emailInput) emailInput.focus();
      else if (errors.phone && phoneInput) phoneInput.focus();
      return;
    }

    // Check duplicate submission in local browser storage
    const alreadyRegistered = hasAlreadyRegisteredLocally(eventRecord.id, formData.email);

    // Duplicate submit guard: temporarily disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.innerHTML = `
        <span class="spinner" aria-hidden="true"></span>
        <span>Registering...</span>
      `;
    }

    // Simulate standard asynchronous submission delay (e.g. 400ms for realistic feedback)
    setTimeout(() => {
      const regId = "WAY-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      const submissionRecord = {
        id: regId,
        eventId: eventRecord.id,
        eventTitle: eventRecord.title,
        participantName: formData.participantName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        submittedAt: new Date().toISOString()
      };

      saveRegistration(submissionRecord);

      // Hide form and show confirmation
      formElement.classList.add("hidden");
      renderConfirmation(confirmationContainer, submissionRecord, eventRecord, alreadyRegistered);

      // Scroll confirmation smoothly into view
      if (confirmationContainer) {
        confirmationContainer.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || "Register Now";
      }
    }, 450);
  });
}

/**
 * Displays or removes error message for a specific input field.
 * @param {string} fieldId 
 * @param {string|null} errorMessage 
 */
function showFieldError(fieldId, errorMessage) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);

  if (!inputEl) return;

  if (errorMessage) {
    inputEl.classList.add("input-error");
    inputEl.setAttribute("aria-invalid", "true");
    if (errorEl) {
      errorEl.textContent = errorMessage;
      errorEl.classList.remove("hidden");
    }
  } else {
    inputEl.classList.remove("input-error");
    inputEl.removeAttribute("aria-invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
  }
}

/**
 * Renders rich accessible confirmation panel.
 * @param {HTMLElement} container 
 * @param {Object} record - Registration record
 * @param {Object} eventRecord - Event data
 * @param {boolean} isDuplicateNotice - Whether user registered previously with same email
 */
function renderConfirmation(container, record, eventRecord, isDuplicateNotice) {
  if (!container) return;

  const dateFormatted = new Date(record.submittedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const isKIIT = eventRecord.sourceType === "kiit-verified";

  container.innerHTML = `
    <div class="confirmation-card" role="alert" aria-live="polite">
      <div class="confirmation-header">
        <div class="confirmation-icon" aria-hidden="true">✓</div>
        <div class="confirmation-title-wrap">
          <span class="confirmation-badge">Registration Confirmed</span>
          <h3 class="confirmation-title">${escapeHtml(eventRecord.title)}</h3>
        </div>
      </div>

      ${isDuplicateNotice ? `
        <div class="notice-banner" role="status">
          <strong>Note:</strong> You have previously submitted a demo registration for this event with this email. A new entry has been recorded in your local browser history.
        </div>
      ` : ""}

      <div class="confirmation-details-grid">
        <div class="conf-item">
          <span class="conf-label">Registration ID</span>
          <span class="conf-value code-font">${record.id}</span>
        </div>
        <div class="conf-item">
          <span class="conf-label">Participant</span>
          <span class="conf-value">${escapeHtml(record.participantName)}</span>
        </div>
        <div class="conf-item">
          <span class="conf-label">Email Address</span>
          <span class="conf-value">${escapeHtml(record.email)}</span>
        </div>
        <div class="conf-item">
          <span class="conf-label">Contact Phone</span>
          <span class="conf-value">${escapeHtml(record.phone)}</span>
        </div>
        <div class="conf-item">
          <span class="conf-label">Event Date</span>
          <span class="conf-value">${eventRecord.date}${eventRecord.endDate ? ` – ${eventRecord.endDate}` : ""}</span>
        </div>
        <div class="conf-item">
          <span class="conf-label">Venue</span>
          <span class="conf-value">${escapeHtml(eventRecord.venue)}</span>
        </div>
      </div>

      <div class="confirmation-notice">
        <p><strong>Demonstration Note:</strong> This registration has been saved to your browser's Local Storage for evaluation of this web design project.</p>
        ${isKIIT ? `
          <p class="kiit-external-note">
            This is an official KIIT academic conference. For official participation, paper submissions, and university credentials, please visit the 
            <a href="${eventRecord.sourceUrl}" target="_blank" rel="noopener noreferrer" class="link-gold">Official KIIT Conference Portal ↗</a>.
          </p>
        ` : `
          <p class="demo-event-note">
            This is a fictional demonstration event curated for the WAYFARER design concept.
          </p>
        `}
      </div>

      <div class="confirmation-actions">
        <a href="index.html#eventsSection" class="btn btn-secondary">Explore More Events</a>
        <button type="button" class="btn btn-outline" id="registerAnotherBtn">Register Another Attendee</button>
      </div>
    </div>
  `;

  container.classList.remove("hidden");

  // Allow registering another person
  const registerAnotherBtn = container.querySelector("#registerAnotherBtn");
  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener("click", () => {
      const form = document.querySelector("#registrationForm");
      if (form) {
        form.reset();
        form.classList.remove("hidden");
      }
      container.classList.add("hidden");
      container.innerHTML = "";
    });
  }
}

/**
 * Basic HTML escaping helper to prevent XSS.
 * @param {string} str 
 * @returns {string}
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
