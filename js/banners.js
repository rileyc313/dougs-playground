// ---- Footer banner marquee ----
// Renders the scrolling 88x31-style linkback banners in the footer.
// Duplicates the group so the CSS marquee animation loops seamlessly;
// shuffles order on load if shuffleBanners is true (both groups stay
// identical to each other even when shuffled, so the loop never stutters).
//
// WHERE THIS GOES: any page that has the .banner-container / #bannerTrack
// footer strip. If that's part of a shared footer, that's every page.

const banners = [
  {
    url: "https://jamescyberzone.neocities.org/",
    img: "https://jamescyberzone.neocities.org/Button1.png",
    alt: "James Cyberzone",
  },
  {
    url: "https://frutigeraeroarchive.org/",
    img: "https://frutigeraeroarchive.org/images/buttons/frutigeraeroarchive_button_legacy.png",
    alt: "Frutiger Aero Archive",
  },
  {
    url: "https://webgore.neocities.org/",
    img: "https://webgore.neocities.org/images/sitebutton.gif",
    alt: "Webgore",
  },
  {
    url: "https://camo93.neocities.org/",
    img: "https://camo93.neocities.org/button.png",
    alt: "Camo93",
  },
  {
    url: "https://orloktopia.neocities.org/",
    img: "https://orloktopia.neocities.org/images/88x31/orloktopia88x31-MARK2.png",
    alt: "Orloktopia",
  },
  {
    url: "https://petrapixel.neocities.org/",
    img: "https://cdn.jsdelivr.net/gh/petracoding/petrapixel.neocities.org@latest/public/assets/img/linkback.gif",
    alt: "petrapixel",
  },
  {
    url: "https://onio.club",
    img: "https://onio.club/buttons/oniobutton2.gif",
    alt: "onio.club",
  },
  {
    url: "https://digimechanoid.com/",
    img: "https://digimechanoid.com/images/digimechanoidbloodbutton.gif",
    alt: "digimechanoid",
  },
  {
    url: "https://ascalaphid.com",
    img: "https://ascalaphid.com/assets/widgets/ascalaphidwidget.gif",
    alt: "ascalaphid",
  },
  {
    url: "https://tertiaryapocalypse.neocities.org",
    img: "https://tertiaryapocalypse.neocities.org/button/tertiaryapocalypse.png",
    alt: "tertiaryapocalypse",
  },
  {
    url: "https://404city.neocities.org/",
    img: "https://404city.neocities.org/btn.gif",
    alt: "404city",
  },
];

// Set true if you want the badge order shuffled on every page load.
const shuffleBanners = true;

function renderBanners() {
  const track = document.getElementById("bannerTrack");
  if (!track) return;

  const list = shuffleBanners
    ? [...banners].sort(() => Math.random() - 0.5)
    : banners;

  const groupHTML = list
    .map(
      (b) => `
    <a href="${b.url}" target="_blank" rel="noopener">
      <img
        class="d-banner"
        src="${b.img}"
        alt="${b.alt || ""}"
        loading="lazy"
      >
    </a>
  `,
    )
    .join("");

  track.innerHTML = `
    <div class="banner-group">
      ${groupHTML}
    </div>
    <div class="banner-group">
      ${groupHTML}
    </div>
  `;
}

renderBanners();
