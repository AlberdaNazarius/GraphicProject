import {Kernel} from "@/types/filters";

export function applyFilter(filterMatrix: Kernel | null, image: HTMLImageElement | null,  modImage: HTMLImageElement | null) {
  if (!filterMatrix || !modImage || !image) {
    return;
  }

  const kernel = filterMatrix.kernel;
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const matrixSize = kernel.length;
  const half = Math.floor(matrixSize / 2);

  for (let y = half; y < canvas.height - half; y++) {
    for (let x = half; x < canvas.width - half; x++) {
      let r = 0, g = 0, b = 0;

      for (let ky = 0; ky < matrixSize; ky++) {
        for (let kx = 0; kx < matrixSize; kx++) {
          const posX = x + kx - half;
          const posY = y + ky - half;
          const pixelIndex = (posY * canvas.width + posX) * 4;

          r += data[pixelIndex] * kernel[ky][kx];
          g += data[pixelIndex + 1] * kernel[ky][kx];
          b += data[pixelIndex + 2] * kernel[ky][kx];
        }
      }

      const index = (y * canvas.width + x) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  modImage.src = canvas.toDataURL();
}