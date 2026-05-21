import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PolaroidCard } from '@/components/PolaroidCard';
import { Chip } from '@/components/ui/Chip';
import { Text } from '@/components/ui/Text';
import { findCafe } from '@/constants/cafes-seed';
import { colors } from '@/constants/theme';
import { VIBES_SEED, vibesForCafeId, type VibeColor } from '@/constants/vibes';
import { useVisitForCafe, useVisitsStore } from '@/stores/visits';

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
  const cafe = id ? findCafe(id) : undefined;
  const visit = useVisitForCafe(id ?? '');
  const removeVisit = useVisitsStore((s) => s.removeVisit);

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

        <Animated.View entering={FadeInDown.duration(700)}>
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
        </Animated.View>

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
          <Pressable
            onPress={confirmRemove}
            style={({ pressed }) => ({
              marginTop: 40,
              alignSelf: 'center',
              paddingHorizontal: 24,
              paddingVertical: 12,
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
        ) : (
          <Pressable
            onPress={() => router.push(`/visit/new?cafe=${cafe.id}`)}
            style={({ pressed }) => ({
              marginTop: 40,
              alignSelf: 'center',
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
        )}

        {!visit ? (
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
        ) : null}
      </ScrollView>
    </View>
  );
}
