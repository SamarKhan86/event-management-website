/**
 * WAYFARER - Theme Management Module
 * 
 * Manages switching between Dark Theme (primary, default)
 * and Light Parchment Theme (companion), with localStorage persistence.
 */

import { getStoredTheme, setStoredTheme } from "./storage.js";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";

/**
 * Returns current active theme.
 * @returns {'dark' | 'light'}
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") || THEME_DARK;
}

/**
 * Applies theme to the document and updates storage.
 * @param {'dark' | 'light'} theme 
 */
export function applyTheme(theme) {
  const chosenTheme = theme === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
  document.documentElement.setAttribute("data-theme", chosenTheme);
  setStoredTheme(chosenTheme);
  updateThemeToggleButtons(chosenTheme);
}

/**
 * Toggles between dark and light themes.
 * @returns {'dark' | 'light'} The newly active theme
 */
export function toggleTheme() {
  const current = getCurrentTheme();
  const nextTheme = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  applyTheme(nextTheme);
  return nextTheme;
}

/**
 * Updates UI state of any theme toggle buttons on the page.
 * @param {'dark' | 'light'} theme 
 */
function updateThemeToggleButtons(theme) {
  const toggles = document.querySelectorAll(".theme-toggle");
  toggles.forEach(toggle => {
    const isLight = theme === THEME_LIGHT;
    toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      isLight ? "Switch to Dark Theme" : "Switch to Light Parchment Theme"
    );
    toggle.setAttribute(
      "title",
      isLight ? "Switch to Dark Theme" : "Switch to Light Parchment Theme"
    );
  });
}

/**
 * Initializes theme system on page load.
 */
export function initTheme() {
  // Check stored preference or default to dark
  const stored = getStoredTheme();
  const initialTheme = stored === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
  applyTheme(initialTheme);

  // Attach event listener to theme toggle buttons
  const toggles = document.querySelectorAll(".theme-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggleTheme();
    });
  });
}
