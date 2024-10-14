import {Gradation} from "@/types/gradation";
import {canvasImageData, clamp, updateImage} from "@/utils/imageUtils";

export function applyGradationTransform(
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  type: Gradation,
  coefficient: number = 1) {

  if (!modImage) {
    return;
  }

  const canvasData = canvasImageData(image);
  if (!canvasData) {
    return;
  }
  const {data, imageData, canvas, ctx} = canvasData;

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

  updateImage({imageData, newData, modImage, canvas, ctx});
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

