function PixelArt(el, rows, cols) {
  let activeColor = null;
  const element = document.querySelector(el);
  for (let i = 1; i <= rows + 1; i++) {
    const div = document.createElement("div");
    div.classList.add("col");
    for (let j = 1; j <= cols; j++) {
      const elem = document.createElement("span");
      elem.classList.add("box");
      if (i > rows) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`;
        elem.dataset.color = randomColor;
        elem.style.backgroundColor = randomColor;
        elem.addEventListener("click", updateActiveColor);
      } else {
        elem.dataset.row = i;
        elem.dataset.col = j;
        elem.addEventListener("click", addColor);
        elem.addEventListener("dragover", handleDrag);
      }
      div.appendChild(elem);
    }
    element.appendChild(div);
  }

  function updateActiveColor(e) {
    activeColor = e.target.dataset.color;
  }

  function addColor(e) {
    if (activeColor) {
      e.target.style.backgroundColor = activeColor;
    }
  }

  function handleDrag(e) {
    const { target } = e;
    if (target.dataset && target.dataset.row && target.dataset.col) {
      target.style.background = activeColor;
    }
  }
}
