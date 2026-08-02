// ---- Random fact ticker ----
// Fills #fact with a random fact and rotates it every 10 seconds.
//
// WHERE THIS GOES: any page with the .random-facts / #fact strip. Looked
// like part of your shared sidebar, so probably every page — but if any
// page's layout drops that element, it's safe to still include this file,
// showFact() just no-ops.

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
  "The world's quietest room is so silent that people can hear their own heartbeat.",
];

function showFact() {
  const factEl = document.getElementById("fact");
  if (!factEl) return;
  factEl.textContent = facts[Math.floor(Math.random() * facts.length)];
}

showFact();
setInterval(showFact, 10000);
