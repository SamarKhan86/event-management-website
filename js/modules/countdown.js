/**
 * WAYFARER - Event Countdown Timer Module
 * 
 * Provides an accurate, accessible countdown timer for upcoming events.
 * Handles time calculation, active event state, past events, and timer cleanup.
 */

/**
 * Initializes a countdown timer inside a target container element.
 * 
 * @param {string} dateString - ISO date "YYYY-MM-DD"
 * @param {string} [timeString="09:00"] - Start time "HH:MM"
 * @param {HTMLElement} containerElement - Container to render timer
 * @returns {() => void} Cleanup function to stop interval
 */
export function startCountdown(dateString, timeString, containerElement) {
  if (!containerElement || !dateString) return () => {};

  // Construct target Date object in user's local timezone
  const [year, month, day] = dateString.split("-").map(Number);
  let hours = 9;
  let minutes = 0;
  if (timeString && timeString.includes(":")) {
    const parts = timeString.split(":").map(Number);
    hours = parts[0] || 0;
    minutes = parts[1] || 0;
  }

  const targetDate = new Date(year, month - 1, day, hours, minutes, 0);

  function update() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      // Event has arrived or concluded
      containerElement.innerHTML = `
        <div class="countdown-badge active-badge" role="status">
          <span class="pulse-dot"></span> Event in Progress / Today
        </div>
      `;
      return false; // Stop timer
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const remHours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const remMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remSeconds = Math.floor(totalSeconds % 60);

    containerElement.innerHTML = `
      <div class="countdown-grid" role="timer" aria-label="Countdown to event: ${days} days, ${remHours} hours, ${remMinutes} minutes, ${remSeconds} seconds">
        <div class="countdown-unit">
          <span class="countdown-num">${days}</span>
          <span class="countdown-lbl">Days</span>
        </div>
        <span class="countdown-sep" aria-hidden="true">:</span>
        <div class="countdown-unit">
          <span class="countdown-num">${String(remHours).padStart(2, "0")}</span>
          <span class="countdown-lbl">Hours</span>
        </div>
        <span class="countdown-sep" aria-hidden="true">:</span>
        <div class="countdown-unit">
          <span class="countdown-num">${String(remMinutes).padStart(2, "0")}</span>
          <span class="countdown-lbl">Mins</span>
        </div>
        <span class="countdown-sep" aria-hidden="true">:</span>
        <div class="countdown-unit">
          <span class="countdown-num">${String(remSeconds).padStart(2, "0")}</span>
          <span class="countdown-lbl">Secs</span>
        </div>
      </div>
    `;

    return true; // Keep ticking
  }

  // Initial render
  const shouldContinue = update();
  if (!shouldContinue) return () => {};

  const intervalId = setInterval(() => {
    const cont = update();
    if (!cont) clearInterval(intervalId);
  }, 1000);

  return () => clearInterval(intervalId);
}
