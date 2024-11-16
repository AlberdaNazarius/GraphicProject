import {create} from 'zustand'

type ValueStore = {
  gamma: number;
  setGamma: (gamma: number) => void;

  noiseMean: number;
  setNoiseMean: (mean: number) => void;
  noiseLevel: number;
  setNoiseLevel: (level: number) => void;
  blackDots: number;
  setBlackDots: (dots: number) => void;
  whiteDots: number;
  setWhiteDots: (dots: number) => void;

  filterSize: number;
  setFilterSize: (size: number) => void;
}

const useValueStore = create<ValueStore>((set) => ({
  gamma: 1,
  setGamma: (gamma: number) => set({gamma: gamma}),
  noiseMean: 0,
  setNoiseMean: (mean: number) => set({noiseMean: mean}),
  noiseLevel: 30,
  setNoiseLevel: (level: number) => set({noiseLevel: level}),
  blackDots: 0,
  setBlackDots: (dots: number) => set({blackDots: dots}),
  whiteDots: 0,
  setWhiteDots: (dots: number) => set({whiteDots: dots}),
  filterSize: 3,
  setFilterSize: (size: number) => set({filterSize: size}),
}));

export default useValueStore;