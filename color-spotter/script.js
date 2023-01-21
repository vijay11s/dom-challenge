let activeGridSize = 4;
let score = 0;

const getRandomColors = function () {
  var ratio = 0.618033988749895;

  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;

  var color =
    "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
  var oddColor =
    "hsl(" +
    Math.round(360 * hue) +
    "," +
    saturation +
    "%," +
    (lightness + 5) +
    "%)";

  return {
    color,
    oddColor,
  };
};

function createBoard() {
  const container = document.querySelector("#color-spotter");

  container.innerHTML = "";
  const p = document.createElement("p");
  p.innerText = `Score: ${score}`;
  container.appendChild(p);
  const { color, oddColor } = getRandomColors();
  const randomCol = Math.floor(Math.random() * activeGridSize) + 1;
  const randomRow = Math.floor(Math.random() * activeGridSize) + 1;
  for (let i = 1; i <= activeGridSize; i++) {
    const div = document.createElement("div");
    div.classList.add("col");
    for (let j = 1; j <= activeGridSize; j++) {
      const span = document.createElement("span");
      span.classList.add("box");
      span.dataset.col = i;
      span.dataset.row = j;
      if (randomCol === i && randomRow === j) {
        span.style.backgroundColor = oddColor;
        span.dataset.isRandom = true;
      } else {
        span.style.backgroundColor = color;
      }
      span.addEventListener("click", handleClick);
      div.appendChild(span);
    }
    container.appendChild(div);
  }
}

function handleClick(e) {
  const { isRandom } = e.target.dataset;
  if (isRandom) {
    activeGridSize += 1;
    score += 1;
    createBoard();
  } else {
    activeGridSize = 4;
    score = 0;
    const container = document.querySelector("#color-spotter");
    container.classList.add("shake");
    setTimeout(() => {
      container.classList.remove("shake");
      createBoard();
    }, 800);
  }
}

document.addEventListener("DOMContentLoaded", createBoard);
