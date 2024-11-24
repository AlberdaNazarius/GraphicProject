import {canvasImageData, findMinMax, updateCanvasImage} from "@/utils/imageUtils";
import {CorrectionTypes} from "@/types/imageCorrection";

type ColorChannels = {
  [key: string]: number;
  r: number;
  g: number;
  b: number;
};

export const applyLevelAdjustment = (data: Uint8ClampedArray, minValues: ColorChannels, maxValues: ColorChannels) => {
  const outputData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    ['r', 'g', 'b'].forEach((channel, index) => {
      if (minValues[channel] === maxValues[channel]) {
        outputData[i + index] = data[i + index];
      } else {
        const scale = 255 / (maxValues[channel] - minValues[channel]);
        const newValue = (data[i + index] - minValues[channel]) * scale;
        outputData[i + index] = Math.min(255, Math.max(0, newValue));
      }
    });
    outputData[i + 3] = data[i + 3];
  }
  return outputData;
};


export const applyGammaCorrection = (data: Uint8ClampedArray, gammaValues: ColorChannels) => {
  const outputData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    ['r', 'g', 'b'].forEach((channel, index) => {
      const gammaCorrection = 1 / gammaValues[channel];
      outputData[i + index] = 255 * Math.pow((data[i + index] / 255), gammaCorrection);
    });
    outputData[i + 3] = data[i + 3];
  }
  return outputData;
};

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

  let newData = new Uint8ClampedArray(data.length);

  switch (type) {
    case CorrectionTypes.LEVEL_ADJUSTMENT:
      newData = applyLevelAdjustment(data, min, max);
      break;
    case CorrectionTypes.GAMMA_CORRECTION:
      const gammaValues = { r: gamma, g: gamma, b: gamma };
      newData = applyGammaCorrection(data, gammaValues);
      break;
    case CorrectionTypes.LEVEL_AND_GAMMA:
      newData = applyLevelAdjustment(data, min, max);
      newData = applyGammaCorrection(newData, { r: gamma, g: gamma, b: gamma });
      break;
    case CorrectionTypes.HISTOGRAM:
      newData = histogramEqualization(data);
      break;
  }

  updateCanvasImage({imageData, newData, modImage, canvas, ctx});
};


function histogramEqualization(data: Uint8ClampedArray, clipLimit = 255) {
  // Process each color channel separately
  const outputData = new Uint8ClampedArray(data.length);

  for (let channel = 0; channel < 3; channel++) {
    const histogram = new Array(256).fill(0);
    const cdf = new Array(256).fill(0);

    // Calculate the histogram
    for (let i = channel; i < data.length; i += 4) {
      histogram[data[i]]++;
    }

    // Apply contrast limiting
    if (clipLimit < 255) {
      let excess = 0;
      for (let i = 0; i < 256; i++) {
        if (histogram[i] > clipLimit) {
          excess += histogram[i] - clipLimit;
          histogram[i] = clipLimit;
        }
      }

      // Redistribute excess
      let increment = excess / 256;
      for (let i = 0; i < 256; i++) {
        histogram[i] += increment;
      }
    }

    // Calculate the CDF
    cdf[0] = histogram[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + histogram[i];
    }

    // Normalize the CDF
    const cdfMin = cdf.find(value => value > 0) || 0;
    const cdfMax = cdf[255];

    if (cdfMax === cdfMin) {
      for (let i = channel; i < data.length; i += 4) {
        outputData[i] = data[i]; // No change
      }
    } else {
      for (let i = 0; i < 256; i++) {
        cdf[i] = Math.round(((cdf[i] - cdfMin) / (cdfMax - cdfMin)) * 255);
      }

      // Apply equalized histogram
      for (let i = channel; i < data.length; i += 4) {
        outputData[i] = cdf[data[i]];
      }
    }
  }

  // Copy alpha channel
  for (let i = 3; i < data.length; i += 4) {
    outputData[i] = data[i];
  }

  return outputData;
}
