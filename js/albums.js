// ---- Album browser + mini music player ----
// Powers the "Top 3 Albums" home widget and the full album grid + A-Z
// filter on the music page, plus the per-card mini audio player.
// Everything here is guarded on the container elements, so it's safe to
// include on any page; it just won't render anything if #top-3-albums,
// #all-albums-grid, or #alphabet-filter aren't present.
//
// WHERE THIS GOES: homepage (for the Top 3 widget) and your music/albums
// page (for the full grid + filter). No other page needs it.

const ROOT =
  typeof window !== "undefined" && window.SITE_ROOT ? window.SITE_ROOT : "../";

const allTrackPlayers = [];

let currentLetterFilter = null;

// Each album can carry its own playable "tracks" list.
// Format matches player.js's track_list schema:
//   { name: ..., artist: ..., path: ... }
// Leave the array empty ([]) if you haven't got songs for that album yet —
// the mini player just won't render for that card until you do.
//
// NOTE: cover/track paths are ROOT-RELATIVE (no leading "../") — the ROOT
// constant above gets prepended at render time so these resolve correctly
// regardless of how deep the current page sits.
const albums = [
  {
    cover: "img/albums/whatliesaheadofme.jpg",
    artist: "All Under Heaven",
    title: "What Lies Ahead of Me",
    runtime: "32 Minutes",
    genres: "Alternative rock, indie rock, shoegaze",
    topTrack: "Receiving Certain Answers",
    color: "#7D3B47",
    tracks: [
      {
        name: "All Under Heaven",
        artist: "Receiving Certain Answers",
        path: "audio/toptracks/All Under Heaven - Receiving Certain Answers.mp3",
      },
    ],
  },
  {
    cover: "img/albums/muchlove.jpg",
    artist: "Microwave",
    title: "Much Love",
    runtime: "38 Minutes",
    genres: "Alternative rock, indie rock",
    topTrack: "Whimper",
    color: "#833B29",
    tracks: [
      {
        name: "Microwave",
        artist: "Whimper",
        path: "audio/toptracks/Microwave - Whimper.mp3",
      },
    ],
  },
  {
    cover: "img/albums/youdpreferanastronaut.jpg",
    artist: "HUM",
    title: "You'd Prefer an Astronaut",
    runtime: "46 Minutes",
    genres: "Punk",
    topTrack: "The Pod",
    color: "#236B2C",
    tracks: [
      {
        name: "HUM",
        artist: "The Pod",
        path: "audio/toptracks/HUM - The Pod.mp3",
      },
    ],
  },
  {
    cover: "img/albums/shed.jpg",
    artist: "Title Fight",
    title: "Shed",
    runtime: "27 Minutes",
    genres: "Punk, Alternative Rock, Indie Rock",
    topTrack: "27",
    color: "#045ED8",
    tracks: [
      {
        name: "Title Fight",
        artist: "27",
        path: "audio/toptracks/Title Fight - 27.mp3",
      },
    ],
  },
  {
    cover: "img/albums/floralgreen.jpg",
    artist: "Title Fight",
    title: "Floral Green",
    runtime: "32 Minutes",
    genres: "Punk, Alternative Rock, Indie Rock",
    topTrack: "Make You Cry",
    color: "#0C3441",
    tracks: [
      {
        name: "Title Fight",
        artist: "Make You Cry",
        path: "audio/toptracks/Title Fight - Make You Cry.mp3",
      },
    ],
  },
  {
    cover: "img/albums/inlet.jpg",
    artist: "HUM",
    title: "Inlet",
    runtime: "55 Minutes",
    genres: "Rock, Progressive Rock",
    topTrack: "The Summoning",
    color: "#504D6C",
    tracks: [
      {
        name: "HUM",
        artist: "The Summoning",
        path: "audio/toptracks/HUM - The Summoning.mp3",
      },
    ],
  },
  {
    cover: "img/albums/betweentherichness.jpg",
    artist: "Fiddlehead",
    title: "Between The Richness",
    runtime: "25 Minutes",
    genres: "Alternative Rock, Indie Rock",
    topTrack: "Heart To Heart",
    color: "#2F6B81",
    tracks: [
      {
        name: "Fiddlehead",
        artist: "Heart To Heart",
        path: "audio/toptracks/Fiddlehead - Heart To Heart.mp3",
      },
    ],
  },
  {
    cover: "img/albums/superheaven.jpg",
    artist: "Superheaven",
    title: "Superheaven",
    runtime: "31 Minutes",
    genres: "Metal, Alternative Rock, Rock",
    topTrack: "Long Gone",
    color: "#5A251F",
    tracks: [
      {
        name: "Superheaven",
        artist: "Long Gone",
        path: "audio/toptracks/Superheaven - Long Gone.mp3",
      },
    ],
  },
  {
    cover: "img/albums/jar.jpg",
    artist: "Superheaven",
    title: "Jar",
    runtime: "41 Minutes",
    genres: "Alternative Rock, Rock, Indie Rock",
    topTrack: "Around The Railing",
    color: "#3C7096",
    tracks: [
      {
        name: "Superheaven",
        artist: "Around The Railing",
        path: "audio/toptracks/Superheaven - Around The Railing.mp3",
      },
    ],
  },
  {
    cover: "img/albums/stovall.jpg",
    artist: "Microwave",
    title: "Stovall",
    runtime: "38 Minutes",
    genres: "Alternative Rock, Rock, Indie Rock",
    topTrack: "Something Right",
    color: "#514C11",
    tracks: [
      {
        name: "Microwave",
        artist: "Something Right",
        path: "audio/toptracks/Microwave - Something Right.mp3",
      },
    ],
  },
  {
    cover: "img/albums/promiseeverything.jpg",
    artist: "Basement",
    title: "Promise Everything",
    runtime: "28 Minutes",
    genres: "Alternative Rock, Rock, Indie Rock",
    topTrack: "For You The Moon",
    color: "#3D5672",
    tracks: [
      {
        name: "Basement",
        artist: "For You The Moon",
        path: "audio/toptracks/Basement - For You The Moon.mp3",
      },
    ],
  },
  {
    cover: "img/albums/besidemyself.jpg",
    artist: "Basement",
    title: "Beside Myself",
    runtime: "38 Minutes",
    genres: "Post-grunge, Alternative Rock, Indie Rock",
    topTrack: "Nothing Left",
    color: "#042750",
    tracks: [
      {
        name: "Basement",
        artist: "Nothing Left",
        path: "audio/toptracks/Basement - Nothing Left.mp3",
      },
    ],
  },
  {
    cover: "img/albums/colourmeinkindness.jpg",
    artist: "Basement",
    title: "Colourmeinkindness",
    runtime: "33 Minutes",
    genres: "Post-grunge, Alternative Rock, Indie Rock",
    topTrack: "Comfort",
    color: "#75410E",
    tracks: [
      {
        name: "Basement",
        artist: "Comfort",
        path: "audio/toptracks/Basement - Comfort.mp3",
      },
    ],
  },
  {
    cover: "img/albums/youth.jpg",
    artist: "Citizen",
    title: "Youth",
    runtime: "30 Minutes",
    genres: "Post-grunge, Alternative Rock, Indie Rock",
    topTrack: "The Summer",
    color: "#950B0D",
    tracks: [
      {
        name: "Citizen",
        artist: "The Summer",
        path: "audio/toptracks/Citizen - The Summer.mp3",
      },
    ],
  },
  {
    cover: "img/albums/solongforever.jpg",
    artist: "Palace",
    title: "So Long Forever",
    runtime: "42 Minutes",
    genres: "Indie Rock, Feel-good",
    topTrack: "It's Over",
    color: "#1E7450",
    tracks: [
      {
        name: "Palace",
        artist: "It's Over",
        path: "audio/toptracks/Palace - It's Over.mp3",
      },
    ],
  },
  {
    cover: "img/albums/iletitinandittookeverything.jpg",
    artist: "Loathe",
    title: "I Let It In And It Took Everything",
    runtime: "49 Minutes",
    genres: "Metal, Hard Rock, Rock",
    topTrack: "A Sad Cartoon",
    color: "#000000",
    tracks: [
      {
        name: "Loathe",
        artist: "A Sad Cartoon",
        path: "audio/toptracks/Loathe - A Sad Cartoon.mp3",
      },
    ],
  },
  {
    cover: "img/albums/werenotheretobeloved.jpeg",
    artist: "Fleshwater",
    title: "We're Not Here to Be Loved",
    runtime: "27 Minutes",
    genres: "Hard Rock, Indie Rock",
    topTrack: "Linda Claire",
    color: "#654615",
    tracks: [
      {
        name: "Fleshwater",
        artist: "Linda Claire",
        path: "audio/toptracks/Fleshwater - Linda Claire.mp3",
      },
    ],
  },
  {
    cover: "img/albums/peoplewatching.jpg",
    artist: "156/Silence",
    title: "People Watching",
    runtime: "46 Minutes",
    genres: "Metal, Hard Rock",
    topTrack: "Target Acquired",
    color: "#84561F",
    tracks: [
      {
        name: "156/Silence",
        artist: "Target Acquired",
        path: "audio/toptracks/156Silence - Target Acquired.mp3",
      },
    ],
  },
  {
    cover: "img/albums/thefearoffear.png",
    artist: "Spiritbox",
    title: "The Fear of Fear",
    runtime: "25 Minutes",
    genres: "Metal, Hard Rock",
    topTrack: "Too Close/Too Late",
    color: "#402A47",
    tracks: [
      {
        name: "Spiritbox",
        artist: "Too Close/Too Late",
        path: "audio/toptracks/Spiritbox - Too Close Too Late.mp3",
      },
    ],
  },
  {
    cover: "img/albums/yunemogarden.jpg",
    artist: "Last Dinosaurs",
    title: "Yunemo Garden",
    runtime: "37 Minutes",
    genres: "Indie Pop, Bedroom Pop",
    topTrack: "Bass God",
    color: "#3D4F90",
    tracks: [
      {
        name: "Last Dinosaurs",
        artist: "Bass God",
        path: "audio/toptracks/Last Dinosaurs - Bass God.mp3",
      },
    ],
  },
  {
    cover: "img/albums/nownotyet.jpg",
    artist: "half•alive",
    title: "Now, Not Yet",
    runtime: "41 Minutes",
    genres: "Indie Pop, Bedroom Pop",
    topTrack: "Arrow",
    color: "#7F2F1D",
    tracks: [
      {
        name: "half•alive",
        artist: "Arrow",
        path: "audio/toptracks/halfalive - arrow.mp3",
      },
    ],
  },
  {
    cover: "img/albums/invitationtohers.jpg",
    artist: "Her's",
    title: "Invitation To Her's",
    runtime: "45 Minutes",
    genres: "Indie Pop, Bedroom Pop, Feel-good",
    topTrack: "Under Wraps",
    color: "#982A73",
    tracks: [
      {
        name: "Her's",
        artist: "Under Wraps",
        path: "audio/toptracks/Her's - Under Wraps.mp3",
      },
    ],
  },
  {
    cover: "img/albums/songsofhers.jpg",
    artist: "Her's",
    title: "Songs of Her's",
    runtime: "34 Minutes",
    genres: "Indie Pop, Bedroom Pop, Feel-good",
    topTrack: "Dorothy",
    color: "#992266",
    tracks: [
      {
        name: "Her's",
        artist: "Dorothy",
        path: "audio/toptracks/Her's - Dorothy.mp3",
      },
    ],
  },
  {
    cover: "img/albums/instantgratification.jpg",
    artist: "Dance Gavin Dance",
    title: "Instant Gratification",
    runtime: "42 Minutes",
    genres: "Post-hardcore, Alt Rock",
    topTrack: "Stroke God, Millionaire",
    color: "#6E432E",
    tracks: [
      {
        name: "Dance Gavin Dance",
        artist: "Stroke God, Millionaire",
        path: "audio/toptracks/Dance Gavin Dance - Stroke God, Millionaire.mp3",
      },
    ],
  },
  {
    cover: "img/albums/astrangertoyou.jpg",
    artist: "Loathe",
    title: "A Stranger To You",
    runtime: "55 Minutes",
    genres: "Metal, Metal-core",
    topTrack: "Harder To Pretend",
    color: "#3D4746",
    tracks: [
      {
        name: "Loathe",
        artist: "Harder To Pretend",
        path: "audio/toptracks/Loathe -  Harder to Pretend.mp3",
      },
    ],
  },
];

