const facts = [];
let currentFact = 0;
const albums = [
  {
    cover: "../img/whatliesaheadofme.jpg",
    artist: "All Under Heaven",
    title: "What Lies Ahead of Me",
    runtime: "32 Minutes",
    genres: "Alternative rock, indie rock, shoegaze",
    topTrack: "Receiving Certain Answers",
    color: "#e46c82"
  },
  {
    cover: "../img/muchlove.jpg",
    artist: "Microwave",
    title: "Much Love",
    runtime: "38 Minutes",
    genres: "Alternative rock, indie rock",
    topTrack: "Whimper",
    color: "#EE6C4A"
  },
  {
    cover: "../img/youdpreferanastronaut.jpg",
    artist: "HUM",
    title: "You'd Prefer an Astronaut",
    runtime: "46 Minutes",
    genres: "Punk",
    topTrack: "The Pod",
    color: "#3bb349"
  },
  {
    cover: "../img/shed.jpg",
    artist: "Title Fight",
    title: "Shed",
    runtime: "27 Minutes",
    genres: "Punk, Alternative Rock, Indie Rock",
    topTrack: "27",
    color: "#045ED8"
  }
  ,
  {
    cover: "../img/floralgreen.jpg",
    artist: "Title Fight",
    title: "Floral Green",
    runtime: "32 Minutes",
    genres: "Punk, Alternative Rock, Indie Rock",
    topTrack: "Make You Cry",
    color: "#0C3441"
  }
  ,
  {
    cover: "../img/inlet.jpg",
    artist: "HUM",
    title: "Inlet",
    runtime: "55 Minutes",
    genres: "Rock, Progressive Rock",
    topTrack: "The Summoning",
    color: "#504D6C"
  }
  ,
  {
    cover: "../img/betweentherichness.jpg",
    artist: "Fiddlehead",
    title: "Between The Richness",
    runtime: "25 Minutes",
    genres: "Alternative Rock, Indie Rock",
    topTrack: "Heart To Heart",
    color: "#3E8FAC"
  }
  ,
  {
    cover: "../img/superheaven.jpg",
    artist: "Superheaven",
    title: "Superheaven",
    runtime: "31 Minutes",
    genres: "Metal, Alternative Rock, Rock",
    topTrack: "Long Gone",
    color: "#5A251F"
  }
  ,
  {
    cover: "../img/jar.jpg",
    artist: "Superheaven",
    title: "Jar",
    runtime: "41 Minutes",
    genres: "Alternative Rock, Rock, Indie Rock",
    topTrack: "Around The Railing",
    color: "#3C7096"
  }
  ,
  {
    cover: "../img/stovall.jpg",
    artist: "Microwave",
    title: "Stovall",
    runtime: "38 Minutes",
    genres: "Alternative Rock, Rock, Indie Rock",
    topTrack: "Something Right",
    color: "#b3a925"
  }
  ,
  {
    cover: "../img/promiseeverything.jpg",
    artist: "Basement",
    title: "Promise Everything",
    runtime: "28 Minutes",
    genres: "Alternative Rock, Rock, Indie Rock",
    topTrack: "For You The Moon",
    color: "#6E9CCF"
  }
  ,
  {
    cover: "../img/besidemyself.jpg",
    artist: "Basement",
    title: "Beside Myself",
    runtime: "38 Minutes",
    genres: "Post-grunge, Alternative Rock, Indie Rock",
    topTrack: "Nothing Left",
    color: "#042750"
  }
  ,
  {
    cover: "../img/colourmeinkindness.jpg",
    artist: "Basement",
    title: "Colourmeinkindness",
    runtime: "33 Minutes",
    genres: "Post-grunge, Alternative Rock, Indie Rock",
    topTrack: "Comfort",
    color: "#D57719"
  }
  ,
  {
    cover: "../img/youth.jpg",
    artist: "Citizen",
    title: "Youth",
    runtime: "30 Minutes",
    genres: "Post-grunge, Alternative Rock, Indie Rock",
    topTrack: "The Summer",
    color: "#950B0D"
  }
];
const container = document.getElementById("top-3-albums");


async function loadFacts(count = 10) {
  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        .then(res => res.json())
        .then(data => data.text)
    );
  }

  const results = await Promise.all(requests);
  facts.push(...results);

  showFact();
}

function showFact() {
  if (!facts.length) return;

  document.getElementById("fact").textContent = facts[currentFact];

  currentFact = (currentFact + 1) % facts.length;
}

const randomAlbum = [...albums]
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);

randomAlbum.forEach(album => {
  container.innerHTML += `
    <div class="album">
      <img class="album-cover" src="${album.cover}">
      <p>Artist: <span style="color:${album.color}">${album.artist}</span></p>
      <p>Title: <span style="color:${album.color}">${album.title}</span></p>
      <p>Runtime: <span style="color:${album.color}">${album.runtime}</span></p>
      <p>Genre(s): <span style="color:${album.color}">${album.genres}</span></p>
      <p>Top Track: <span style="color:${album.color}">${album.topTrack}</span></p>
    </div>
  `;
});

loadFacts();
setInterval(showFact, 10000);