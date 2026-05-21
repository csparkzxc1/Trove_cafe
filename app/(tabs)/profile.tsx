import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DrinkIcon, StarIcon } from '@/components/icons';
import { BrandWordmark } from '@/components/BrandWordmark';
import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { useAllCafes } from '@/lib/cafes';
import { useAuthStore } from '@/stores/auth';
import { useVisitsStore, type Visit } from '@/stores/visits';
import type { AppCafe } from '@/lib/cafes';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const visits = useVisitsStore((s) => s.visits);
  const allCafes = useAllCafes();

  const stats = useMemo(() => {
    const cafeById = new Map(allCafes.map((c) => [c.id, c] as const));
    const districts = new Set(
      visits.map((v) => cafeById.get(v.cafeId)?.district).filter(Boolean),
    );
    const avg =
      visits.length === 0
        ? '- -'
        : (visits.reduce((acc, v) => acc + v.rating, 0) / visits.length).toFixed(1);
    return {
      count: visits.length,
      districts: districts.size,
      avg,
    };
  }, [visits, allCafes]);

  async function handleSignOut() {
    await signOut();
    router.replace('/(auth)/login');
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.latte }}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 20,
        paddingBottom: 48,
      }}
    >
      <View style={{ alignItems: 'center', paddingVertical: 16 }}>
        <BrandWordmark size="sm" />
      </View>

      <View style={{ marginTop: 24, position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: 30,
            zIndex: 2,
          }}
        >
          <MaskingTape color="dusty" width={70} height={20} rotation={-4} />
        </View>
        <PaperCard rotation={-0.6} padding={24}>
          <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.mochaLight}>
            Member Card
          </Text>
          <Text
            variant="displayKr"
            size={26}
            color={colors.mochaDark}
            style={{ marginTop: 12 }}
          >
            {user?.displayName ?? '게스트'}
          </Text>
          <Text variant="bodyKr" size={13} color={colors.mochaLight} style={{ marginTop: 4 }}>
            {user?.email ?? 'guest@trove.cafe'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginTop: 18,
              paddingTop: 14,
              borderTopWidth: 1,
              borderColor: colors.paperLine,
              borderStyle: 'dashed',
            }}
          >
            <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
              {user?.memberNumber ?? 'No 0000'}
            </Text>
            <Text variant="monoBold" size={11} color={colors.honey}>
              EST. 2026
            </Text>
          </View>
        </PaperCard>
      </View>

      <View style={{ marginTop: 32 }}>
        <Text variant="titleKr" size={16} color={colors.mochaDark} style={{ marginBottom: 12 }}>
          이번 달
        </Text>
        <PaperCard padding={20} shadow="sticker">
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <StatBox value={stats.count.toString()} label="붙인 스티커" />
            <StatBox value={stats.districts.toString()} label="동네" />
            <StatBox
              value={stats.avg === '- -' ? '- -' : `★ ${stats.avg}`}
              label="평균 별점"
            />
          </View>
        </PaperCard>
      </View>

      <View style={{ marginTop: 32 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 12,
          }}
        >
          <Text variant="titleKr" size={16} color={colors.mochaDark}>
            지난 방문
          </Text>
          <Text
            variant="mono"
            size={9}
            letterSpacing={1.5}
            uppercase
            color={colors.mochaLight}
          >
            recent visits
          </Text>
        </View>
        {visits.length === 0 ? (
          <View
            style={{
              paddingVertical: 28,
              alignItems: 'center',
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: colors.paperLineStrong,
              borderStyle: 'dashed',
            }}
          >
            <Text
              variant="handwriteReg"
              size={18}
              color={colors.mochaLight}
              style={{ transform: [{ rotate: '-1deg' }] }}
            >
              아직 붙인 스티커가 없어요
            </Text>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {visits.slice(0, 6).map((v) => {
              const cafe = allCafes.find((c) => c.id === v.cafeId);
              if (!cafe) return null;
              return (
                <VisitRow
                  key={v.id}
                  visit={v}
                  cafe={cafe}
                  onPress={() => router.push(`/cafe/${cafe.id}`)}
                />
              );
            })}
          </View>
        )}
      </View>

      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => ({
          marginTop: 36,
          alignSelf: 'center',
          paddingHorizontal: 22,
          paddingVertical: 12,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: colors.paperLineStrong,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text variant="labelKr" size={13} color={colors.mochaLight}>
          로그아웃
        </Text>
      </Pressable>

      <View style={{ marginTop: 32, alignItems: 'center' }}>
        <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.mochaLight}>
          Prototype · 2026.05.21
        </Text>
      </View>
    </ScrollView>
  );
}

function VisitRow({
  visit,
  cafe,
  onPress,
}: {
  visit: Visit;
  cafe: AppCafe;
  onPress: () => void;
}) {
  const d = new Date(visit.visitedAt);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 12,
        borderRadius: 14,
        backgroundColor: colors.cream,
        borderWidth: 1,
        borderColor: colors.paperLine,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: colors.latteDark,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {visit.photoUri ? (
          <Image source={{ uri: visit.photoUri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        ) : (
          <DrinkIcon iconKey={cafe.icon} size={32} color={colors.mocha} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="titleKr" size={15} color={colors.mochaDark} numberOfLines={1}>
          {cafe.name}
        </Text>
        <Text
          variant="mono"
          size={8}
          letterSpacing={1.4}
          uppercase
          color={colors.mochaLight}
          style={{ marginTop: 2 }}
        >
          {cafe.district} · {mm}.{dd}
        </Text>
        {visit.orderedMenu ? (
          <Text
            variant="handwriteReg"
            size={15}
            color={colors.honey}
            style={{ marginTop: 2, transform: [{ rotate: '-1deg' }] }}
            numberOfLines={1}
          >
            {visit.orderedMenu}
          </Text>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', gap: 2 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon
            key={n}
            size={9}
            color={n <= visit.rating ? colors.honey : colors.paperLineStrong}
            filled={n <= visit.rating}
          />
        ))}
      </View>
    </Pressable>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text variant="monoBold" size={16} color={colors.mocha}>
        {value}
      </Text>
      <Text
        variant="mono"
        size={8}
        letterSpacing={1.6}
        uppercase
        color={colors.mochaLight}
        style={{ marginTop: 4 }}
      >
        {label}
      </Text>
    </View>
  );
}
