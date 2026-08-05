// ---- Site-wide page chrome ----
// Two small always-on behaviors: capping every <audio> element's volume,
// and fading out the loading overlay once the page is fully loaded.

document.querySelectorAll("audio").forEach(function (audio) {
  audio.volume = 0.2;
});

// Waits for window 'load' (every image, audio tag, and external script has
// finished, not just the DOM) before fading the overlay out. Adds a small
// minimum-display floor so it doesn't just flash on fast connections.
(function handleLoadingOverlay() {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;

  const bar = overlay.querySelector(".loading-bar-fill");

  let progress = 0;

  const timer = setInterval(() => {
    // Slowly approach 90%
    progress += Math.random() * 6;

    if (progress > 90) progress = 90;

    bar.style.width = progress + "%";
  }, 120);

  function hideOverlay() {
    clearInterval(timer);

    // Fill to 100%
    bar.style.width = "100%";

    setTimeout(() => {
      overlay.classList.add("loaded");

      setTimeout(() => {
        overlay.remove();
      }, 400);
    }, 300);
  }

  if (document.readyState === "complete") {
    hideOverlay();
  } else {
    window.addEventListener("load", hideOverlay);
  }
})();
