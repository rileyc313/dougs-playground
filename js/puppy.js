// ---- Random puppy photo ----
// Drops a random puppy pic into #puppy-slot on load.
//
// WHERE THIS GOES: whatever page has #puppy-slot (looked like the sidebar,
// so possibly every page).
//
// HEADS UP: this builds its image path as a hardcoded "../../img/gallery/
// puppy/..." instead of using the ROOT constant like albums.js does. That's
// the same relative-path-depth inconsistency flagged in past sessions —
// this will break if #puppy-slot ever shows up on a page that isn't two
// directories deep. Left as-is here to match current behavior exactly;
// happy to switch it to ROOT if you want it consistent site-wide.

const puppyCount = 14;

function renderPuppyElement(container) {
  const num = Math.floor(Math.random() * puppyCount) + 1;
  console.log(num);
  container.innerHTML = `
    <div class="container-left" style="border-radius: 0px;">
      <p><strong>Puppy Picture</strong>:</p>
      <img class="doggo-pic" src="../../img/gallery/puppy/p${num}.png"/>
    </div>
  `;
}

const puppySlot = document.getElementById("puppy-slot");
if (puppySlot) renderPuppyElement(puppySlot);
