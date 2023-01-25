let queue = 0;
let isLoading = false;

function createDefaultState() {
  const container = document.querySelector("#progress-bar");
  const bar = document.createElement("div");
  bar.classList.add("bar");
  const progressDiv = document.createElement("div");
  progressDiv.setAttribute("id", "progress-div");
  progressDiv.classList.add("progress");
  bar.appendChild(progressDiv);
  container.appendChild(bar);
  const button = document.createElement("button");
  button.setAttribute("id", "run-button");
  button.addEventListener("click", () => {
    queue += 1;
    updateButtonText(queue);
    handleClick();
  });
  button.innerText = "Run";
  container.appendChild(button);
}

function updateButtonText(queue) {
  const runButton = document.querySelector("#run-button");
  runButton.innerText = `Run ${queue || ""}`;
}

function handleClick() {
  if (!isLoading) {
    isLoading = true;
    startAnimating();
  }
}

function startAnimating() {
  const progressDiv = document.querySelector("#progress-div");
  let width = 0;
  const interval = setInterval(() => {
    if (width > 100) {
      progressDiv.style.width = "0px";
      isLoading = false;
      queue = queue > 0 ? queue - 1 : 0;
      updateButtonText(queue);
      if (queue > 0) {
        handleClick();
      }
      clearInterval(interval);
    } else {
      progressDiv.style.width = `${width}%`;
      width += 1;
    }
  }, 20);
}

document.addEventListener("DOMContentLoaded", createDefaultState);
