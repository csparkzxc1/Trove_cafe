import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SortMode = 'default' | 'recent' | 'rating';

type SettingsState = {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  hasDismissedOnboarding: boolean;
  dismissOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      sortMode: 'default',
      setSortMode: (mode) => set({ sortMode: mode }),
      hasDismissedOnboarding: false,
      dismissOnboarding: () => set({ hasDismissedOnboarding: true }),
      resetOnboarding: () => set({ hasDismissedOnboarding: false }),
    }),
    {
      name: 'trove-cafe-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
