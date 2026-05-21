import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandFooter } from '@/components/BrandFooter';
import { BrandWordmark } from '@/components/BrandWordmark';
import { DiaryStatBlock } from '@/components/DiaryStatBlock';
import { FilterStrip } from '@/components/FilterStrip';
import { PolaroidCard } from '@/components/PolaroidCard';
import { StickerGrid, type StickerItem } from '@/components/StickerGrid';
import { IntroBadge } from '@/components/ui/IntroBadge';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { useAllCafes } from '@/lib/cafes';
import { useAuthStore } from '@/stores/auth';
import { useVisitsStore, type Visit } from '@/stores/visits';

const MONTH_LABEL = (() => {
  const d = new Date();
  return `${d.getFullYear()} · ${d
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase()}`;
})();

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

export default function CollectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const visits = useVisitsStore((s) => s.visits);
  const allCafes = useAllCafes();
  const [districtFilter, setDistrictFilter] = useState<string | null>(null);
  const [showOnlyVisited, setShowOnlyVisited] = useState(false);

  const cafeById = useMemo(() => {
    const map = new Map<string, (typeof allCafes)[number]>();
    for (const c of allCafes) map.set(c.id, c);
    return map;
  }, [allCafes]);

  const visitByCafe = useMemo(() => {
    const map = new Map<string, Visit>();
    for (const v of visits) {
      if (!map.has(v.cafeId)) map.set(v.cafeId, v);
    }
    return map;
  }, [visits]);

  const filteredCafes = useMemo(() => {
    return allCafes.filter((c) => {
      if (districtFilter && c.district !== districtFilter) return false;
      if (showOnlyVisited && !visitByCafe.has(c.id)) return false;
      return true;
    });
  }, [allCafes, districtFilter, showOnlyVisited, visitByCafe]);

  const items: StickerItem[] = useMemo(
    () =>
      filteredCafes.map((c) => {
        const v = visitByCafe.get(c.id);
        return {
          id: c.id,
          iconKey: c.icon,
          nameKo: c.name,
          meta: `${c.district} · ${c.category}`,
          note: v ? v.orderedMenu || '~' : c.note,
          visited: !!v,
          photoUri: v?.photoUri ?? null,
          rotationOverride: v?.rotationDeg,
          imageBgOverride: v?.imageBg,
          onPress: () => router.push(`/cafe/${c.id}`),
        };
      }),
    [filteredCafes, visitByCafe, router],
  );

  const districts = useMemo(() => {
    const set = new Set<string>();
    for (const c of allCafes) set.add(c.district);
    return Array.from(set);
  }, [allCafes]);

  const stats = useMemo(() => {
    const districts = new Set(
      visits.map((v) => cafeById.get(v.cafeId)?.district).filter(Boolean),
    );
    const signatureMatches = visits.filter((v) => {
      const cafe = cafeById.get(v.cafeId);
      if (!cafe) return false;
      return v.orderedMenu.includes(cafe.signature_menu);
    }).length;
    const avg =
      visits.length === 0
        ? '- -'
        : (visits.reduce((acc, v) => acc + v.rating, 0) / visits.length).toFixed(1);
    return {
      visitCount: visits.length,
      districts: districts.size.toString(),
      signature: signatureMatches.toString(),
      avg,
    };
  }, [visits, cafeById]);

  const latest = visits[0];
  const latestCafe = latest ? cafeById.get(latest.cafeId) : undefined;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.latte }}
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: 48,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingVertical: 8,
        }}
      >
        <BrandWordmark size="md" />
        <View style={{ alignItems: 'flex-end' }}>
          <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
            EST. 2026
          </Text>
          <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
            {user?.memberNumber ?? 'PAGE No01'}
          </Text>
        </View>
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).duration(800)}
        style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 32 }}
      >
        <IntroBadge label="Cafe Diary · Seoul" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 22,
          }}
        >
          <Text variant="displayKr" size={30} color={colors.mochaDark}>
            오늘 카페,{' '}
          </Text>
          <Text variant="handwrite" size={38} color={colors.honey} style={{ marginHorizontal: 2 }}>
            도감
          </Text>
          <Text variant="displayKr" size={30} color={colors.mochaDark}>
            에 붙이기.
          </Text>
        </View>
        <Text
          variant="handwriteReg"
          size={20}
          color={colors.mochaLight}
          style={{ marginTop: 12, transform: [{ rotate: '-1deg' }] }}
        >
          Stick the places you love.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(700)}>
        <DiaryStatBlock
          pageNumber={stats.visitCount}
          monthLabel={MONTH_LABEL}
          caption={
            stats.visitCount === 0
              ? '첫 스티커를 기다리는 중'
              : '조금씩 채워지는 중이에요'
          }
          stats={[
            { value: stats.districts, label: '동네' },
            { value: stats.signature, label: '시그니처' },
            { value: stats.avg === '- -' ? '- -' : `★ ${stats.avg}`, label: '평균' },
          ]}
        />
      </Animated.View>

      {latest && latestCafe ? (
        <Animated.View
          entering={FadeInDown.delay(400).duration(700)}
          style={{ marginTop: 8, marginBottom: 28 }}
        >
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <Text
              variant="handwriteReg"
              size={22}
              color={colors.honey}
              style={{ transform: [{ rotate: '-1.5deg' }] }}
            >
              방금 붙인 스티커
            </Text>
            <Text
              variant="mono"
              size={9}
              letterSpacing={3}
              uppercase
              color={colors.mochaLight}
              style={{ marginTop: 4 }}
            >
              latest entry
            </Text>
          </View>
          <PolaroidCard
            nameKo={latestCafe.name}
            location={`${latestCafe.district} · ${latestCafe.category}`}
            iconKey={latestCafe.icon}
            photoUri={latest.photoUri}
            order={latest.orderedMenu}
            rating={latest.rating}
            dateLine={formatDateLine(latest.visitedAt)}
            visited
          />
        </Animated.View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 12,
          marginTop: 8,
          paddingHorizontal: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text variant="titleKr" size={18} color={colors.mochaDark}>
            내 스티커북
          </Text>
          <Text
            variant="handwriteReg"
            size={22}
            color={colors.honey}
            style={{ marginLeft: 6 }}
          >
            my collection
          </Text>
        </View>
        <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
          {stats.visitCount} · sticked
        </Text>
      </View>

      <FilterStrip
        options={['붙인 스티커만', ...districts]}
        value={showOnlyVisited ? '붙인 스티커만' : districtFilter}
        onChange={(next) => {
          if (next === '붙인 스티커만') {
            setShowOnlyVisited(true);
            setDistrictFilter(null);
          } else {
            setShowOnlyVisited(false);
            setDistrictFilter(next);
          }
        }}
      />

      {items.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 40 }}>
          <Text
            variant="handwriteReg"
            size={20}
            color={colors.mochaLight}
            style={{ transform: [{ rotate: '-1deg' }] }}
          >
            {showOnlyVisited
              ? '아직 붙인 스티커가 없어요'
              : '이 동네는 아직 비어 있어요'}
          </Text>
        </View>
      ) : (
        <StickerGrid items={items} startNumber={1} />
      )}

      <View
        style={{
          marginTop: 32,
          paddingTop: 32,
          borderTopWidth: 1,
          borderColor: colors.paperLine,
          borderStyle: 'dashed',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}
      >
        <Text
          variant="displayEnItalic"
          size={18}
          color={colors.mocha}
          style={{ textAlign: 'center', lineHeight: 26 }}
        >
          "Some places{'\n'}deserve more than a check-in."
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
            marginTop: 14,
          }}
        >
          <Text
            variant="bodyKrMed"
            size={15}
            color={colors.mochaLight}
            style={{ textAlign: 'center', lineHeight: 24 }}
          >
            어떤 카페는, 체크인보다{'\n'}
          </Text>
          <Text variant="handwriteReg" size={21} color={colors.honey}>
            스티커 한 장
          </Text>
          <Text variant="bodyKrMed" size={15} color={colors.mochaLight}>
            이 어울려요.
          </Text>
        </View>
      </View>

      <BrandFooter />
    </ScrollView>
  );
}
