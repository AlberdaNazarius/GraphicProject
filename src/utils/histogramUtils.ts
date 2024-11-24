export const histogramEqualization = (imageData: Uint8ClampedArray) => {
  const hist = new Array(256).fill(0);
  const cdf = new Array(256).fill(0);

  // Calculate histogram
  for (let i = 0; i < imageData.length; i++) {
    hist[imageData[i]]++;
  }

  // Calculate cumulative distribution function (CDF)
  cdf[0] = hist[0];
  for (let i = 1; i < 256; i++) {
    cdf[i] = cdf[i - 1] + hist[i];
  }

  // Normalize CDF
  const cdfMin = cdf.find(value => value > 0);
  const cdfMax = cdf[255];
  const cdfNormalized = cdf.map(value => ((value - cdfMin) * 255) / (cdfMax - cdfMin));

  // Apply equalization
  const equalizedImage = imageData.map(value => cdfNormalized[value]);

  return equalizedImage;
};

export const fillHistogram = (imageData: Uint8ClampedArray, arrayLength: number = 256) => {
  const hist = new Array(arrayLength).fill(0);
  for (let i = 0; i < imageData.length; i++) {
    hist[imageData[i]]++;
  }
  return hist;
}

export const fillHistogramsForEachChannel = (imageData: Uint8ClampedArray, arrayLength: number = 256) => {
  const histograms = {
    red: new Array(arrayLength).fill(0),
    green: new Array(arrayLength).fill(0),
    blue: new Array(arrayLength).fill(0)
  };

  for (let i = 0; i < imageData.length; i += 4) {
    histograms.red[imageData[i]]++;       // Red channel
    histograms.green[imageData[i + 1]]++; // Green channel
    histograms.blue[imageData[i + 2]]++;  // Blue channel
  }

  return histograms;
}

interface HistogramData {
  histogram: number[];
  cdf: number[];
  cdfNormalized: number[];
}

export function calculateHistogramAndCDF(imageData: Uint8ClampedArray): HistogramData {
  const histogram = new Array(256).fill(0);
  const cdf = new Array(256).fill(0);
  const cdfNormalized = new Array(256).fill(0);

  // Calculate histogram
  for (let i = 0; i < imageData.length; i++) {
    histogram[imageData[i]]++;
  }

  // Calculate CDF
  cdf[0] = histogram[0];
  for (let i = 1; i < 256; i++) {
    cdf[i] = cdf[i - 1] + histogram[i];
  }

  // Normalize CDF
  const cdfMax = cdf[255];
  for (let i = 0; i < 256; i++) {
    cdfNormalized[i] = (cdf[i] * 255) / cdfMax;
  }

  return { histogram, cdf, cdfNormalized };
}