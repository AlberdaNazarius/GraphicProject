import {RefObject} from "react";

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

export function updateCanvasImage(params: UpdateParams) {
  const {imageData, newData, modImage, canvas, ctx} = params
  // Put the filtered data back onto the canvas
  imageData.data.set(newData);
  ctx.putImageData(imageData, 0, 0);
  // Convert the canvas back to a data URL and update the image
  modImage.src = canvas.toDataURL();
}

type UpdateImageParams = {
  data: Uint8ClampedArray,
  imageRef: RefObject<HTMLImageElement>,
  modImageRef: RefObject<HTMLImageElement>,
}

export function updateImage(updateData: UpdateImageParams) {
  const {data, imageRef, modImageRef} = updateData

  if (!imageRef.current || !modImageRef.current) {
    return
  }

  const image = imageRef.current;

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const imageData = new ImageData(data, image.width, image.height);
    ctx.putImageData(imageData, 0, 0);
    // Set the image source to the data URL from the canvas
    modImageRef.current.src = canvas.toDataURL();
  }
}

export function findMinMax(data: Uint8ClampedArray) {
  const min = { r: 255, g: 255, b: 255 };
  const max = { r: 0, g: 0, b: 0 };

  for (let i = 0; i < data.length; i += 4) {
    min.r = Math.min(min.r, data[i]);      // Red channel
    min.g = Math.min(min.g, data[i + 1]);  // Green channel
    min.b = Math.min(min.b, data[i + 2]);  // Blue channel

    max.r = Math.max(max.r, data[i]);
    max.g = Math.max(max.g, data[i + 1]);
    max.b = Math.max(max.b, data[i + 2]);
  }

  return { min, max };
}

export const calculateGammaFromMedian = (median) => {
  const normalizedMedian = median / 255;

  if (normalizedMedian === 0) return 1.0; // Avoid division by zero
  return Math.log(0.5) / Math.log(normalizedMedian); // Derive gamma
};

export const createGammaLUT = (gamma) => {
  const lut = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    lut[i] = Math.min(255, Math.max(0, Math.pow(i / 255, gamma) * 255)); // Gamma correction formula
  }
  return lut;
};

export const calculateMedian = (histogram, totalPixels) => {
  let cumulativeSum = 0;

  for (let i = 0; i < histogram.length; i++) {
    cumulativeSum += histogram[i];
    if (cumulativeSum >= totalPixels / 2) {
      return i; // Return the brightness level corresponding to the median
    }
  }

  return 127; // Fallback if something goes wrong
};