import { View, type ViewStyle } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, shadows } from '@/constants/theme';
import type { VibeColor } from '@/constants/vibes';

type Props = {
  label: string;
  variant?: VibeColor;
  style?: ViewStyle;
};

const bgByVariant: Record<VibeColor, string> = {
  dusty: colors.dusty,
  sage: colors.sage,
  honey: colors.honeyLight,
  cream: colors.cream,
  mocha: colors.cocoa,
};

export function Chip({ label, variant = 'cream', style }: Props) {
  const bg = bgByVariant[variant];
  const isCream = variant === 'cream';
  const isMocha = variant === 'mocha';
  return (
    <View
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: bg,
          borderWidth: isCream ? 1 : 0,
          borderColor: colors.paperLine,
        },
        shadows.chip,
        style,
      ]}
    >
      <Text
        variant="labelKr"
        size={12}
        color={isMocha ? colors.cream : colors.mochaDark}
      >
        {label}
      </Text>
    </View>
  );
}
