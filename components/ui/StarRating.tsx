import { Pressable, View } from 'react-native';

import { StarIcon } from '@/components/icons';
import { colors } from '@/constants/theme';

type Props = {
  value: number;
  onChange: (value: number) => void;
  size?: number;
};

export function StarRating({ value, onChange, size = 28 }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} onPress={() => onChange(n)} hitSlop={6}>
          <StarIcon
            size={size}
            color={n <= value ? colors.honey : colors.mochaLight}
            filled={n <= value}
          />
        </Pressable>
      ))}
    </View>
  );
}
