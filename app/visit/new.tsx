import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip } from '@/components/ui/Chip';
import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { PhotoPicker } from '@/components/ui/PhotoPicker';
import { StarRating } from '@/components/ui/StarRating';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { VIBES_SEED, vibesForCafeId } from '@/constants/vibes';
import { useAllCafes, useCafe } from '@/lib/cafes';
import { useVisitById, useVisitsStore } from '@/stores/visits';

export default function NewVisitScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cafe: cafeParam, visit: visitParam } = useLocalSearchParams<{
    cafe?: string;
    visit?: string;
  }>();
  const editing = useVisitById(visitParam);
  const addVisit = useVisitsStore((s) => s.addVisit);
  const updateVisit = useVisitsStore((s) => s.updateVisit);
  const allCafes = useAllCafes();

  const initialCafeId = editing?.cafeId ?? cafeParam ?? null;

  const [cafeId, setCafeId] = useState<string | null>(initialCafeId);
  const [photoUri, setPhotoUri] = useState<string | null>(editing?.photoUri ?? null);
  const [orderedMenu, setOrderedMenu] = useState(editing?.orderedMenu ?? '');
  const [rating, setRating] = useState(editing?.rating ?? 4);
  const [notes, setNotes] = useState(editing?.notes ?? '');
  const [vibes, setVibes] = useState<string[]>(editing?.vibes ?? []);
  const [busy, setBusy] = useState(false);

  const selectedCafe = useCafe(cafeId ?? undefined);
  const isEditing = !!editing;

  const suggestedVibes = useMemo(() => {
    if (!cafeId) return VIBES_SEED.slice(0, 8);
    const matching = vibesForCafeId(cafeId);
    const matched = new Set(matching.map((v) => v.label));
    return [...matching, ...VIBES_SEED.filter((v) => !matched.has(v.label))].slice(0, 10);
  }, [cafeId]);

  function toggleVibe(label: string) {
    setVibes((curr) =>
      curr.includes(label) ? curr.filter((v) => v !== label) : [...curr, label],
    );
  }

  async function handleSave() {
    if (!cafeId || !selectedCafe) {
      Alert.alert('카페를 선택해 주세요', '어디 다녀오셨는지 알려주세요.');
      return;
    }
    if (!orderedMenu.trim()) {
      Alert.alert('주문한 메뉴를 적어주세요', '뭘 드셨는지 한 줄만 남겨주세요.');
      return;
    }
    try {
      setBusy(true);
      if (isEditing && editing) {
        updateVisit(editing.id, {
          cafeId,
          photoUri,
          orderedMenu: orderedMenu.trim(),
          rating,
          notes: notes.trim(),
          vibes,
        });
      } else {
        addVisit({
          cafeId,
          photoUri,
          orderedMenu: orderedMenu.trim(),
          rating,
          notes: notes.trim(),
          vibes,
        });
      }
      router.back();
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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text variant="mono" size={11} letterSpacing={1.5} color={colors.mochaLight}>
              ← cancel
            </Text>
          </Pressable>
          <Text variant="mono" size={9} letterSpacing={2.4} uppercase color={colors.honey}>
            {isEditing ? 'Edit Sticker' : 'New Sticker'}
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 14, marginBottom: 22 }}>
          <Text
            variant="displayKr"
            size={26}
            color={colors.mochaDark}
            style={{ textAlign: 'center', lineHeight: 34 }}
          >
            {isEditing ? '스티커 다시 붙이기' : '오늘의 스티커'}
          </Text>
          <Text
            variant="handwriteReg"
            size={19}
            color={colors.mochaLight}
            style={{ marginTop: 6, transform: [{ rotate: '-1deg' }] }}
          >
            {isEditing ? '한 줄만 고쳐도 좋아요' : '방금 어땠어요?'}
          </Text>
        </View>

        <Animated.View entering={FadeInDown.duration(500)} style={{ position: 'relative' }}>
          <View style={{ position: 'absolute', top: -10, left: 28, zIndex: 2 }}>
            <MaskingTape color="dusty" width={66} height={18} rotation={-4} />
          </View>
          <PaperCard rotation={-0.4} padding={18} shadow="polaroid">
            <PhotoPicker value={photoUri} onChange={setPhotoUri} />
          </PaperCard>
        </Animated.View>

        <View
          style={{
            marginTop: 28,
            marginBottom: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.honey}>
              Cafe
            </Text>
            <Text variant="labelKr" size={13} color={colors.mochaDark}>
              어디 다녀오셨나요
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/cafe/new')}
            hitSlop={6}
          >
            <Text variant="handwriteReg" size={17} color={colors.honey}>
              + 새 카페
            </Text>
          </Pressable>
        </View>
        <PaperCard padding={4} shadow="sticker" rotation={0.3}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8, gap: 8 }}
          >
            {allCafes.map((c) => {
              const active = c.id === cafeId;
              return (
                <Pressable
                  key={c.id}
                  onPress={() => setCafeId(c.id)}
                  style={({ pressed }) => ({
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 999,
                    backgroundColor: active ? colors.mocha : colors.latte,
                    borderWidth: 1,
                    borderColor: active ? colors.mocha : colors.paperLine,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Text
                    variant="labelKr"
                    size={13}
                    color={active ? colors.cream : colors.mochaDark}
                  >
                    {c.name}
                  </Text>
                  <Text
                    variant="mono"
                    size={8}
                    letterSpacing={1.4}
                    uppercase
                    color={active ? colors.honeyLight : colors.mochaLight}
                    style={{ marginTop: 2 }}
                  >
                    {c.district}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </PaperCard>

        <SectionLabel mono="Order" kr="주문한 메뉴" />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.paperLine,
            paddingBottom: 4,
            marginTop: 4,
          }}
        >
          <TextInput
            value={orderedMenu}
            onChangeText={setOrderedMenu}
            placeholder={
              selectedCafe ? `예) ${selectedCafe.signature_menu}` : '예) 플랫화이트 + 크로플'
            }
            placeholderTextColor={'rgba(122,92,69,0.45)'}
            style={{
              fontFamily: 'Caveat-Medium',
              fontSize: 22,
              color: colors.honey,
              paddingVertical: 10,
            }}
          />
        </View>

        <SectionLabel mono="Rating" kr="별점" />
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <StarRating value={rating} onChange={setRating} />
          <Text
            variant="mono"
            size={9}
            letterSpacing={1.6}
            uppercase
            color={colors.mochaLight}
            style={{ marginTop: 8 }}
          >
            {rating} of 5
          </Text>
        </View>

        <SectionLabel mono="Vibes" kr="이 카페의 분위기" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
          {suggestedVibes.map((v) => {
            const active = vibes.includes(v.label);
            return (
              <Pressable key={v.label} onPress={() => toggleVibe(v.label)}>
                <Chip
                  label={v.label}
                  variant={active ? v.display_color : 'cream'}
                  style={{ opacity: active ? 1 : 0.7 }}
                />
              </Pressable>
            );
          })}
        </View>

        <SectionLabel mono="Note" kr="기억하고 싶은 한 줄" />
        <View
          style={{
            backgroundColor: colors.cream,
            borderRadius: 10,
            padding: 14,
            marginTop: 6,
            borderWidth: 1,
            borderColor: colors.paperLine,
            minHeight: 90,
          }}
        >
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="햇살이 들어오는 자리"
            placeholderTextColor={'rgba(122,92,69,0.45)'}
            multiline
            style={{
              fontFamily: 'Pretendard-Medium',
              fontSize: 14,
              color: colors.mochaDark,
              minHeight: 60,
              textAlignVertical: 'top',
            }}
          />
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
            {busy
              ? isEditing
                ? '다시 붙이는 중...'
                : '도감에 붙이는 중...'
              : isEditing
                ? '바꿔서 다시 붙이기'
                : '스티커 붙이기'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
