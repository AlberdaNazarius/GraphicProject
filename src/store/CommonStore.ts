import {create} from 'zustand'

type CommonStore = {
  imageUrl: string
  setImageUrl: (ref: string) => void
  imageData: Uint8ClampedArray
  setImageData: (data: Uint8ClampedArray) => void
}

const useCommonStore = create<CommonStore>()((set) => ({
  imageUrl: '',
  setImageUrl: (ref: string) => set(() => ({imageUrl: ref})),
  imageData: new Uint8ClampedArray(0),
  setImageData: (data: Uint8ClampedArray) => set(() => ({imageData: data}))
}))

export default useCommonStore;