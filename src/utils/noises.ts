import {canvasImageData, updateCanvasImage} from "@/utils/imageUtils";
import {NoisesType} from "@/types/noises";

const generateGaussianNoise = (mean = 0, sigma = 1) => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return sigma * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) + mean;
};

const generateRayleighNoise = (sigma: number) => {
  const u = Math.random();
  return sigma * Math.sqrt(-2.0 * Math.log(1 - u));
};

const generateImpulseNoise = (probability: number) => {
  const random = Math.random();
  if (random < probability / 2) return -255; // Чорний імпульс
  if (random < probability) return 255; // Білий імпульс
  return 0; // Без змін
};

const applyNoiseToData = (data: Uint8ClampedArray, noiseLevel: number, noiseType: NoisesType) => {
  const newData = new Uint8ClampedArray(data);
  for (let i = 0; i < newData.length; i += 4) {
    let noise = 0;
    switch (noiseType) {
      case NoisesType.GAUSSIAN:
        noise = generateGaussianNoise(0, noiseLevel);
        break;
      case NoisesType.RAYLEIGH:
        noise = generateRayleighNoise(noiseLevel);
        break;
      case NoisesType.IMPULSE:
        noise = generateImpulseNoise(noiseLevel / 100);
        break;
      default:
        break;
    }
    newData[i] += noise;       // Red
    newData[i + 1] += noise;   // Green
    newData[i + 2] += noise;   // Blue
  }
  return newData;
};

export const applyNoiseToImage = (
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  noiseLevel: number,
  noiseType: NoisesType
) => {

  if (!image || !modImage) return;

  const canvasData = canvasImageData(image);
  if (!canvasData) {
    return;
  }
  const {data, imageData, canvas, ctx} = canvasData;

  const newData = applyNoiseToData(data, noiseLevel, noiseType);

  updateCanvasImage({imageData, newData, modImage, canvas, ctx});
};