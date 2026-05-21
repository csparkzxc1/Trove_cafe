import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CupIcon } from '@/components/icons';
import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';
import { useAllCafes } from '@/lib/cafes';
import { useVisitsStore } from '@/stores/visits';

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const visits = useVisitsStore((s) => s.visits);
  const allCafes = useAllCafes();
  const visitedSet = new Set(visits.map((v) => v.cafeId));
  const unvisited = allCafes.filter((c) => !visitedSet.has(c.id));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.latte }}
      contentContainerStyle={{
        paddingTop: insets.top + 24,
        paddingHorizontal: 20,
        paddingBottom: 48,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 28 }}>
        <Text variant="mono" size={9} letterSpacing={3} uppercase color={colors.honey}>
          Stick a New Cafe
        </Text>
        <Text
          variant="displayKr"
          size={28}
          color={colors.mochaDark}
          style={{ textAlign: 'center', marginTop: 16, lineHeight: 36 }}
        >
          오늘은 어디 다녀오셨나요?
        </Text>
        <Text
          variant="handwriteReg"
          size={19}
          color={colors.mochaLight}
          style={{ marginTop: 10, transform: [{ rotate: '-1deg' }] }}
        >
          새 스티커 자리를 잡는 중...
        </Text>
      </View>

      <View style={{ marginTop: 16, marginBottom: 16, position: 'relative' }}>
        <View style={{ position: 'absolute', top: -10, left: 24, zIndex: 2 }}>
          <MaskingTape color="honey" width={70} height={18} rotation={-3} />
        </View>
        <PaperCard rotation={0.5} padding={24} style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 999,
              backgroundColor: colors.latte,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.paperLine,
            }}
          >
            <CupIcon size={48} color={colors.honey} />
          </View>
          <Text variant="titleKr" size={18} color={colors.mochaDark} style={{ marginBottom: 8 }}>
            방문 기록 남기기
          </Text>
          <Text
            variant="bodyKr"
            size={13}
            color={colors.mochaLight}
            style={{ textAlign: 'center', lineHeight: 20, marginBottom: 18 }}
          >
            사진 한 장, 별점, 한 줄 메모로{'\n'}오늘 다녀온 카페를 스티커북에 붙여요.
          </Text>
          <Pressable
            onPress={() => router.push('/visit/new')}
            style={({ pressed }) => ({
              paddingHorizontal: 22,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: colors.mocha,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text variant="labelKr" size={14} color={colors.cream}>
              스티커 만들기
            </Text>
          </Pressable>
        </PaperCard>
      </View>

      <Pressable
        onPress={() => router.push('/cafe/new')}
        style={({ pressed }) => ({
          marginTop: 8,
          paddingVertical: 14,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: colors.paperLineStrong,
          borderStyle: 'dashed',
          alignItems: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text
          variant="handwriteReg"
          size={19}
          color={colors.honey}
          style={{ transform: [{ rotate: '-1deg' }] }}
        >
          + 새 카페 도감에 추가
        </Text>
        <Text
          variant="mono"
          size={9}
          letterSpacing={2}
          uppercase
          color={colors.mochaLight}
          style={{ marginTop: 4 }}
        >
          add a new spot
        </Text>
      </Pressable>

      <Text
        variant="mono"
        size={9}
        letterSpacing={2}
        uppercase
        color={colors.mochaLight}
        style={{ marginTop: 28, marginBottom: 12, paddingLeft: 4 }}
      >
        아직 안 가본 자리
      </Text>
      {unvisited.length === 0 ? (
        <Text
          variant="handwriteReg"
          size={18}
          color={colors.mochaLight}
          style={{
            textAlign: 'center',
            marginTop: 10,
            transform: [{ rotate: '-1deg' }],
          }}
        >
          도감을 다 채우셨네요!
        </Text>
      ) : (
        <View style={{ gap: 10 }}>
          {unvisited.slice(0, 8).map((c) => (
            <Pressable
              key={c.id}
              onPress={() => router.push(`/visit/new?cafe=${c.id}`)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 14,
                backgroundColor: colors.cream,
                borderWidth: 1,
                borderColor: colors.paperLine,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <View>
                <Text variant="titleKr" size={15} color={colors.mochaDark}>
                  {c.name}
                </Text>
                <Text
                  variant="mono"
                  size={8}
                  letterSpacing={1.5}
                  uppercase
                  color={colors.mochaLight}
                  style={{ marginTop: 2 }}
                >
                  {c.district} · {c.category}
                </Text>
              </View>
              <Text variant="handwriteReg" size={18} color={colors.honey}>
                붙이기 →
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
