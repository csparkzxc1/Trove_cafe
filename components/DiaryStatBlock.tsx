import { View } from 'react-native';

import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

type Stat = { value: string; label: string };

type Props = {
  pageNumber: number;
  monthLabel: string;
  caption?: string;
  stats: [Stat, Stat, Stat];
};

export function DiaryStatBlock({
  pageNumber,
  monthLabel,
  caption = '조금씩 채워지는 중이에요',
  stats,
}: Props) {
  return (
    <View style={{ position: 'relative', marginBottom: 36 }}>
      <PaperCard
        rotation={-0.5}
        padding={22}
        shadow="polaroid"
        style={{ paddingHorizontal: 22, paddingVertical: 24 }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 10,
          }}
        >
          <Text variant="mono" size={9} letterSpacing={2.2} uppercase color={colors.mochaLight}>
            My Sticker Book
          </Text>
          <Text variant="mono" size={10} letterSpacing={1} color={colors.honey}>
            {monthLabel}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            variant="handwrite"
            size={42}
            color={colors.honey}
            style={{ lineHeight: 42, marginRight: 4 }}
          >
            {pageNumber}
          </Text>
          <Text
            variant="displayKr"
            size={32}
            color={colors.mochaDark}
            letterSpacing={-0.6}
          >
            번째 페이지
          </Text>
        </View>

        <Text
          variant="handwriteReg"
          size={18}
          color={colors.mochaLight}
          style={{
            marginTop: 8,
            alignSelf: 'flex-start',
            transform: [{ rotate: '-0.8deg' }],
          }}
        >
          {caption}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 14,
            marginTop: 16,
            paddingTop: 14,
            borderTopWidth: 1,
            borderColor: colors.paperLine,
            borderStyle: 'dashed',
          }}
        >
          {stats.map((s, i) => (
            <View key={i} style={{ flex: 1 }}>
              <Text
                variant="monoBold"
                size={15}
                color={colors.mocha}
                letterSpacing={0.4}
              >
                {s.value}
              </Text>
              <Text
                variant="mono"
                size={8}
                letterSpacing={1.6}
                uppercase
                color={colors.mochaLight}
                style={{ marginTop: 2 }}
              >
                {s.label}
              </Text>
            </View>
          ))}
        </View>
      </PaperCard>

      <View style={{ position: 'absolute', top: -10, left: 24 }}>
        <MaskingTape color="sage" width={60} height={18} rotation={-4} opacity={0.7} />
      </View>
      <View style={{ position: 'absolute', top: -8, right: 28 }}>
        <MaskingTape color="dusty" width={50} height={16} rotation={3} opacity={0.65} />
      </View>
    </View>
  );
}
