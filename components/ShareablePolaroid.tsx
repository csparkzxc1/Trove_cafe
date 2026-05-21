import { forwardRef } from 'react';
import { View } from 'react-native';

import { PolaroidCard } from '@/components/PolaroidCard';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import type { AppCafe } from '@/lib/cafes';
import type { Visit } from '@/stores/visits';

type Props = {
  cafe: AppCafe;
  visit: Visit;
};

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

// Offscreen-rendered card sized for Instagram-friendly 4:5 ratio. Hide it
// somewhere off the visible viewport but keep it laid out so view-shot can
// snapshot it. The PolaroidCard already centers content; we add latte
// background + small TROVE crest at the bottom.
export const ShareablePolaroid = forwardRef<View, Props>(({ cafe, visit }, ref) => {
  return (
    <View
      ref={ref}
      collapsable={false}
      style={{
        width: 432,
        height: 540,
        backgroundColor: colors.latte,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 36,
      }}
    >
      <View style={{ width: '100%', alignItems: 'center' }}>
        <PolaroidCard
          nameKo={cafe.name}
          location={`${cafe.district} · ${cafe.category}`}
          iconKey={cafe.icon}
          photoUri={visit.photoUri}
          order={visit.orderedMenu}
          rating={visit.rating}
          dateLine={formatDateLine(visit.visitedAt)}
          visited
          rotation={-2}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 4,
        }}
      >
        <Text
          variant="displayEn"
          size={11}
          letterSpacing={4.4}
          uppercase
          color={colors.mochaLight}
        >
          TROVE
        </Text>
        <Text variant="handwriteReg" size={16} color={colors.honey}>
          cafe
        </Text>
      </View>
      <Text
        variant="mono"
        size={8}
        letterSpacing={2}
        uppercase
        color={colors.mochaLight}
        style={{ opacity: 0.7, marginTop: 2 }}
      >
        오늘 카페, 도감에 붙이기.
      </Text>
    </View>
  );
});

ShareablePolaroid.displayName = 'ShareablePolaroid';
