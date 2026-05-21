import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

type Props = {
  label: string;
};

export function IntroBadge({ label }: Props) {
  return (
    <View
      style={{
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.honey,
      }}
    >
      <Text
        variant="mono"
        size={9}
        letterSpacing={3}
        uppercase
        color={colors.honey}
      >
        {label}
      </Text>
    </View>
  );
}
