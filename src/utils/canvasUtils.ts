
export const setupCanvas = (canvas: HTMLCanvasElement): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log('Canvas resized', { width: canvas.width, height: canvas.height });
};

export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDarkMode: boolean = true): void => {
  // Different trail effects for light and dark modes
  if (isDarkMode) {
    ctx.fillStyle = 'rgba(8, 12, 20, 0.05)';
  } else {
    ctx.fillStyle = 'rgba(248, 250, 252, 0.08)';
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
