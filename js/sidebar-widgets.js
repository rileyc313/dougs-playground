// ---- Clickable sound gifs (Mercury + musical notes) ----
// Each one plays a sound on click. Independently guarded, so this file is
// fine to include even on pages that only have one of the two.
//
// WHERE THIS GOES: header/about pages with #mercuryGif + #mercurySound,
// and/or #musicalNotesGif + #pianoSound1/#pianoSound2/#pianoSound3.

const mercuryGif = document.getElementById("mercuryGif");
if (mercuryGif) {
  mercuryGif.addEventListener("click", function () {
    const sound = document.getElementById("mercurySound");
    sound.currentTime = 0;
    sound.play();
  });
}

const musicalNotesGif = document.getElementById("musicalNotesGif");
if (musicalNotesGif) {
  musicalNotesGif.addEventListener("click", function () {
    const sounds = ["pianoSound1", "pianoSound2", "pianoSound3"];
    const randomId = sounds[Math.floor(Math.random() * sounds.length)];
    const sound = document.getElementById(randomId);

    sound.currentTime = 0;
    sound.play();
  });
}
