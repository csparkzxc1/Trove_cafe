import { Redirect } from 'expo-router';

import { useAuthStore } from '@/stores/auth';

export default function Index() {
  const user = useAuthStore((s) => s.user);
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  return <Redirect href="/(tabs)" />;
}
