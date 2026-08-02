// ---- Red button sound easter egg ----
// Click the button, get a random goofy sound, image swaps while it plays.
//
// WHERE THIS GOES: wherever #myButton / #btnImg / #btnAudio live.
//
// HEADS UP: unlike every other feature in the original file, this block
// never null-guarded its DOM lookups. If this file gets loaded on a page
// that doesn't have #myButton, `btn.addEventListener` will throw and
// break every script that loads after it on that page. Kept unguarded
// here to match current live behavior exactly, but this is the same
// class of bug you've fixed elsewhere (top-level DOM calls on pages
// where the element doesn't exist) — let me know if you want it wrapped
// in an `if (btn) {...}` like the rest.

const btn = document.getElementById("myButton");
const btnImg = document.getElementById("btnImg");
const audio = document.getElementById("btnAudio");

const IDLE_SRC = "../../img/redbutton1.png";
const PRESSED_SRC = "../../img/redbutton2.png";

const sounds = [
  "../../audio/buttonsounds/chicken.mp3",
  "../../audio/buttonsounds/chickenscream.mp3",
  "../../audio/buttonsounds/fart.mp3",
  "../../audio/buttonsounds/kiss.mp3",
  "../../audio/buttonsounds/mousesqueak.mp3",
  "../../audio/buttonsounds/oof.mp3",
  "../../audio/buttonsounds/quack.mp3",
  "../../audio/buttonsounds/vineboom.mp3",
];

let lastSound = null;

function getRandomSound() {
  let choice;
  do {
    choice = sounds[Math.floor(Math.random() * sounds.length)];
  } while (choice === lastSound && sounds.length > 1);
  lastSound = choice;
  return choice;
}

btn.addEventListener("click", () => {
  if (!audio.paused) return;
  audio.src = getRandomSound();
  btnImg.src = PRESSED_SRC;
  audio.currentTime = 0;
  audio.play();
});

audio.addEventListener("ended", () => {
  btnImg.src = IDLE_SRC;
});
