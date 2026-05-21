import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PolaroidCard } from '@/components/PolaroidCard';
import { Chip } from '@/components/ui/Chip';
import { Text } from '@/components/ui/Text';
import { findCafe } from '@/constants/cafes-seed';
import { colors } from '@/constants/theme';
import { vibesForCafeId } from '@/constants/vibes';

export default function CafeDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const cafe = id ? findCafe(id) : undefined;
  const [toastVisible, setToastVisible] = useState(false);

  if (!cafe) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.latte,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Text
          variant="handwriteReg"
          size={22}
          color={colors.mochaLight}
          style={{ textAlign: 'center' }}
        >
          도감에 없는 자리예요.
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ marginTop: 18, paddingHorizontal: 18, paddingVertical: 10 }}
        >
          <Text variant="labelKr" size={14} color={colors.honey}>
            돌아가기
          </Text>
        </Pressable>
      </View>
    );
  }

  const vibes = vibesForCafeId(cafe.id);

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2400);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.latte }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 4,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              paddingHorizontal: 12,
              paddingVertical: 6,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text variant="mono" size={11} letterSpacing={1.5} color={colors.mochaLight}>
              ← back
            </Text>
          </Pressable>
          <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.mochaLight}>
            Cafe No {cafe.id.replace(/\D/g, '')}
          </Text>
        </View>

        <Animated.View entering={FadeInDown.duration(700)}>
          <PolaroidCard
            nameKo={cafe.name}
            location={`${cafe.district} · ${cafe.category}`}
            iconKey={cafe.icon}
            visited={false}
            dateLine="아직 붙이지 않은 스티커"
            placeholderText="방문 전"
          />
        </Animated.View>

        <View style={{ alignItems: 'center', marginTop: 28 }}>
          <Text variant="mono" size={9} letterSpacing={2} uppercase color={colors.honey}>
            Signature
          </Text>
          <Text
            variant="handwrite"
            size={28}
            color={colors.mochaDark}
            style={{ marginTop: 6 }}
          >
            {cafe.signature_menu}
          </Text>
          <Text
            variant="bodyKr"
            size={13}
            color={colors.mochaLight}
            style={{ marginTop: 6 }}
          >
            이 카페의 시그니처.
          </Text>
        </View>

        <View
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTopWidth: 1,
            borderColor: colors.paperLine,
            borderStyle: 'dashed',
          }}
        >
          <Text
            variant="mono"
            size={9}
            letterSpacing={2}
            uppercase
            color={colors.mochaLight}
            style={{ textAlign: 'center', marginBottom: 14 }}
          >
            Vibes
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              paddingHorizontal: 12,
            }}
          >
            {vibes.map((v) => (
              <Chip key={v.label} label={v.label} variant={v.display_color} />
            ))}
          </View>
        </View>

        <Pressable
          onPress={showToast}
          style={({ pressed }) => ({
            marginTop: 40,
            alignSelf: 'center',
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 999,
            backgroundColor: colors.honey,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text variant="labelKr" size={14} color={colors.cream}>
            방문 기록 남기기
          </Text>
        </Pressable>

        <Text
          variant="handwriteReg"
          size={16}
          color={colors.mochaLight}
          style={{
            textAlign: 'center',
            marginTop: 12,
            transform: [{ rotate: '-1deg' }],
          }}
        >
          곧 카메라로 자동 인식해 드릴게요
        </Text>
      </ScrollView>

      {toastVisible ? (
        <Animated.View
          entering={FadeInDown.duration(220)}
          style={{
            position: 'absolute',
            bottom: insets.bottom + 24,
            left: 24,
            right: 24,
            backgroundColor: colors.mochaDark,
            paddingHorizontal: 18,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: 'center',
          }}
        >
          <Text variant="labelKr" size={13} color={colors.cream}>
            다음 업데이트에 활성화됩니다.
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
}
