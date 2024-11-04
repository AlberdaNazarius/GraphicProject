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
  const noise = sigma * Math.sqrt(-2.0 * Math.log(1 - u));

  // Зміщення шуму так, щоб він мав середнє значення, близьке до 0
  return noise - sigma * Math.sqrt(Math.PI / 2);
};

const generateImpulseNoise = (blackProbability: number, whiteProbability: number) => {
  const random = Math.random();

  if (random < blackProbability) return -255; // Чорний імпульс
  if (random < blackProbability + whiteProbability) return 255; // Білий імпульс
  return 0; // Без змін
};

const applyNoiseToData = (
  data: Uint8ClampedArray,
  noiseLevel: number,
  mean: number,
  noiseType: NoisesType,
  blackProp: number,
  whiteProb: number
) => {
  const newData = new Uint8ClampedArray(data);
  for (let i = 0; i < newData.length; i += 4) {
    let noise = 0;
    switch (noiseType) {
      case NoisesType.GAUSSIAN:
        noise = generateGaussianNoise(mean, noiseLevel);
        break;
      case NoisesType.RAYLEIGH:
        noise = generateRayleighNoise(noiseLevel);
        break;
      case NoisesType.IMPULSE:
        noise = generateImpulseNoise(blackProp, whiteProb);
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
  mean: number,
  noiseType: NoisesType,
  blackProp: number,
  whiteProb: number
) => {

  if (!image || !modImage) return;

  const canvasData = canvasImageData(image);
  if (!canvasData) {
    return;
  }
  const {data, imageData, canvas, ctx} = canvasData;

  const newData = applyNoiseToData(data, noiseLevel, mean, noiseType, blackProp, whiteProb);

  updateCanvasImage({imageData, newData, modImage, canvas, ctx});
};