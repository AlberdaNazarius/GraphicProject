export function clamp(value: number): number {
  return Math.min(255, Math.max(0, value));
}

export function canvasImageData(image: HTMLImageElement | null) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!image || !ctx) return null;

  // Set canvas dimensions to match the image
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);
  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  return {data, imageData, canvas, ctx}
}

type UpdateParams = {
  imageData: ImageData,
  newData: Uint8ClampedArray,
  modImage: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
}

export function updateImage(params: UpdateParams) {
  const {imageData, newData, modImage, canvas, ctx} = params
  // Put the filtered data back onto the canvas
  imageData.data.set(newData);
  ctx.putImageData(imageData, 0, 0);
  // Convert the canvas back to a data URL and update the image
  modImage.src = canvas.toDataURL();
}