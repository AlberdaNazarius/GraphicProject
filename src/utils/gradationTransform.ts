import {Gradation} from "@/types/gradation";
import {clamp} from "@/utils/imageUtils";

export function applyGradationTransform(
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  type: Gradation,
  coefficient: number = 1) {

  //TODO move this code to another file
  if (!modImage || !image) {
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas dimensions to match the image
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  let newData;

  switch (type) {
    case Gradation.Negative:
      newData = negativeTransformation(data);
      break;
    case Gradation.Logarithmic:
      newData = logarithmicTransformation(data);
      break;
    case Gradation.Power:
      newData = powerTransformation(data, coefficient);
      break;
  }

  imageData.data.set(newData);
  ctx.putImageData(imageData, 0, 0);
  modImage.src = canvas.toDataURL();
}

function negativeTransformation(imageData: Uint8ClampedArray): Uint8ClampedArray {
  const transformedData = new Uint8ClampedArray(imageData.length);

  for (let i = 0; i < imageData.length; i += 4) {
    // Invert the RGB values
    transformedData[i] = 255 - imageData[i];       // Red
    transformedData[i + 1] = 255 - imageData[i + 1]; // Green
    transformedData[i + 2] = 255 - imageData[i + 2]; // Blue
    // Leave the alpha channel unchanged
    transformedData[i + 3] = imageData[i + 3];     // Alpha
  }

  return transformedData;
}


function logarithmicTransformation(imageData: Uint8ClampedArray, beta = 1.0) {
  const maxVal = imageData.reduce((max, val) => Math.max(max, val), -Infinity);
  const c = 255 / Math.log(1 + maxVal * beta);
  return imageData.map(val => c * Math.log(1 + val * beta));
}

function powerTransformation(imageData: Uint8ClampedArray, gamma = 1.0): Uint8ClampedArray {
  const transformedData = new Uint8ClampedArray(imageData.length);
  const c = 255 / Math.pow(255, gamma);

  for (let i = 0; i < imageData.length; i += 4) {
    transformedData[i] = clamp(c * Math.pow(imageData[i], gamma));     // Red
    transformedData[i + 1] = clamp(c * Math.pow(imageData[i + 1], gamma)); // Green
    transformedData[i + 2] = clamp(c * Math.pow(imageData[i + 2], gamma)); // Blue
    transformedData[i + 3] = imageData[i + 3];     // Alpha
  }

  return transformedData;
}

