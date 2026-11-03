/**
 * WAYFARER - Search, Filter, and Sort Module
 * 
 * Provides pure filtering/sorting functions and UI coordination
 * for discovering events in the catalogue.
 */

/**
 * Filters a list of events according to search query and category.
 * 
 * @param {Array<Object>} events - Original events array
 * @param {Object} criteria
 * @param {string} [criteria.query] - Search term
 * @param {string} [criteria.category] - Category name or "all"
 * @param {string} [criteria.sort] - Sort criteria ("date-asc", "date-desc", "title-asc")
 * @returns {Array<Object>} Filtered and sorted events
 */
export function filterEvents(events, { query = "", category = "all", sort = "date-asc" } = {}) {
  const cleanQuery = (query || "").trim().toLowerCase();
  const cleanCategory = (category || "").trim().toLowerCase();

  let filtered = events.filter(event => {
    // Category match
    const categoryMatches = 
      cleanCategory === "all" || 
      cleanCategory === "" || 
      (event.discoveryCategory || event.category || "").toLowerCase() === cleanCategory;

    if (!categoryMatches) return false;

    // Search query match
    if (!cleanQuery) return true;

    const inTitle = (event.title || "").toLowerCase().includes(cleanQuery);
    const inDesc = (event.shortDescription || "").toLowerCase().includes(cleanQuery);
    const inFullDesc = (event.description || "").toLowerCase().includes(cleanQuery);
    const inVenue = (event.venue || "").toLowerCase().includes(cleanQuery);
    const inCat = `${event.category || ""} ${event.discoveryCategory || ""}`.toLowerCase().includes(cleanQuery);

    return inTitle || inDesc || inFullDesc || inVenue || inCat;
  });

  // Apply sorting
  filtered = sortEvents(filtered, sort);

  return filtered;
}

/**
 * Sorts events according to specified mode.
 * @param {Array<Object>} events 
 * @param {string} sortMode 
 * @returns {Array<Object>}
 */
export function sortEvents(events, sortMode = "date-asc") {
  const sorted = [...events];
  sorted.sort((a, b) => {
    if (sortMode === "date-desc") {
      return b.date.localeCompare(a.date);
    }
    if (sortMode === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    // Default: date-asc (chronological upcoming)
    return a.date.localeCompare(b.date);
  });
  return sorted;
}

/**
 * Extracts a list of unique categories from the events collection.
 * @param {Array<Object>} events 
 * @returns {Array<string>}
 */
export function getUniqueCategories(events) {
  const set = new Set();
  events.forEach(e => {
    if (e.discoveryCategory || e.category) set.add(e.discoveryCategory || e.category);
  });
  return Array.from(set).sort();
}
