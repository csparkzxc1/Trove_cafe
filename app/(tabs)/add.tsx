import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaskingTape } from '@/components/ui/MaskingTape';
import { PaperCard } from '@/components/ui/PaperCard';
import { Text } from '@/components/ui/Text';
import { CupIcon } from '@/components/icons';
import { colors } from '@/constants/theme';

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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

      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <View style={{ alignItems: 'flex-start', marginLeft: 20, marginBottom: -8, zIndex: 2 }}>
          <MaskingTape color="honey" width={70} height={18} rotation={-3} />
        </View>
        <PaperCard rotation={0.5} padding={28} style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 999,
              backgroundColor: colors.latte,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
              borderWidth: 1,
              borderColor: colors.paperLine,
            }}
          >
            <CupIcon size={48} color={colors.honey} />
          </View>
          <Text variant="titleKr" size={18} color={colors.mochaDark} style={{ marginBottom: 8 }}>
            카메라로 스티커 만들기
          </Text>
          <Text
            variant="bodyKr"
            size={13}
            color={colors.mochaLight}
            style={{ textAlign: 'center', lineHeight: 20, marginBottom: 18 }}
          >
            사진을 찍으면 위치를 인식해서{'\n'}자동으로 스티커를 만들어 드려요.
          </Text>
          <Text
            variant="mono"
            size={9}
            letterSpacing={2}
            uppercase
            color={colors.honey}
          >
            Coming next session
          </Text>
        </PaperCard>
      </View>

      <Pressable
        onPress={() => router.push('/(tabs)')}
        style={({ pressed }) => ({
          marginTop: 12,
          alignSelf: 'center',
          paddingHorizontal: 22,
          paddingVertical: 12,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: colors.mocha,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text variant="labelKr" size={13} color={colors.mocha}>
          도감으로 돌아가기
        </Text>
      </Pressable>
    </ScrollView>
  );
}
