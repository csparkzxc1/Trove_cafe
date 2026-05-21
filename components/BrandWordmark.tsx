import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: { trove: 18, cafe: 26, gap: 2 },
  md: { trove: 26, cafe: 38, gap: 4 },
  lg: { trove: 34, cafe: 50, gap: 6 },
};

export function BrandWordmark({ size = 'md' }: Props) {
  const s = sizeMap[size];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: s.gap,
      }}
    >
      <Text
        variant="displayEn"
        size={s.trove}
        letterSpacing={s.trove * 0.18}
        color={colors.mocha}
        style={{ marginBottom: 2 }}
      >
        TROVE
      </Text>
      <Text
        variant="handwrite"
        size={s.cafe}
        color={colors.honey}
        style={{
          transform: [{ rotate: '-3deg' }, { translateY: 4 }],
          lineHeight: s.cafe * 0.85,
        }}
      >
        cafe
      </Text>
    </View>
  );
}
