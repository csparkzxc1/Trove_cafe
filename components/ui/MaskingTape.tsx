import { View, type ViewStyle } from 'react-native';

import { colors } from '@/constants/theme';

type Props = {
  color?: 'sage' | 'dusty' | 'honey';
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  style?: ViewStyle;
};

const colorMap = {
  sage: colors.sage,
  dusty: colors.dusty,
  honey: colors.honeyLight,
};

export function MaskingTape({
  color = 'sage',
  width = 60,
  height = 18,
  rotation = -4,
  opacity = 0.7,
  style,
}: Props) {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: colorMap[color],
          opacity,
          borderRadius: 1.5,
          transform: [{ rotate: `${rotation}deg` }],
          shadowColor: '#5C4434',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 1,
        },
        style,
      ]}
    />
  );
}
