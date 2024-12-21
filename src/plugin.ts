penpot.ui.open("SQUIRCLES", `?theme=${penpot.theme}`, {
  width: 260,
  height: 260,
});

function createSquircleSVG(
  width: number,
  height: number,
  radius: number, // 0 = square, 1 = circle
): string {
  const path = `
          M ${radius},0
          H ${width - radius}
          C ${width},0 ${width},0 ${width},${radius}
          V ${height - radius}
          C ${width},${height} ${width},${height} ${width - radius},${height}
          H ${radius}
          C 0,${height} 0,${height} 0,${height - radius}
          V ${radius}
          C 0,0 0,0 ${radius},0
      `.trim();

  return `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
              <path d="${path}" fill="#ed2f5b" />
          </svg>
      `.trim();
}

penpot.ui.onMessage<any>((message) => {
  if (message.action === "insert-shape") {
    const shape = penpot.createShapeFromSvg(
      createSquircleSVG(message.width, message.height, message.radius),
    );

    if (shape) {
      shape.x = penpot.viewport.center.x;
      shape.y = penpot.viewport.center.y;

      penpot.selection = [shape];
    }
  }
});

// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
