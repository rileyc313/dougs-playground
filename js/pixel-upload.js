// ---- Duke pixelator upload widget ----
// Lets the user upload an image, downsamples it, then draws it back out
// blocky/pixelated onto #pixelCanvas.
//
// WHERE THIS GOES: your pixelator/Duke page only. Needs #imageUpload
// (file input) and #pixelCanvas (canvas element).

function setupPixelUpload() {
  const upload = document.getElementById("imageUpload");
  const canvas = document.getElementById("pixelCanvas");
  if (!upload || !canvas) return;

  const ctx = canvas.getContext("2d");

  upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const pixelSize = 8;

        const smallCanvas = document.createElement("canvas");
        const smallCtx = smallCanvas.getContext("2d");

        smallCanvas.width = Math.floor(img.width / pixelSize);
        smallCanvas.height = Math.floor(img.height / pixelSize);

        smallCtx.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          smallCanvas,
          0,
          0,
          smallCanvas.width,
          smallCanvas.height,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

setupPixelUpload();
