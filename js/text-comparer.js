// File for text comparison app

const field1 = document.getElementById("textCompare1");
const field2 = document.getElementById("textCompare2");
const differenceOutput = document.getElementById("differenceOutput");

function compare2Strings(sentence1, sentence2) {
  const sentence1Split = sentence1.split(" ");
  const sentence2Split = sentence2.split(" ");
  const differences1 = []
  const differences2 = []
  let match = true;

  for (let i = 0; i < Math.max(sentence1Split.length, sentence2Split.length); i++) {
    const word1 = sentence1Split[i] ?? "";
    const word2 = sentence2Split[i] ?? "";

    if (word1 !== word2) {
      differences1.push(`<mark>${word1}</mark>`);
      differences2.push(`<mark>${word2}</mark>`);
    } else {
      differences1.push(word1);
      differences2.push(word2);
    }

    differenceOutput.innerHTML = `<div style="width: 100%; text-align:left; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 8px;"><p style="font-size: 8px; overflow-wrap: break-word; min-width: 0;">${differences1.join(' ')}</p><p style="font-size: 8px; overflow-wrap: break-word; min-width: 0;">${differences2.join(" ")}</p></div>`;
  }
}

field1.addEventListener("input", () => {
  compare2Strings(field1.value, field2.value);
});

field2.addEventListener("input", () => {
  compare2Strings(field1.value, field2.value);
});
