const facts = [
  "Octopuses have three hearts and blue blood.",
  "Sharks have existed longer than trees.",
  "Venus rotates in the opposite direction of most planets.",
  "A group of flamingos is called a flamboyance.",
  "Honey never spoils.",
  "Wombats produce cube-shaped poop.",
  "Bananas are berries, but strawberries are not.",
  "The Eiffel Tower can grow taller in summer due to thermal expansion.",
  "Tug of war was once an Olympic event.",
  "Astronauts say space smells like hot metal.",
  "Cows have best friends and become stressed when separated.",
  "The shortest war in history lasted 38 minutes.",
  "There are more possible chess games than atoms in the observable universe.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "The fingerprints of a koala are nearly indistinguishable from a human's.",
  "A day on Venus is longer than a year on Venus.",
  "The first computer bug was an actual moth.",
  "The human nose can detect over one trillion scents.",
  "Scotland's national animal is the unicorn.",
  "An ostrich's eye is larger than its brain.",
  "The moon is slowly moving away from Earth.",
  "Some cats are allergic to humans.",
  "A cloud can weigh over a million pounds.",
  "The inventor of the Frisbee was turned into a Frisbee after he died.",
  "Sloths can hold their breath longer than dolphins.",
  "Hot water can freeze faster than cold water under certain conditions.",
  "There are more stars in the universe than grains of sand on Earth.",
  "The longest hiccuping spree lasted 68 years.",
  "A shrimp's heart is located in its head.",
  "The dot over the letters i and j is called a tittle.",
  "Oxford University is older than the Aztec Empire.",
  "The majority of your brain is made of fat.",
  "The world's largest desert is Antarctica.",
  "Some turtles can breathe through their butts.",
  "A bolt of lightning is five times hotter than the surface of the sun.",
  "The first oranges weren't orange.",
  "You cannot hum while holding your nose shut.",
  "There are more trees on Earth than stars in the Milky Way.",
  "Cats use their whiskers to determine whether they can fit through a gap.",
  "The inventor of the Pringles can is buried in one.",
  "An apple, potato, and onion all taste the same if you eat them with your nose plugged.",
  "The total weight of all ants on Earth is roughly equal to the weight of all humans.",
  "Some metals are so reactive that they explode on contact with water.",
  "A group of crows is called a murder.",
  "The oldest known living tree is over 4,800 years old.",
  "Jellyfish have existed longer than dinosaurs.",
  "Koalas sleep up to 22 hours per day.",
  "The average person walks the equivalent of five times around the Earth in their lifetime.",
  "A single strand of spaghetti is called a spaghetto.",
  "The world's quietest room is so silent that people can hear their own heartbeat."
];

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
const upload = document.getElementById("imageUpload");
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");
const randomAlbum = [...albums]
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);

function showFact() {
  document.getElementById("fact").textContent =
    facts[Math.floor(Math.random() * facts.length)];
}

upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        const pixelSize = 8;

        const smallCanvas = document.createElement("canvas");
        const smallCtx = smallCanvas.getContext("2d");

        smallCanvas.width = Math.floor(img.width / pixelSize);
        smallCanvas.height = Math.floor(img.height / pixelSize);

        smallCtx.drawImage(
            img,
            0,
            0,
            smallCanvas.width,
            smallCanvas.height
        );

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
            canvas.height
        );
    };

    img.src = URL.createObjectURL(file);
});

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

showFact();
setInterval(showFact, 10000);