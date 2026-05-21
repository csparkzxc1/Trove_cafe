import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

const url =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  extra.supabaseUrl ??
  'https://stub.supabase.co';

const anon =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  extra.supabaseAnonKey ??
  'stub-anon-key';

export const supabase = createClient(url, anon, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const isSupabaseConfigured = url !== 'https://stub.supabase.co';
