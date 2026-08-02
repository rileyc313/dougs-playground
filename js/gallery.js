// ---- Photo gallery shuffle ----
// Randomizes the order of .photo elements inside .photos-preview on load.
//
// WHERE THIS GOES: your gallery/photos page only. Nothing else uses this.

function shuffleGallery() {
  const gallery = document.querySelector(".photos-preview");
  if (!gallery) return;

  const photos = Array.from(gallery.children);

  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }

  photos.forEach((photo) => gallery.appendChild(photo));
}

shuffleGallery();
