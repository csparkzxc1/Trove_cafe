import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

const SWATCHES: { color: string; border?: boolean }[] = [
  { color: colors.latte, border: true },
  { color: colors.mocha },
  { color: colors.honey },
  { color: colors.dusty },
  { color: colors.sage },
  { color: colors.butter },
];

export function BrandFooter() {
  return (
    <View style={{ alignItems: 'center', paddingTop: 40, paddingBottom: 24 }}>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 22 }}>
        {SWATCHES.map((s, i) => (
          <View
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              backgroundColor: s.color,
              borderWidth: s.border ? 1 : 0,
              borderColor: colors.paperLine,
              shadowColor: '#5C4434',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 2,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text
          variant="displayEn"
          size={11}
          letterSpacing={4.4}
          uppercase
          color={colors.mochaLight}
        >
          TROVE · INC.
        </Text>
        <Text
          variant="handwriteReg"
          size={16}
          color={colors.honey}
          style={{ marginLeft: 4 }}
        >
          cafe
        </Text>
      </View>
      <Text
        variant="mono"
        size={9}
        letterSpacing={2}
        uppercase
        color={colors.mochaLight}
        style={{ marginTop: 6, opacity: 0.7 }}
      >
        Prototype · 2026.05.21
      </Text>
    </View>
  );
}
