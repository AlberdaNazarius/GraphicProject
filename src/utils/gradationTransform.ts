import {Gradation} from "@/types/gradation";

export function applyGradationTransform(
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  type: Gradation) {

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
      newData = powerTransformation(data);
      break;
  }

  // Apply the modified image data back to the canvas
  imageData.data.set(newData);
  ctx.putImageData(imageData, 0, 0);
  modImage.src = canvas.toDataURL();
}

function negativeTransformation(image, beta = 1.0) {
  return;
}

// Logarithmic transformation
function logarithmicTransformation(image, beta = 1.0) {
  const c = 255 / Math.log(1 + Math.max(...image) * beta);
  return image.map(val => c * Math.log(1 + val * beta));
}

// Power transformation
function powerTransformation(image, gamma = 1.0) {
  const c = 255 / Math.pow(Math.max(...image), gamma);
  return image.map(val => c * Math.pow(val, gamma));
}