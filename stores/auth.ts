import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  displayName: string;
  memberNumber: string;
};

type AuthState = {
  user: User | null;
  signIn: (email: string, _password: string) => Promise<void>;
  signUp: (email: string, _password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

function makeMemberNumber(): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `No ${n}`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: async (email) => {
        set({
          user: {
            id: 'local-user',
            email,
            displayName: email.split('@')[0] || '게스트',
            memberNumber: makeMemberNumber(),
          },
        });
      },
      signUp: async (email, _password, displayName) => {
        set({
          user: {
            id: 'local-user',
            email,
            displayName: displayName || email.split('@')[0] || '게스트',
            memberNumber: makeMemberNumber(),
          },
        });
      },
      signOut: async () => {
        set({ user: null });
      },
    }),
    {
      name: 'trove-cafe-auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
