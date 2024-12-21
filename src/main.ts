import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

document
  .querySelector("[data-handler='insert-shape']")
  ?.addEventListener("click", () => {
    const radius = document.getElementById("radius") as HTMLInputElement;

    const width = document.getElementById("width") as HTMLInputElement;
    const height = document.getElementById("height") as HTMLInputElement;

    // send message to plugin.ts
    parent.postMessage(
      {
        action: "insert-shape",
        radius: radius.value,
        width: width.value,
        height: height.value,
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
