import { create } from "zustand"

type Item = {
  name: string | number;
}

type Pokemon = {
  addItem: (item: Item['name']) => void
}


export const usePokeStore = create<Pokemon & Item>((set) => ({
    name: 'ditto',
    addItem: (item) => set(() => ({name : item})),

}))

