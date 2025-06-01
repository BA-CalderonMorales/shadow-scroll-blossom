
export const setupCanvas = (canvas: HTMLCanvasElement): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log('Canvas resized', { width: canvas.width, height: canvas.height });
};

export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
  // More subtle trail effect
  ctx.fillStyle = 'rgba(8, 12, 20, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
