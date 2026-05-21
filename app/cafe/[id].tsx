import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, Share, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PolaroidCard } from '@/components/PolaroidCard';
import { Chip } from '@/components/ui/Chip';
import { FadeInDown, FadeInView } from '@/components/ui/FadeInView';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { VIBES_SEED, vibesForCafeId, type VibeColor } from '@/constants/vibes';
import { isUserCafe, useCafe } from '@/lib/cafes';
import { useUserCafesStore } from '@/stores/cafes';
import { useVisitForCafe, useVisitsStore, type Visit } from '@/stores/visits';
import type { AppCafe } from '@/lib/cafes';
import { CAFES_SEED } from '@/constants/cafes-seed';

export function generateStaticParams(): { id: string }[] {
  return CAFES_SEED.map((c) => ({ id: c.id }));
}

function buildShareText(cafe: AppCafe, visit: Visit): string {
  const stars = '★'.repeat(Math.round(visit.rating)) + '☆'.repeat(5 - Math.round(visit.rating));
  const d = new Date(visit.visitedAt);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const lines: string[] = [];
  lines.push(`📒 ${cafe.name} · ${cafe.district}`);
  if (visit.orderedMenu) lines.push(`☕ ${visit.orderedMenu}`);
  lines.push(`${stars}  ${yyyy}.${mm}.${dd}`);
  if (visit.notes) lines.push(`"${visit.notes}"`);
  if (visit.vibes.length > 0) lines.push(`#${visit.vibes.join(' #')}`);
  lines.push('');
  lines.push('via Trove Cafe — 오늘 카페, 도감에 붙이기.');
  return lines.join('\n');
}

function formatDateLine(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][d.getDay()];
  return `${yyyy}.${mm}.${dd} · ${weekday} · ${hh}:${mi}`;
}

