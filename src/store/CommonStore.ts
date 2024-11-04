import {create} from 'zustand'

type CommonStore = {
  imageUrl: string;
  setImageUrl: (ref: string) => void;

  imageData: Uint8ClampedArray | null;
  setImageData: (data: Uint8ClampedArray) => void;

  modifiedImageData: Uint8ClampedArray | null;
  setModifiedImageData: (data: Uint8ClampedArray) => void;

  equalize: boolean;
  setEqualize: (value: boolean) => void;
}

const useCommonStore = create<CommonStore>()((set) => ({
  imageUrl: '',
  setImageUrl: (ref: string) => set(() => ({imageUrl: ref})),
  imageData: null,
  setImageData: (data: Uint8ClampedArray) => set(() => ({imageData: data})),
  modifiedImageData: null,
  setModifiedImageData: (data: Uint8ClampedArray) => set(() => ({modifiedImageData: data})),
  equalize: false,
  setEqualize: (value: boolean) => set(() => ({equalize: value})),
}))

export default useCommonStore;