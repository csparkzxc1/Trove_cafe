import { useMemo } from 'react';

import { CAFES_SEED, type SeedCafe } from '@/constants/cafes-seed';
import { useUserCafesStore, type UserCafe } from '@/stores/cafes';

export type AppCafe = SeedCafe | UserCafe;

export function isUserCafe(cafe: AppCafe): cafe is UserCafe {
  return cafe.id.startsWith('u-');
}

export function useAllCafes(): AppCafe[] {
  const userCafes = useUserCafesStore((s) => s.cafes);
  return useMemo(() => [...userCafes, ...CAFES_SEED], [userCafes]);
}

export function useCafe(id: string | undefined): AppCafe | undefined {
  const all = useAllCafes();
  return useMemo(() => (id ? all.find((c) => c.id === id) : undefined), [all, id]);
}
