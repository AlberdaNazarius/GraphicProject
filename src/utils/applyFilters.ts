import {Kernel} from "@/types/filters";
import {canvasImageData, updateCanvasImage} from "@/utils/imageUtils";

/**
 * Applies a convolution matrix filter to an image and updates the image element.
 *
 * @param image - HTMLImageElement that contains the original image
 * @param modImage - HTMLImageElement where the filtered image will be shown
 * @param filter - The kernel filter to be applied (convolution)
 */
export const applyFilter = (
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  filter: Kernel | null
): void => {
  if (!filter || !modImage || !image) {
    return;
  }

  const canvasData = canvasImageData(image);
  if (!canvasData) {
    return;
  }
  const {data, imageData, canvas, ctx} = canvasData;

  // Filter kernel
  const { kernel } = filter;
  const kernelSize = kernel.length;
  const halfKernel = Math.floor(kernelSize / 2);

  // Calculate the kernel sum for normalization
  const kernelSum = kernel.flat().reduce((sum, val) => sum + val, 0) || 1;

  // Create a new array for filtered pixel data
  const newData = new Uint8ClampedArray(data);

  // Iterate over every pixel (excluding the edges for simplicity)
  for (let y = halfKernel; y < image.height - halfKernel; y++) {
    for (let x = halfKernel; x < image.width - halfKernel; x++) {
      let r = 0, g = 0, b = 0;

      // Apply convolution filter matrix
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const pixelX = x + kx - halfKernel;
          const pixelY = y + ky - halfKernel;
          const pixelIndex = (pixelY * image.width + pixelX) * 4;

          r += data[pixelIndex] * kernel[ky][kx];
          g += data[pixelIndex + 1] * kernel[ky][kx];
          b += data[pixelIndex + 2] * kernel[ky][kx];
        }
      }

      r = Math.abs(r);
      g = Math.abs(g);
      b = Math.abs(b);

      const index = (y * image.width + x) * 4;
      newData[index] = Math.min(Math.max(r / kernelSum, 0), 255);     // Red channel
      newData[index + 1] = Math.min(Math.max(g / kernelSum, 0), 255); // Green channel
      newData[index + 2] = Math.min(Math.max(b / kernelSum, 0), 255); // Blue channel
    }
  }

  updateCanvasImage({imageData, newData, modImage, canvas, ctx});
};
