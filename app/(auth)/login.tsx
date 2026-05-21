import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
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

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    if (!email.includes('@')) {
      setError('이메일 주소를 확인해 주세요.');
      return;
    }
    if (password.length < 4) {
      setError('비밀번호를 입력해 주세요.');
      return;
    }
    try {
      setBusy(true);
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch {
      setError('로그인 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.');
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
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <BrandWordmark size="lg" />
          <View style={{ marginTop: 24 }}>
            <IntroBadge label="Welcome Back" />
          </View>
        </View>

        <Text
          variant="displayKr"
          size={24}
          color={colors.mochaDark}
          style={{ textAlign: 'center', lineHeight: 32 }}
        >
          다시 만나서 반가워요.
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
          오늘의 카페를 붙여볼까요?
        </Text>

        <View style={{ marginTop: 36, position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              top: -10,
              left: 28,
              zIndex: 2,
            }}
          >
            <MaskingTape color="sage" width={66} height={18} rotation={-4} />
          </View>
          <PaperCard rotation={-0.5} padding={22}>
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
                {busy ? '입장 중...' : '도감 열기'}
              </Text>
            </Pressable>
          </PaperCard>
        </View>

        <View style={{ alignItems: 'center', marginTop: 28 }}>
          <Text variant="bodyKr" size={13} color={colors.mochaLight}>
            아직 회원이 아니신가요?
          </Text>
          <Link href="/(auth)/signup" asChild>
            <Pressable style={{ marginTop: 6 }}>
              <Text variant="labelKr" size={14} color={colors.honey}>
                새 스티커북 만들기
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words';
};

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: FieldProps) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text
        variant="mono"
        size={9}
        letterSpacing={2}
        uppercase
        color={colors.mochaLight}
        style={{ marginBottom: 6 }}
      >
        {label}
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors.paperLine,
          paddingBottom: 4,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'rgba(122,92,69,0.45)'}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType ?? 'default'}
          autoCapitalize={autoCapitalize ?? 'none'}
          style={{
            fontFamily: 'Pretendard-Medium',
            fontSize: 16,
            color: colors.mochaDark,
            paddingVertical: 6,
          }}
        />
      </View>
    </View>
  );
}
