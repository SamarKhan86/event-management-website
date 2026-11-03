/**
 * WAYFARER - Form Validation Utilities
 * 
 * Provides beginner-friendly, robust client-side validation logic
 * for the event registration workflow.
 */

/**
 * Validates participant full name.
 * Rule: Required, trimmed, minimum 2 characters, no invalid control characters.
 * @param {string} name 
 * @returns {string|null} Error message or null if valid
 */
export function validateName(name) {
  if (!name || typeof name !== "string") {
    return "Please enter your full name.";
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return "Name must be at least 2 characters long.";
  }
  if (trimmed.length > 70) {
    return "Name must not exceed 70 characters.";
  }
  // Allow letters, spaces, hyphens, apostrophes, and periods
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-.]+$/;
  if (!nameRegex.test(trimmed)) {
    return "Name contains invalid characters. Please use letters and spaces.";
  }
  return null;
}

/**
 * Validates email address format.
 * Rule: Standard email pattern user@domain.tld
 * @param {string} email 
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== "string") {
    return "Please enter your email address.";
  }
  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return "Email address is required.";
  }
  // Standard permissive RFC-compliant email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address (e.g., alex@example.com).";
  }
  return null;
}

/**
 * Validates phone number.
 * Rule: Allows spaces, '+', '-', '(', ')'. Cleaned digits must be between 7 and 15 digits.
 * Supports standard Indian 10-digit numbers (+91...) and global phone numbers.
 * @param {string} phone 
 * @returns {string|null} Error message or null if valid
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== "string") {
    return "Please enter your contact phone number.";
  }
  const trimmed = phone.trim();
  if (trimmed.length === 0) {
    return "Phone number is required.";
  }
  // Check for allowed characters
  const allowedCharsRegex = /^[+\d\s().-]+$/;
  if (!allowedCharsRegex.test(trimmed)) {
    return "Phone number contains invalid characters.";
  }
  // Strip non-digit characters to count actual digits
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return "Please enter a valid phone number (7 to 15 digits).";
  }
  return null;
}

/**
 * Validates entire registration form payload.
 * @param {Object} data - { participantName, email, phone, eventId }
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateRegistrationForm(data) {
  const errors = {};

  const nameError = validateName(data.participantName);
  if (nameError) errors.participantName = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  if (!data.eventId || typeof data.eventId !== "string" || data.eventId.trim() === "") {
    errors.eventId = "No event selected. Please select an event to register.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
