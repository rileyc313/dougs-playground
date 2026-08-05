// ---- On This Day in history ----
// Replaces the old random-facts ticker with real, dated historical events
// for today, pulled live from Wikipedia's public "On this day" API:
// https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/{month}/{day}
// No API key needed, CORS-enabled, safe to call straight from the browser.
//
// Caches the day's events in localStorage (keyed by date) so repeat visits
// / page navigations on the same day don't re-hit the API every time.

let onThisDayEvents = [];
let onThisDayIndex = 0;

function todayCacheKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `onThisDay:${now.getFullYear()}-${month}-${day}`;
}

function showOnThisDayEvent() {
  const factEl = document.getElementById("fact");
  if (!factEl) return;

  if (!onThisDayEvents.length) {
    factEl.textContent = "Loading today's history...";
    return;
  }

  const event = onThisDayEvents[onThisDayIndex];
  onThisDayIndex = (onThisDayIndex + 1) % onThisDayEvents.length;

  factEl.textContent = `${event.year}: ${event.text}`;
}

async function loadOnThisDayEvents() {
  const factEl = document.getElementById("fact");
  if (!factEl) return;

  const cacheKey = todayCacheKey();

  // Serve from cache if we already fetched today's events on a prior page.
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      onThisDayEvents = JSON.parse(cached);
      onThisDayIndex = 0;
      showOnThisDayEvent();
      return;
    } catch {
      // Bad cache entry, fall through to a fresh fetch.
    }
  }

  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`,
    );

    if (!response.ok) throw new Error(`Wikipedia API returned ${response.status}`);

    const data = await response.json();

    onThisDayEvents = (data.events || [])
      .filter((event) => event.text && event.year)
      .map((event) => ({ year: event.year, text: event.text }))
      .sort(() => Math.random() - 0.5);

    if (!onThisDayEvents.length) throw new Error("No events returned");

    localStorage.setItem(cacheKey, JSON.stringify(onThisDayEvents));

    onThisDayIndex = 0;
    showOnThisDayEvent();
  } catch (err) {
    console.error("On This Day fetch failed:", err);
    factEl.textContent = "Couldn't load today's history, try refreshing.";
  }
}

loadOnThisDayEvents();
setInterval(showOnThisDayEvent, 20000);