// ---- Mini music player (per album card) ----
// Scoped per-instance so multiple players can exist on the page
// at once without stepping on each other's state, and without
// colliding with the global player wired up in player.js.
// Each instance registers its audio + pause callback in allTrackPlayers
// so playing one can stop every other one currently playing.

function trackPlayerHTML() {
  return `
    <div class="player-flex album-player" style="padding-bottom: 10px;">
      <div class="player-main">
        <select disabled class="track-select"></select>
        <div class="controls">
          <div class="seeking">
            <div style="font-family: 'Dogica'; font-size: 7px;" class="current-time">0:00</div>
            <input type="range" min="1" max="100" value="0" class="seek_slider">
            <div style="font-family: 'Dogica'; font-size: 7px;" class="total-duration">0:00</div>
          </div>
          <div class="player-buttons">
            <button class="window-button playpause-track" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003
              3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <audio></audio>
  `;
}

function createTrackPlayer(container, tracks) {
  if (!container || !tracks || !tracks.length) return;

  const trackSelect = container.querySelector(".track-select");
  const playpauseBtn = container.querySelector(".playpause-track");
  const seekSlider = container.querySelector(".seek_slider");
  const currTimeEl = container.querySelector(".current-time");
  const totalDurationEl = container.querySelector(".total-duration");
  const audio = container.querySelector("audio");

  if (
    !trackSelect ||
    !playpauseBtn ||
    !seekSlider ||
    !currTimeEl ||
    !totalDurationEl ||
    !audio
  )
    return;

  audio.volume = 0.2;

  let trackIndex = 0;
  let isPlaying = false;
  let updateTimer;

  const playerEntry = {
    audio: audio,
    pause: function () {
      pauseTrack();
    },
  };
  allTrackPlayers.push(playerEntry);

  function populateDropdown() {
    trackSelect.innerHTML = "";
    tracks.forEach((track, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${track.name} — ${track.artist}`;
      trackSelect.appendChild(option);
    });
    trackSelect.value = trackIndex;
  }

  function resetValues() {
    currTimeEl.textContent = "0:00";
    totalDurationEl.textContent = "0:00";
    seekSlider.value = 0;
  }

  function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    audio.src = ROOT + tracks[index].path;
    audio.load();

    updateTimer = setInterval(seekUpdate, 1000);
    trackSelect.value = index;
  }

  function playTrack() {
    allTrackPlayers.forEach((entry) => {
      if (entry.audio !== audio && !entry.audio.paused) {
        entry.pause();
      }
    });

    audio.play();
    isPlaying = true;
    playpauseBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-pause-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playpauseBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-play-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003
      3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;
  }

  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }

  function nextTrack() {
    trackIndex = trackIndex < tracks.length - 1 ? trackIndex + 1 : 0;
    loadTrack(trackIndex);
    playTrack();
  }

  function seekTo() {
    if (isNaN(audio.duration)) return;
    const seekto = audio.duration * (seekSlider.value / 100);
    audio.currentTime = seekto;
  }

  function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(audio.duration)) {
      seekPosition = audio.currentTime * (100 / audio.duration);
      seekSlider.value = seekPosition;

      let currentMinutes = Math.floor(audio.currentTime / 60);
      let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audio.duration / 60);
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

      if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
      if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

      currTimeEl.textContent = currentMinutes + ":" + currentSeconds;
      totalDurationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  trackSelect.addEventListener("change", function () {
    trackIndex = parseInt(this.value, 10);
    loadTrack(trackIndex);
    playTrack();
  });

  playpauseBtn.addEventListener("click", playpauseTrack);
  seekSlider.addEventListener("change", seekTo);
  audio.addEventListener("ended", nextTrack);

  populateDropdown();
  loadTrack(trackIndex);
}

function buildAlbumCard(album) {
  const albumEl = document.createElement("div");
  albumEl.className = "album";
  albumEl.innerHTML = `
    <img class="album-cover" src="${ROOT}${album.cover}">
    <p>Artist: <span style="color:${album.color}">${album.artist}</span></p>
    <p>Title: <span style="color:${album.color}">${album.title}</span></p>
    <p>Runtime: <span style="color:${album.color}">${album.runtime}</span></p>
    <p>Genre(s): <span style="color:${album.color}">${album.genres}</span></p>
    ${album.tracks && album.tracks.length ? trackPlayerHTML() : ""}
  `;

  if (album.tracks && album.tracks.length) {
    createTrackPlayer(albumEl, album.tracks);
  }

  return albumEl;
}

function renderTopAlbums() {
  const container = document.getElementById("top-3-albums");
  if (!container) return;

  container.innerHTML = "";

  const onRepeatAlbum = albums.find((album) => album.artist === "Loathe" && album.title === "A Stranger To You");

  if (onRepeatAlbum) {
    container.appendChild(buildAlbumCard(onRepeatAlbum));
  }
}

function getFilterLetter(artist) {
  let name = artist.trim();
  name = name.replace(/^the\s+/i, "");
  const firstChar = name.charAt(0).toUpperCase();
  return /^[A-Z]$/.test(firstChar) ? firstChar : "#";
}

function renderAlphabetFilter() {
  const container = document.getElementById("alphabet-filter");
  if (!container) return;

  const letters = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  container.innerHTML = letters
    .map(
      (letter) => `
    <button type="button" class="window-button letter-btn" data-letter="${letter}">${letter}</button>
  `,
    )
    .join("");

  container.querySelectorAll(".letter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const letter = btn.dataset.letter;
      currentLetterFilter = currentLetterFilter === letter ? null : letter;
      updateLetterButtonStates();
      renderAllAlbums();
    });
  });

  updateLetterButtonStates();
}

function updateLetterButtonStates() {
  document.querySelectorAll(".letter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.letter === currentLetterFilter);
  });
}

function renderAllAlbums() {
  const container = document.getElementById("all-albums-grid");
  if (!container) return;

  container.innerHTML = "";

  const filteredAlbums = currentLetterFilter
    ? albums.filter(
        (album) => getFilterLetter(album.artist) === currentLetterFilter,
      )
    : albums;

  const sortedAlbums = [...filteredAlbums].sort((a, b) =>
    a.artist.localeCompare(b.artist, undefined, { sensitivity: "base" }),
  );

  if (!sortedAlbums.length) {
    container.innerHTML = `<p class="no-results">No albums found for "${currentLetterFilter}".</p>`;
    return;
  }

  sortedAlbums.forEach((album) => {
    container.appendChild(buildAlbumCard(album));
  });
}

renderTopAlbums();
renderAlphabetFilter();
renderAllAlbums();
