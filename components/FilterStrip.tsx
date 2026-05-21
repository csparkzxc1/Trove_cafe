import { Pressable, ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

type Props = {
  options: string[];
  value: string | null;
  onChange: (next: string | null) => void;
  allLabel?: string;
};

export function FilterStrip({ options, value, onChange, allLabel = '전체' }: Props) {
  if (options.length === 0) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 4, paddingVertical: 8 }}
    >
      <FilterPill
        label={allLabel}
        active={value === null}
        onPress={() => onChange(null)}
      />
      {options.map((opt) => (
        <FilterPill
          key={opt}
          label={opt}
          active={value === opt}
          onPress={() => onChange(value === opt ? null : opt)}
        />
      ))}
    </ScrollView>
  );
}

function FilterPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: active ? colors.mocha : colors.cream,
        borderWidth: 1,
        borderColor: active ? colors.mocha : colors.paperLine,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text
        variant="labelKr"
        size={12}
        color={active ? colors.cream : colors.mochaDark}
      >
        {label}
      </Text>
    </Pressable>
  );
}
