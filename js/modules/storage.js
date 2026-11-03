/**
 * WAYFARER - Local Storage Wrapper Module
 * 
 * Safely persists and retrieves demo registration records and theme preferences.
 * 
 * IMPORTANT DEMO LIMITATION:
 * Local Storage persists data exclusively inside the visitor's local web browser.
 * It does NOT transmit records to an external server or event organiser.
 */

const THEME_STORAGE_KEY = "wayfarer_theme_v1";
const REGISTRATIONS_STORAGE_KEY = "wayfarer_registrations_v1";

/**
 * Checks whether localStorage is available and functioning.
 * @returns {boolean}
 */
export function isStorageAvailable() {
  try {
    const testKey = "__wayfarer_storage_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieves stored theme preference ('dark' | 'light' | null).
 * @returns {string|null}
 */
export function getStoredTheme() {
  if (!isStorageAvailable()) return null;
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch (e) {
    console.warn("Could not read theme from localStorage:", e);
    return null;
  }
}

/**
 * Persists theme preference to localStorage.
 * @param {'dark' | 'light'} theme 
 */
export function setStoredTheme(theme) {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.warn("Could not save theme to localStorage:", e);
  }
}

/**
 * Retrieves all saved demo registrations from localStorage.
 * @returns {Array<Object>}
 */
export function getSavedRegistrations() {
  if (!isStorageAvailable()) return [];
  try {
    const data = window.localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn("Failed to parse registrations from localStorage:", e);
    return [];
  }
}

/**
 * Saves a new registration record to localStorage.
 * @param {Object} registration - { id, eventId, participantName, email, phone, submittedAt }
 * @returns {boolean} True if successfully stored
 */
export function saveRegistration(registration) {
  if (!isStorageAvailable()) return false;
  try {
    const list = getSavedRegistrations();
    list.push(registration);
    window.localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error("Failed to save registration to localStorage:", e);
    return false;
  }
}

/**
 * Checks if a participant email has already submitted for this specific event in local demo storage.
 * @param {string} eventId 
 * @param {string} email 
 * @returns {boolean}
 */
export function hasAlreadyRegisteredLocally(eventId, email) {
  const list = getSavedRegistrations();
  const normalizedEmail = (email || "").trim().toLowerCase();
  return list.some(r => r.eventId === eventId && (r.email || "").trim().toLowerCase() === normalizedEmail);
}
