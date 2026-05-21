import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandFooter } from '@/components/BrandFooter';
import { BrandWordmark } from '@/components/BrandWordmark';
import { StickerGrid, type StickerItem } from '@/components/StickerGrid';
import { DiaryStatBlock } from '@/components/DiaryStatBlock';
import { IntroBadge } from '@/components/ui/IntroBadge';
import { Text } from '@/components/ui/Text';
import { CAFES_SEED } from '@/constants/cafes-seed';
import { colors } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth';

export default function CollectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);

  const items: StickerItem[] = CAFES_SEED.map((c) => ({
    id: c.id,
    iconKey: c.icon,
    nameKo: c.name,
    meta: `${c.district} · ${c.category}`,
    note: c.note,
    visited: false,
    onPress: () => router.push(`/cafe/${c.id}`),
  }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.latte }}
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: 48,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingVertical: 8,
        }}
      >
        <BrandWordmark size="md" />
        <View style={{ alignItems: 'flex-end' }}>
          <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
            EST. 2026
          </Text>
          <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
            {user?.memberNumber ?? 'PAGE No01'}
          </Text>
        </View>
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).duration(800)}
        style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 32 }}
      >
        <IntroBadge label="Cafe Diary · Seoul" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 22,
          }}
        >
          <Text variant="displayKr" size={30} color={colors.mochaDark}>
            오늘 카페,{' '}
          </Text>
          <Text
            variant="handwrite"
            size={38}
            color={colors.honey}
            style={{ marginHorizontal: 2 }}
          >
            도감
          </Text>
          <Text variant="displayKr" size={30} color={colors.mochaDark}>
            에 붙이기.
          </Text>
        </View>
        <Text
          variant="handwriteReg"
          size={20}
          color={colors.mochaLight}
          style={{ marginTop: 12, transform: [{ rotate: '-1deg' }] }}
        >
          Stick the places you love.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(700)}>
        <DiaryStatBlock
          pageNumber={0}
          monthLabel="2026 · MAY"
          caption="첫 스티커를 기다리는 중"
          stats={[
            { value: '0', label: '동네' },
            { value: '0', label: '시그니처' },
            { value: '- -', label: '평균' },
          ]}
        />
      </Animated.View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 20,
          paddingHorizontal: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text variant="titleKr" size={18} color={colors.mochaDark}>
            내 스티커북
          </Text>
          <Text
            variant="handwriteReg"
            size={22}
            color={colors.honey}
            style={{ marginLeft: 6 }}
          >
            my collection
          </Text>
        </View>
        <Text variant="mono" size={9} letterSpacing={1.5} uppercase color={colors.mochaLight}>
          0 · sticked
        </Text>
      </View>

      <StickerGrid items={items} startNumber={1} />

      <View
        style={{
          marginTop: 32,
          paddingTop: 32,
          borderTopWidth: 1,
          borderColor: colors.paperLine,
          borderStyle: 'dashed',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}
      >
        <Text
          variant="displayEnItalic"
          size={18}
          color={colors.mocha}
          style={{ textAlign: 'center', lineHeight: 26 }}
        >
          "Some places{'\n'}deserve more than a check-in."
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
            marginTop: 14,
          }}
        >
          <Text
            variant="bodyKrMed"
            size={15}
            color={colors.mochaLight}
            style={{ textAlign: 'center', lineHeight: 24 }}
          >
            어떤 카페는, 체크인보다{'\n'}
          </Text>
          <Text variant="handwriteReg" size={21} color={colors.honey}>
            스티커 한 장
          </Text>
          <Text variant="bodyKrMed" size={15} color={colors.mochaLight}>
            이 어울려요.
          </Text>
        </View>
      </View>

      <BrandFooter />
    </ScrollView>
  );
}
