import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SeedCafe } from '@/constants/cafes-seed';

export type UserCafe = SeedCafe & {
  createdAt: string;
};

type NewCafeInput = Omit<UserCafe, 'id' | 'createdAt'>;

type UserCafesState = {
  cafes: UserCafe[];
  addCafe: (input: NewCafeInput) => UserCafe;
  removeCafe: (id: string) => void;
};

function makeId(): string {
  return `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export const useUserCafesStore = create<UserCafesState>()(
  persist(
    (set) => ({
      cafes: [],
      addCafe: (input) => {
        const cafe: UserCafe = {
          ...input,
          id: makeId(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ cafes: [cafe, ...s.cafes] }));
        return cafe;
      },
      removeCafe: (id) =>
        set((s) => ({ cafes: s.cafes.filter((c) => c.id !== id) })),
    }),
    {
      name: 'trove-cafe-user-cafes',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
