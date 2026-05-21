import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DrinkIcon, type DrinkIconKey } from '@/components/icons';
import { Chip } from '@/components/ui/Chip';
import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { Text } from '@/components/ui/Text';
import type { SeedCafe } from '@/constants/cafes-seed';
import { colors } from '@/constants/theme';
import { useUserCafesStore } from '@/stores/cafes';

const CATEGORIES: SeedCafe['category'][] = [
  '스페셜티',
  '디저트',
  '베이커리',
  '브런치',
  '한옥',
  '루프탑',
  '북카페',
];

const ICONS: DrinkIconKey[] = ['cup', 'latte', 'cross', 'cake', 'donut', 'bagel'];

const ICON_LABEL: Record<DrinkIconKey, string> = {
  cup: '커피',
  latte: '라떼',
  cross: '크루아상',
  cake: '케이크',
  donut: '도넛',
  bagel: '베이글',
};

export default function NewCafeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addCafe = useUserCafesStore((s) => s.addCafe);

  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState<SeedCafe['category']>('스페셜티');
  const [signatureMenu, setSignatureMenu] = useState('');
  const [icon, setIcon] = useState<DrinkIconKey>('cup');
  const [busy, setBusy] = useState(false);

  async function handleSave() {
    if (name.trim().length === 0) {
      Alert.alert('카페 이름을 적어주세요', '어디인지 알려주세요.');
      return;
    }
    if (district.trim().length === 0) {
      Alert.alert('동네를 적어주세요', '예) 성수동, 한남동');
      return;
    }
    try {
      setBusy(true);
      const cafe = addCafe({
        name: name.trim(),
        district: district.trim(),
        category,
        signature_menu: signatureMenu.trim() || '시그니처',
        icon,
        note: '곧 가보기',
      });
      router.replace(`/visit/new?cafe=${cafe.id}`);
    } catch {
      Alert.alert('저장이 어렵네요', '잠시 후 다시 시도해 주세요.');
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
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 120,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text variant="mono" size={11} letterSpacing={1.5} color={colors.mochaLight}>
              ← cancel
            </Text>
          </Pressable>
          <Text variant="mono" size={9} letterSpacing={2.4} uppercase color={colors.honey}>
            New Cafe
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 14, marginBottom: 22 }}>
          <Text
            variant="displayKr"
            size={26}
            color={colors.mochaDark}
            style={{ textAlign: 'center', lineHeight: 34 }}
          >
            새 카페를 도감에 등록
          </Text>
          <Text
            variant="handwriteReg"
            size={19}
            color={colors.mochaLight}
            style={{ marginTop: 6, transform: [{ rotate: '-1deg' }] }}
          >
            어디 새로 알게 됐어요?
          </Text>
        </View>

        <View style={{ marginTop: 8, position: 'relative' }}>
          <View style={{ position: 'absolute', top: -10, left: 28, zIndex: 2 }}>
            <MaskingTape color="sage" width={66} height={18} rotation={-4} />
          </View>
          <PaperCard rotation={-0.4} padding={20}>
            <FormRow label="이름">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="예) 오랑우탄 커피"
                placeholderTextColor={'rgba(122,92,69,0.45)'}
                style={textInputStyle}
              />
            </FormRow>
            <FormRow label="동네">
              <TextInput
                value={district}
                onChangeText={setDistrict}
                placeholder="예) 해방촌"
                placeholderTextColor={'rgba(122,92,69,0.45)'}
                style={textInputStyle}
              />
            </FormRow>
            <FormRow label="시그니처 (선택)">
              <TextInput
                value={signatureMenu}
                onChangeText={setSignatureMenu}
                placeholder="예) 콜드브루"
                placeholderTextColor={'rgba(122,92,69,0.45)'}
                style={textInputStyle}
              />
            </FormRow>
          </PaperCard>
        </View>

        <SectionLabel mono="Category" kr="카테고리" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
          {CATEGORIES.map((cat) => {
            const active = cat === category;
            return (
              <Pressable key={cat} onPress={() => setCategory(cat)}>
                <Chip
                  label={cat}
                  variant={active ? 'honey' : 'cream'}
                  style={{ opacity: active ? 1 : 0.75 }}
                />
              </Pressable>
            );
          })}
        </View>

        <SectionLabel mono="Icon" kr="대표 아이콘" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6 }}>
          {ICONS.map((key) => {
            const active = key === icon;
            return (
              <Pressable
                key={key}
                onPress={() => setIcon(key)}
                style={({ pressed }) => ({
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 14,
                  backgroundColor: active ? colors.cream : 'transparent',
                  borderWidth: 1,
                  borderColor: active ? colors.honey : colors.paperLine,
                  opacity: pressed ? 0.85 : 1,
                  minWidth: 78,
                })}
              >
                <DrinkIcon
                  iconKey={key}
                  size={32}
                  color={active ? colors.mocha : colors.mochaLight}
                />
                <Text
                  variant="mono"
                  size={8}
                  letterSpacing={1.4}
                  uppercase
                  color={active ? colors.mocha : colors.mochaLight}
                  style={{ marginTop: 6 }}
                >
                  {ICON_LABEL[key]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: insets.bottom + 14,
          backgroundColor: colors.latte,
          borderTopWidth: 1,
          borderColor: colors.paperLine,
        }}
      >
        <Pressable
          onPress={handleSave}
          disabled={busy}
          style={({ pressed }) => ({
            paddingVertical: 16,
            borderRadius: 999,
            backgroundColor: colors.mocha,
            alignItems: 'center',
            opacity: pressed || busy ? 0.85 : 1,
          })}
        >
          <Text variant="labelKr" size={15} color={colors.cream}>
            {busy ? '추가하는 중...' : '추가하고 스티커 만들기'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const textInputStyle = {
  fontFamily: 'Pretendard-Medium' as const,
  fontSize: 16,
  color: colors.mochaDark,
  paddingVertical: 8,
};

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        variant="mono"
        size={9}
        letterSpacing={2}
        uppercase
        color={colors.mochaLight}
        style={{ marginBottom: 4 }}
      >
        {label}
      </Text>
      <View style={{ borderBottomWidth: 1, borderColor: colors.paperLine, paddingBottom: 2 }}>
        {children}
      </View>
    </View>
  );
}

function SectionLabel({ mono, kr }: { mono: string; kr: string }) {
  return (
    <View
      style={{
        marginTop: 28,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
      }}
    >
      <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.honey}>
        {mono}
      </Text>
      <Text variant="labelKr" size={13} color={colors.mochaDark}>
        {kr}
      </Text>
    </View>
  );
}
