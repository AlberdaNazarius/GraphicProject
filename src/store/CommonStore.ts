import {create} from 'zustand'

type CommonStore = {
  image: string
  setImage: (ref: string) => void
}

const useCommonStore = create<CommonStore>()((set) => ({
  image: '',
  setImage: (ref: string) => set(() => ({image: ref})),
}))

export default useCommonStore;