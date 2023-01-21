let activeDiagonals = [];

function createBoard() {
  const board = document.querySelector("#chess-board");
  board.innerHTML = "";
  let activeColor = "#FFF";
  for (let i = 1; i <= 8; i++) {
    const col = document.createElement("div");
    col.classList.add("col");
    for (let j = 1; j <= 8; j++) {
      const span = document.createElement("span");
      span.dataset.col = i;
      span.dataset.row = j;
      span.classList.add("box");
      const isActiveDiagonal = arrayAlreadyHasArray(activeDiagonals, [i, j]);
      if (isActiveDiagonal) {
        span.style.backgroundColor = "red";
      } else {
        span.style.backgroundColor = activeColor;
      }
      span.addEventListener("click", handleClick);
      if (j !== 8) {
        if (activeColor === "#FFF") {
          activeColor = "#000";
        } else {
          activeColor = "#FFF";
        }
      }
      col.appendChild(span);
    }
    board.appendChild(col);
  }
}

function arrayAlreadyHasArray(arr, subarr) {
  for (let i = 0; i < arr.length; i++) {
    let checker = false;
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === subarr[j]) {
        checker = true;
      } else {
        checker = false;
        break;
      }
    }
    if (checker) {
      return true;
    }
  }
  return false;
}

function handleClick(e) {
  activeDiagonals = [];
  const { target } = e;
  const { dataset } = target;
  const { col, row } = dataset;
  activeDiagonals.push([parseInt(col), parseInt(row)]);
  rightTop(col, row);
  rightBottom(col, row);
  leftTop(col, row);
  leftBottom(col, row);
  createBoard();
}

function leftBottom(col, row) {
  let i = parseInt(col);
  let j = parseInt(row);
  while (i < 8 && j > 1) {
    activeDiagonals.push([i + 1, j - 1]);
    i++;
    j--;
  }
}

function rightTop(col, row) {
  let i = parseInt(col);
  let j = parseInt(row);
  while (i > 1 && j < 8) {
    activeDiagonals.push([i - 1, j + 1]);
    i--;
    j++;
  }
}

function leftTop(col, row) {
  let i = parseInt(col);
  let j = parseInt(row);
  while (i > 1 && j > 0) {
    activeDiagonals.push([i - 1, j - 1]);
    i--;
    j--;
  }
}

function rightBottom(col, row) {
  let i = parseInt(col);
  let j = parseInt(row);
  while (i < 8 && j < 8) {
    activeDiagonals.push([i + 1, j + 1]);
    i++;
    j++;
  }
}

document.addEventListener("DOMContentLoaded", createBoard);
