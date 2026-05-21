import type { PropsWithChildren } from 'react';
import { View, type ViewStyle } from 'react-native';

import { colors, radii, shadows } from '@/constants/theme';

type Props = PropsWithChildren<{
  rotation?: number;
  radius?: keyof typeof radii;
  background?: string;
  style?: ViewStyle;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  shadow?: 'sticker' | 'polaroid' | 'none';
}>;

export function PaperCard({
  children,
  rotation = 0,
  radius = 'card',
  background = colors.cream,
  padding,
  paddingHorizontal,
  paddingVertical,
  shadow = 'polaroid',
  style,
}: Props) {
  const shadowStyle = shadow === 'none' ? null : shadows[shadow];
  return (
    <View
      style={[
        {
          backgroundColor: background,
          borderRadius: radii[radius],
          transform: [{ rotate: `${rotation}deg` }],
          ...(padding != null ? { padding } : null),
          ...(paddingHorizontal != null ? { paddingHorizontal } : null),
          ...(paddingVertical != null ? { paddingVertical } : null),
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}
