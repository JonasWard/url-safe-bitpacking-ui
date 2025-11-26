import { create } from 'zustand';

interface FileStore {
  file: string | null;
  setFile: (file: string | null) => void;
  bitsShown: boolean;
  setBitsShown: (bitsShown: boolean) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  bitsShown: false,
  setBitsShown: (bitsShown) => set({ bitsShown })
}));