export default function CafeDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const cafe = useCafe(id);
  const visit = useVisitForCafe(id ?? '');
  const removeVisit = useVisitsStore((s) => s.removeVisit);
  const removeUserCafe = useUserCafesStore((s) => s.removeCafe);

  const vibesToShow = useMemo<{ label: string; display_color: VibeColor }[]>(() => {
    if (!cafe) return [];
    if (visit && visit.vibes.length > 0) {
      return visit.vibes.map((label) => {
        const found = VIBES_SEED.find((v) => v.label === label);
        return { label, display_color: found?.display_color ?? 'cream' };
      });
    }
    return vibesForCafeId(cafe.id);
  }, [cafe, visit]);

  if (!cafe) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.latte,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Text variant="handwriteReg" size={22} color={colors.mochaLight} style={{ textAlign: 'center' }}>
          도감에 없는 자리예요.
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ marginTop: 18, paddingHorizontal: 18, paddingVertical: 10 }}
        >
          <Text variant="labelKr" size={14} color={colors.honey}>
            돌아가기
          </Text>
        </Pressable>
      </View>
    );
  }

  function confirmRemove() {
    if (!visit) return;
    Alert.alert('스티커를 떼어낼까요?', '도감에서 이 스티커가 사라져요.', [
      { text: '취소', style: 'cancel' },
      {
        text: '떼어내기',
        style: 'destructive',
        onPress: () => removeVisit(visit.id),
      },
    ]);
  }

  async function handleShare() {
    if (!cafe || !visit) return;
    try {
      await Share.share({
        message: buildShareText(cafe, visit),
      });
    } catch {
      Alert.alert('공유가 어렵네요', '잠시 후 다시 시도해 주세요.');
    }
  }

  function confirmRemoveCafe() {
    if (!cafe) return;
    Alert.alert(
      '도감에서 이 카페를 삭제할까요?',
      visit
        ? '붙여둔 스티커도 함께 사라져요.'
        : '직접 추가한 카페만 삭제할 수 있어요.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            if (visit) removeVisit(visit.id);
            removeUserCafe(cafe.id);
            router.back();
          },
        },
      ],
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.latte }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 4,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              paddingHorizontal: 12,
              paddingVertical: 6,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text variant="mono" size={11} letterSpacing={1.5} color={colors.mochaLight}>
              ← back
            </Text>
          </Pressable>
          <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.mochaLight}>
            Cafe No {cafe.id.replace(/\D/g, '')}
          </Text>
        </View>

        <FadeInView enter={FadeInDown.duration(700)}>
          <PolaroidCard
            nameKo={cafe.name}
            location={`${cafe.district} · ${cafe.category}`}
            iconKey={cafe.icon}
            photoUri={visit?.photoUri ?? null}
            visited={!!visit}
            order={visit?.orderedMenu}
            rating={visit?.rating ?? 0}
            dateLine={visit ? formatDateLine(visit.visitedAt) : '아직 붙이지 않은 스티커'}
            placeholderText="방문 전"
          />
        </FadeInView>

        <View style={{ alignItems: 'center', marginTop: 28 }}>
          <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.honey}>
            Signature
          </Text>
          <Text variant="handwrite" size={28} color={colors.mochaDark} style={{ marginTop: 6 }}>
            {cafe.signature_menu}
          </Text>
          <Text variant="bodyKr" size={13} color={colors.mochaLight} style={{ marginTop: 6 }}>
            이 카페의 시그니처.
          </Text>
        </View>

        {visit?.notes ? (
          <View style={{ marginTop: 28, alignItems: 'center', paddingHorizontal: 12 }}>
            <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.mochaLight} style={{ marginBottom: 8 }}>
              Note
            </Text>
            <Text
              variant="handwriteReg"
              size={20}
              color={colors.mochaDark}
              style={{ textAlign: 'center', lineHeight: 28, transform: [{ rotate: '-0.6deg' }] }}
            >
              {visit.notes}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTopWidth: 1,
            borderColor: colors.paperLine,
            borderStyle: 'dashed',
          }}
        >
          <Text
            variant="mono"
            size={9}
            letterSpacing={2}
            uppercase
            color={colors.mochaLight}
            style={{ textAlign: 'center', marginBottom: 14 }}
          >
            Vibes
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              paddingHorizontal: 12,
            }}
          >
            {vibesToShow.map((v) => (
              <Chip key={v.label} label={v.label} variant={v.display_color} />
            ))}
          </View>
        </View>

        {visit ? (
          <View style={{ marginTop: 40, alignItems: 'center', gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                onPress={() => router.push(`/visit/new?visit=${visit.id}`)}
                style={({ pressed }) => ({
                  paddingHorizontal: 22,
                  paddingVertical: 14,
                  borderRadius: 999,
                  backgroundColor: colors.honey,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text variant="labelKr" size={14} color={colors.cream}>
                  다시 붙이기
                </Text>
              </Pressable>
              <Pressable
                onPress={handleShare}
                style={({ pressed }) => ({
                  paddingHorizontal: 22,
                  paddingVertical: 14,
                  borderRadius: 999,
                  backgroundColor: colors.mocha,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text variant="labelKr" size={14} color={colors.cream}>
                  공유 ↗
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={confirmRemove}
              style={({ pressed }) => ({
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.paperLineStrong,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text variant="labelKr" size={13} color={colors.mochaLight}>
                스티커 떼어내기
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Pressable
              onPress={() => router.push(`/visit/new?cafe=${cafe.id}`)}
              style={({ pressed }) => ({
                paddingHorizontal: 28,
                paddingVertical: 14,
                borderRadius: 999,
                backgroundColor: colors.honey,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text variant="labelKr" size={14} color={colors.cream}>
                방문 기록 남기기
              </Text>
            </Pressable>
            <Text
              variant="handwriteReg"
              size={16}
              color={colors.mochaLight}
              style={{
                textAlign: 'center',
                marginTop: 12,
                transform: [{ rotate: '-1deg' }],
              }}
            >
              사진 한 장이면 충분해요
            </Text>
          </View>
        )}

        {isUserCafe(cafe) ? (
          <Pressable
            onPress={confirmRemoveCafe}
            style={({ pressed }) => ({
              marginTop: 28,
              alignSelf: 'center',
              paddingHorizontal: 18,
              paddingVertical: 8,
              opacity: pressed ? 0.6 : 0.8,
            })}
          >
            <Text variant="mono" size={9} letterSpacing={1.6} uppercase color={colors.dusty}>
              도감에서 이 카페 삭제
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}
