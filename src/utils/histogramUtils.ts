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