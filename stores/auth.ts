import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  displayName: string;
  memberNumber: string;
};

type AuthState = {
  user: User | null;
  isHydrated: boolean;
  signIn: (email: string, _password: string) => Promise<void>;
  signUp: (email: string, _password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  setHydrated: (v: boolean) => void;
};

function makeMemberNumber(): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `No ${n}`;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: true,
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
  setHydrated: (v) => set({ isHydrated: v }),
}));
