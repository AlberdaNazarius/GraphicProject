import {canvasImageData, updateCanvasImage} from "@/utils/imageUtils";
import {NoisesRemovalType} from "@/types/noises";

const applyMeanFilterToData = (data: Uint8ClampedArray, width: number, height: number, filterSize: number) => {
  const outputData = new Uint8ClampedArray(data);
  const offset = Math.floor(filterSize / 2);

  for (let y = offset; y < height - offset; y++) {
    for (let x = offset; x < width - offset; x++) {
      const idx = (y * width + x) * 4;
      let r = 0, g = 0, b = 0, count = 0;

      // Обчислюємо середнє значення пікселів у вікні фільтра
      for (let dy = -offset; dy <= offset; dy++) {
        for (let dx = -offset; dx <= offset; dx++) {
          const i = ((y + dy) * width + (x + dx)) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }

      // Зберігаємо усереднені значення
      outputData[idx] = r / count;
      outputData[idx + 1] = g / count;
      outputData[idx + 2] = b / count;
    }
  }

  return outputData;
};

const applyGeometricMeanFilterToData = (data: Uint8ClampedArray, width: number, height: number, filterSize: number) => {
  const outputData = new Uint8ClampedArray(data);
  const offset = Math.floor(filterSize / 2);

  for (let y = offset; y < height - offset; y++) {
    for (let x = offset; x < width - offset; x++) {
      const idx = (y * width + x) * 4;
      let rProduct = 1, gProduct = 1, bProduct = 1;
      let count = 0;

      for (let dy = -offset; dy <= offset; dy++) {
        for (let dx = -offset; dx <= offset; dx++) {
          const i = ((y + dy) * width + (x + dx)) * 4;
          rProduct *= data[i] || 1;
          gProduct *= data[i + 1] || 1;
          bProduct *= data[i + 2] || 1;
          count++;
        }
      }

      outputData[idx] = Math.pow(rProduct, 1 / count);
      outputData[idx + 1] = Math.pow(gProduct, 1 / count);
      outputData[idx + 2] = Math.pow(bProduct, 1 / count);
    }
  }

  return outputData;
};

function applyHarmonicFilter(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  windowSize: number = 3
): Uint8ClampedArray {
  const halfWindowSize = Math.floor(windowSize / 2);
  const outputData = new Uint8ClampedArray(imageData.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumReciprocals = 0;
      let count = 0;

      // Проходимо по кожному пікселю у вікні
      for (let dy = -halfWindowSize; dy <= halfWindowSize; dy++) {
        for (let dx = -halfWindowSize; dx <= halfWindowSize; dx++) {
          const nx = x + dx;
          const ny = y + dy;

          // Перевірка, чи знаходиться сусідній піксель у межах зображення
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const index = (ny * width + nx) * 4;
            const pixelValue = imageData[index]; // Вибираємо значення яскравості (червоної складової)

            // Уникаємо поділу на нуль
            if (pixelValue > 0) {
              sumReciprocals += 1 / pixelValue;
              count++;
            }
          }
        }
      }

      // Обчислення гармонійного середнього
      const harmonicMean = count > 0 ? count / sumReciprocals : 0;

      // Записуємо значення у всі канали (R, G, B) та виставляємо альфа-канал у 255
      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = harmonicMean;
      outputData[outputIndex + 1] = harmonicMean;
      outputData[outputIndex + 2] = harmonicMean;
      outputData[outputIndex + 3] = 255; // Альфа-канал
    }
  }

  return outputData;
}

function applyContraharmonicFilter(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  windowSize: number = 3,
  Q: number = 1.5
): Uint8ClampedArray {
  const halfWindowSize = Math.floor(windowSize / 2);
  const outputData = new Uint8ClampedArray(imageData.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumNumerator = 0;
      let sumDenominator = 0;

      // Проходимо по кожному пікселю у вікні
      for (let dy = -halfWindowSize; dy <= halfWindowSize; dy++) {
        for (let dx = -halfWindowSize; dx <= halfWindowSize; dx++) {
          const nx = x + dx;
          const ny = y + dy;

          // Перевірка, чи знаходиться сусідній піксель у межах зображення
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const index = (ny * width + nx) * 4;
            const pixelValue = imageData[index]; // Використовуємо значення яскравості (червоної складової)

            // Обчислення чисельника і знаменника для контрагармонійного середнього
            sumNumerator += Math.pow(pixelValue, Q + 1);
            sumDenominator += Math.pow(pixelValue, Q);
          }
        }
      }

      // Обчислення контрагармонійного середнього
      const contraharmonicMean = sumDenominator !== 0 ? sumNumerator / sumDenominator : 0;

      // Записуємо значення у всі канали (R, G, B) та виставляємо альфа-канал у 255
      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = contraharmonicMean;
      outputData[outputIndex + 1] = contraharmonicMean;
      outputData[outputIndex + 2] = contraharmonicMean;
      outputData[outputIndex + 3] = 255; // Альфа-канал
    }
  }

  return outputData;
}

function applyMedianFilter(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  windowSize: number = 3
): Uint8ClampedArray {
  const halfWindowSize = Math.floor(windowSize / 2);
  const outputData = new Uint8ClampedArray(imageData.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const values = [];

      // Проходимо по кожному пікселю у вікні
      for (let dy = -halfWindowSize; dy <= halfWindowSize; dy++) {
        for (let dx = -halfWindowSize; dx <= halfWindowSize; dx++) {
          const nx = x + dx;
          const ny = y + dy;

          // Перевірка, чи знаходиться сусідній піксель у межах зображення
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const index = (ny * width + nx) * 4;
            const pixelValue = imageData[index]; // Використовуємо значення яскравості (червоної складової)
            values.push(pixelValue);
          }
        }
      }

      // Сортуємо значення і беремо медіану
      values.sort((a, b) => a - b);
      const medianValue = values[Math.floor(values.length / 2)];

      // Записуємо медіанне значення у всі канали (R, G, B) та виставляємо альфа-канал у 255
      const outputIndex = (y * width + x) * 4;
      outputData[outputIndex] = medianValue;
      outputData[outputIndex + 1] = medianValue;
      outputData[outputIndex + 2] = medianValue;
      outputData[outputIndex + 3] = 255; // Альфа-канал
    }
  }

  return outputData;
}

export const applyNoiseRemovalFiler = (
  image: HTMLImageElement | null,
  modImage: HTMLImageElement | null,
  filterSize: number,
  q: number,
  type: NoisesRemovalType
) => {
  if (!image || !modImage) return;

  const canvasData = canvasImageData(image);
  if (!canvasData) {
    return;
  }
  const {data, imageData, canvas, ctx} = canvasData;

  let newData = new Uint8ClampedArray(data);

  switch (type) {
    case NoisesRemovalType.MEAN:
      newData = applyMeanFilterToData(data, canvas.width, canvas.height, filterSize);
      break;
    case NoisesRemovalType.GEOMETRIC_MEAN:
      newData = applyGeometricMeanFilterToData(data, canvas.width, canvas.height, filterSize);
      break;
    case NoisesRemovalType.HARMONIC_MEAN:
      newData = applyHarmonicFilter(data, canvas.width, canvas.height, filterSize);
      break;
    case NoisesRemovalType.CONTRAHARMONIC_MEAN:
      newData = applyContraharmonicFilter(data, canvas.width, canvas.height, filterSize, q);
      break;
    case NoisesRemovalType.MEDIAN:
      newData = applyMedianFilter(data, canvas.width, canvas.height, filterSize);
      break;
  }

  updateCanvasImage({imageData, newData, modImage, canvas, ctx});
}