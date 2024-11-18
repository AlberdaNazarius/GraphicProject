import {canvasImageData, updateCanvasImage} from "@/utils/imageUtils";
import {CorrectionTypes} from "@/types/imageCorrection";


export const applyLevelAdjustment = (data: Uint8ClampedArray, min: number, max: number) => {
  if (min === max) {
    console.error("Min and max values are the same, level adjustment cannot be applied.");
    return data;
  }

  const outputData = new Uint8ClampedArray(data.length);
  const scale = 255 / (max - min); // Pre-compute the scale factor

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) { // Apply for R, G, B channels
      const newValue = (data[i + c] - min) * scale;
      outputData[i + c] = Math.min(255, Math.max(0, newValue)); // Ensure values are clamped between 0 and 255
    }
    outputData[i + 3] = data[i + 3]; // Copy alpha channel unchanged
  }

  return outputData;
};

export const applyGammaCorrection = (data: Uint8ClampedArray, gamma: number) => {
  const outputData = new Uint8ClampedArray(data);
  const gammaCorrection = 1 / gamma;
  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) { // Apply for R, G, B channels
      outputData[i + c] = 255 * Math.pow((data[i + c] / 255), gammaCorrection);
    }
    outputData[i + 3] = data[i + 3]; // Copy alpha channel
  }
  return outputData;
};

export const adjustLevelsAndApplyGamma = (data: Uint8ClampedArray, min: number, max: number, gamma: number) => {
  // Спочатку застосовуємо приведення рівнів
  const adjustedData = applyLevelAdjustment(data, min, max);

  // Потім застосовуємо гамма-корекцію до результату першого методу
  return applyGammaCorrection(adjustedData, gamma);
};

function findMinMax(data: Uint8ClampedArray) {
  let min = Infinity; // Start with the highest possible value
  let max = -Infinity; // Start with the lowest possible value

  for (let i = 0; i < data.length; i += 4) {
    // Check only the RGB channels, skip alpha channel at i + 3
    for (let c = 0; c < 3; c++) {
      const value = data[i + c];
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  return {min, max};
}

export const applyColorBalanceFilter = (
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  gamma: number,
  type: CorrectionTypes
) => {
  if (!image || !modImage) return;

  const canvasData = canvasImageData(image);
  if (!canvasData) {
    return;
  }
  const {data, imageData, canvas, ctx} = canvasData;
  const {min, max} = findMinMax(data)

  let newData = new Uint8ClampedArray(data);

  switch (type) {
    case CorrectionTypes.LEVEL_ADJUSTMENT:
      newData = applyLevelAdjustment(data, min, max);
      break;
    case CorrectionTypes.GAMMA_CORRECTION:
      newData = applyGammaCorrection(data, gamma);
      break;
    case CorrectionTypes.LEVEL_AND_GAMMA:
      newData = adjustLevelsAndApplyGamma(data, min, max, gamma);
      break;
    case CorrectionTypes.HISTOGRAM:
      newData = histogramEqualization(data);
      break;
  }

  updateCanvasImage({imageData, newData, modImage, canvas, ctx});
};

function histogramEqualization(data: Uint8ClampedArray) {
  // Process each color channel separately
  const outputData = new Uint8ClampedArray(data.length);

  for (let channel = 0; channel < 3; channel++) {
    // Initialize histogram and CDF
    const histogram = new Array(256).fill(0);
    const cdf = new Array(256).fill(0);

    // Calculate the histogram
    for (let i = channel; i < data.length; i += 4) {
      histogram[data[i]]++;
    }

    // Calculate the CDF
    cdf[0] = histogram[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + histogram[i];
    }

    // Normalize the CDF
    const cdfMin = cdf.find(value => value > 0);
    const cdfMax = cdf[255];

    for (let i = 0; i < 256; i++) {
      cdf[i] = ((cdf[i] - cdfMin) / (cdfMax - cdfMin)) * 255;
    }

    // Apply equalized histogram
    for (let i = channel; i < data.length; i += 4) {
      outputData[i] = cdf[data[i]];
    }
  }

  // Copy alpha channel
  for (let i = 3; i < data.length; i += 4) {
    outputData[i] = data[i];
  }

  return outputData;
}