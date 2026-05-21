import { useMemo } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { StickerCard, type StickerCardProps } from '@/components/StickerCard';
import {
  imageBgForIndex,
  marginTopFor,
  rotationFor,
} from '@/constants/theme';

export type StickerItem = Omit<
  StickerCardProps,
  'rotation' | 'imageBg' | 'numStamp'
> & {
  id: string;
};

type Props = {
  items: StickerItem[];
  startNumber?: number;
};

const COLUMN_GAP = 18;
const ROW_GAP = 24;

export function StickerGrid({ items, startNumber = 1 }: Props) {
  const rows = useMemo(() => {
    const out: StickerItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      out.push([items[i], items[i + 1]].filter(Boolean) as StickerItem[]);
    }
    return out;
  }, [items]);

  return (
    <View style={{ paddingVertical: 8 }}>
      {rows.map((row, rowIdx) => (
        <View
          key={rowIdx}
          style={{
            flexDirection: 'row',
            gap: COLUMN_GAP,
            marginBottom: rowIdx === rows.length - 1 ? 0 : ROW_GAP,
          }}
        >
          {row.map((item, colIdx) => {
            const flatIdx = rowIdx * 2 + colIdx;
            const rotation = rotationFor(flatIdx);
            const marginTop = marginTopFor(flatIdx);
            const bg = imageBgForIndex(flatIdx);
            const num = (startNumber + flatIdx).toString().padStart(3, '0');
            return (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(80 * flatIdx)
                  .duration(700)
                  .springify()
                  .damping(15)}
                style={{ flex: 1, marginTop }}
              >
                <StickerCard
                  {...item}
                  rotation={rotation}
                  imageBg={bg}
                  numStamp={`No ${num}`}
                />
              </Animated.View>
            );
          })}
          {row.length === 1 ? <View style={{ flex: 1 }} /> : null}
        </View>
      ))}
    </View>
  );
}
