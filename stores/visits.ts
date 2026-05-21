import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ImageBgVariant } from '@/constants/theme';

export type Visit = {
  id: string;
  cafeId: string;
  photoUri: string | null;
  visitedAt: string;
  orderedMenu: string;
  rating: number;
  notes: string;
  vibes: string[];
  rotationDeg: number;
  imageBg: ImageBgVariant;
};

type NewVisitInput = Omit<Visit, 'id' | 'rotationDeg' | 'imageBg' | 'visitedAt'> & {
  visitedAt?: string;
};

type VisitsState = {
  visits: Visit[];
  addVisit: (input: NewVisitInput) => Visit;
  removeVisit: (id: string) => void;
  reset: () => void;
};

const IMG_BG_POOL: ImageBgVariant[] = ['pink', 'mocha', 'honey', 'sage', 'cream'];

function randomRotation(): number {
  const choices = [-2.5, -1.5, -1, 1.5, 2, 2.5];
  return choices[Math.floor(Math.random() * choices.length)];
}

function randomBg(seed: number): ImageBgVariant {
  return IMG_BG_POOL[seed % IMG_BG_POOL.length];
}

function makeId(): string {
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export const useVisitsStore = create<VisitsState>()(
  persist(
    (set, get) => ({
      visits: [],
      addVisit: (input) => {
        const visit: Visit = {
          id: makeId(),
          cafeId: input.cafeId,
          photoUri: input.photoUri,
          orderedMenu: input.orderedMenu,
          rating: input.rating,
          notes: input.notes,
          vibes: input.vibes,
          visitedAt: input.visitedAt ?? new Date().toISOString(),
          rotationDeg: randomRotation(),
          imageBg: randomBg(get().visits.length),
        };
        set((s) => ({ visits: [visit, ...s.visits] }));
        return visit;
      },
      removeVisit: (id) =>
        set((s) => ({ visits: s.visits.filter((v) => v.id !== id) })),
      reset: () => set({ visits: [] }),
    }),
    {
      name: 'trove-cafe-visits',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function useLatestVisit(): Visit | undefined {
  return useVisitsStore((s) => s.visits[0]);
}

export function useVisitForCafe(cafeId: string): Visit | undefined {
  return useVisitsStore((s) => s.visits.find((v) => v.cafeId === cafeId));
}
