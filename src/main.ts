import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const widthInput = document.getElementById("width") as HTMLInputElement;
const heightInput = document.getElementById("height") as HTMLInputElement;
const radiusInput = document.getElementById("radius") as HTMLInputElement;

const resultElement = document.getElementById(
  "radius-recommendation",
) as HTMLElement;

// Function to calculate and display result
const calculateResult = () => {
  const width = Math.abs(Math.floor(parseInt(widthInput.value)) || 0);
  const height = Math.abs(Math.floor(parseInt(heightInput.value)) || 0);

  const minValue = Math.min(width, height);
  const radiusValue = minValue - minValue / 3;
  // Floor final result to ensure int
  const recommendedRadius = Math.floor(radiusValue);

  resultElement.textContent = `Recommended radius: ${recommendedRadius}px`;
};

// Add input event listeners
widthInput.addEventListener("input", calculateResult);
heightInput.addEventListener("input", calculateResult);

document
  .querySelector("[data-handler='insert-shape']")
  ?.addEventListener("click", () => {
    /*const radius = document.getElementById("radius") as HTMLInputElement;

    const width = document.getElementById("width") as HTMLInputElement;
    const height = document.getElementById("height") as HTMLInputElement;*/

    // send message to plugin.ts
    parent.postMessage(
      {
        action: "insert-shape",
        radius: radiusInput.value,
        width: widthInput.value,
        height: heightInput.value,
      },
      "*",
    );
  });

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});
