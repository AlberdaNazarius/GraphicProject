export type Kernel = {
  title: string;
  kernel: number[][];
};

export const filters: Record<string, Kernel> = {
  smoothing_1: {
    title: "Smoothing",
    kernel: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  gaussianBlur3: {
    title: "Gaussian Blur Kernel (3x3)",
    kernel: [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1]
    ]
  },
  gaussLowPass: {
    title: "Gauss (Low Pass)",
    kernel: [
      [13, 8, 13],
      [8, 5, 8],
      [13, 8, 13]
    ]
  },
  gaussHighPass: {
    title: "Gauss (High Pass)",
    kernel: [
      [0, 0, -1, 0, 0],
      [0, -1, -2, -1, 0],
      [-1, -2, 16, -2, -1],
      [0, -1, -2, -1, 0],
      [0, 0, -1, 0, 0],
    ]
  },
  gaussianBlurKernel5: {
    title: "Gaussian Blur Kernel (5x5)",
    kernel: [
      [2, 7, 12, 7, 2],
      [7, 31, 52, 31, 7],
      [12, 52, 127, 52, 12],
      [7, 31, 52, 31, 7],
      [2, 7, 12, 7, 2]
    ]
  },
  laplaceHighPassKernel3: {
    title: "Laplace High Pass Kernel (3x3)",
    kernel: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1]
    ]
  },
  laplaceLowPassKernel3: {
    title: "Laplace low Pass Kernel (3x3)",
    kernel: [
      [0, -1, 0],
      [-1, 4, -1],
      [0, -1, 0]
    ]
  },
  laplaceHighPassKernel5: {
    title: "Laplace High Pass Kernel (5x5)",
    kernel: [
      [-1, -3, -4, -3, -1],
      [-3, 0, 6, 0, -3],
      [-4, 6, 20, 6, -4],
      [-3, 0, 6, 0, -3],
      [-1, -3, -4, -3, -1]
    ]
  },
  prewittGradientFilterVertical: {
    title: 'Prewitt Gradient Filter (vertical)',
    kernel: [
      [-1, 0, 1],
      [-1, 0, 1],
      [-1, 0, 1]
    ]
  },
  prewittGradientFilterHorizontal: {
    title: 'Prewitt Gradient Filter (horizontal)',
    kernel: [
      [1, 1, 1],
      [0, 0, 0],
      [-1, -1, -1]
    ]
  },
  sobelGradientFilterVertical: {
    title: 'Sobel Gradient Filter (vertical)',
    kernel: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ]
  },
  sobelGradientFilterHorizontal: {
    title: 'Sobel Gradient Filter (horizontal)',
    kernel: [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1]
    ]
  },
  hipass: {
    title: 'Hipass',
    kernel: [
      [-1, -1, -1],
      [-1, 9, -1],
      [-1, -1, -1]
    ]
  },
  sharpen: {
    title: 'Sharpen',
    kernel: [
      [-1, -1, -1],
      [-1, 16, -1],
      [-1, -1, -1]
    ]
  },
  softening: {
    title: 'Softening',
    kernel: [
      [2, 2, 2],
      [2, 0, 2],
      [2, 2, 2]
    ]
  },
  edgeDetection: {
    title: 'Edge Detection',
    kernel: [
      [1, 1, 1],
      [1, -2, 1],
      [-1, -1, -1]
    ]
  },
};
