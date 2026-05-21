import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandWordmark } from '@/components/BrandWordmark';
import { IntroBadge } from '@/components/ui/IntroBadge';
import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth';

import { FormField } from './login';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    if (displayName.trim().length < 1) {
      setError('이름을 입력해 주세요.');
      return;
    }
    if (!email.includes('@')) {
      setError('이메일 주소를 확인해 주세요.');
      return;
    }
    if (password.length < 4) {
      setError('비밀번호는 4자 이상이어야 해요.');
      return;
    }
    try {
      setBusy(true);
      await signUp(email.trim(), password, displayName.trim());
      router.replace('/(tabs)');
    } catch {
      setError('가입 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: colors.latte }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 36,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 32,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <BrandWordmark size="lg" />
          <View style={{ marginTop: 24 }}>
            <IntroBadge label="New Sticker Book" />
          </View>
        </View>

        <Text
          variant="displayKr"
          size={24}
          color={colors.mochaDark}
          style={{ textAlign: 'center', lineHeight: 32 }}
        >
          첫 페이지를 열어볼게요.
        </Text>
        <Text
          variant="handwriteReg"
          size={19}
          color={colors.mochaLight}
          style={{
            textAlign: 'center',
            marginTop: 8,
            transform: [{ rotate: '-1deg' }],
          }}
        >
          어디부터 모아볼까요?
        </Text>

        <View style={{ marginTop: 32, position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              top: -10,
              right: 32,
              zIndex: 2,
            }}
          >
            <MaskingTape color="honey" width={66} height={18} rotation={3} />
          </View>
          <PaperCard rotation={0.4} padding={22}>
            <FormField
              label="이름"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="당신을 부를 이름"
              autoCapitalize="words"
            />
            <FormField
              label="이메일"
              value={email}
              onChangeText={setEmail}
              placeholder="you@trove.cafe"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormField
              label="비밀번호"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            {error ? (
              <Text
                variant="bodyKr"
                size={12}
                color={colors.dusty}
                style={{ marginTop: 6 }}
              >
                {error}
              </Text>
            ) : null}

            <Pressable
              onPress={handleSubmit}
              disabled={busy}
              style={({ pressed }) => ({
                marginTop: 16,
                paddingVertical: 14,
                borderRadius: 999,
                backgroundColor: colors.mocha,
                alignItems: 'center',
                opacity: pressed || busy ? 0.8 : 1,
              })}
            >
              <Text variant="labelKr" size={14} color={colors.cream}>
                {busy ? '준비 중...' : '스티커북 만들기'}
              </Text>
            </Pressable>
          </PaperCard>
        </View>

        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Text variant="bodyKr" size={13} color={colors.mochaLight}>
            이미 도감이 있으신가요?
          </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable style={{ marginTop: 6 }}>
              <Text variant="labelKr" size={14} color={colors.honey}>
                로그인하기
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
