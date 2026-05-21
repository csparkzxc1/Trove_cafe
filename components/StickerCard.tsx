import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, View, type ViewStyle } from 'react-native';

import { DrinkIcon, EmptyDishIcon, StarIcon, type DrinkIconKey } from '@/components/icons';
import { Text } from '@/components/ui/Text';
import {
  colors,
  imageGradients,
  radii,
  shadows,
  type ImageBgVariant,
} from '@/constants/theme';

export type StickerCardProps = {
  numStamp: string;
  rotation?: number;
  imageBg?: ImageBgVariant;
  iconKey: DrinkIconKey;
  nameKo: string;
  meta: string;
  note?: string;
  visited?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function StickerCard({
  numStamp,
  rotation = 0,
  imageBg = 'cream',
  iconKey,
  nameKo,
  meta,
  note,
  visited = false,
  onPress,
  style,
}: StickerCardProps) {
  const gradient = imageGradients[imageBg];

  if (!visited) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            borderRadius: radii.sticker,
            paddingHorizontal: 10,
            paddingVertical: 18,
            borderWidth: 1.5,
            borderColor: colors.paperLineStrong,
            borderStyle: 'dashed',
            backgroundColor: 'transparent',
            transform: [
              { rotate: `${pressed ? 0 : rotation}deg` },
              { translateY: pressed ? -2 : 0 },
            ],
          },
          style,
        ]}
      >
        <NumStamp text={numStamp} />
        <View
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 6,
            backgroundColor: colors.paperBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          <View style={{ opacity: 0.25 }}>
            <EmptyDishIcon size={64} color={colors.mocha} />
          </View>
        </View>
        <Text
          variant="titleKr"
          size={15}
          color={colors.mochaLight}
          numberOfLines={1}
          style={{ fontFamily: 'Pretendard-SemiBold', marginBottom: 4 }}
        >
          {nameKo}
        </Text>
        <Text
          variant="mono"
          size={8}
          letterSpacing={1.4}
          uppercase
          color={colors.mochaLight}
          style={{ opacity: 0.6 }}
          numberOfLines={1}
        >
          {meta}
        </Text>
        {note ? (
          <Text
            variant="handwriteReg"
            size={13}
            color={colors.mochaLight}
            style={{
              marginTop: 6,
              opacity: 0.6,
              transform: [{ rotate: '-1deg' }],
              alignSelf: 'flex-start',
            }}
          >
            {note}
          </Text>
        ) : null}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.cream,
          borderRadius: radii.sticker,
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 14,
          transform: [
            { rotate: `${pressed ? 0 : rotation}deg` },
            { translateY: pressed ? -4 : 0 },
            { scale: pressed ? 1.02 : 1 },
          ],
        },
        shadows.sticker,
        style,
      ]}
    >
      <NumStamp text={numStamp} />
      <View
        style={{
          width: '100%',
          aspectRatio: 1,
          borderRadius: 6,
          marginBottom: 12,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DrinkIcon iconKey={iconKey} size={72} color={colors.mocha} />
        </LinearGradient>
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0.7,
          }}
        >
          <StarIcon size={14} color={colors.mocha} />
        </View>
      </View>
      <Text
        variant="titleKr"
        size={15}
        color={colors.mochaDark}
        numberOfLines={1}
        style={{ marginBottom: 4 }}
      >
        {nameKo}
      </Text>
      <Text
        variant="mono"
        size={8}
        letterSpacing={1.4}
        uppercase
        color={colors.mochaLight}
        numberOfLines={1}
      >
        {meta}
      </Text>
      {note ? (
        <Text
          variant="handwriteReg"
          size={14}
          color={colors.honey}
          style={{
            marginTop: 6,
            transform: [{ rotate: '-1deg' }],
            alignSelf: 'flex-start',
          }}
        >
          {note}
        </Text>
      ) : null}
    </Pressable>
  );
}

function NumStamp({ text }: { text: string }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: colors.cream,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.paperLine,
        zIndex: 2,
      }}
    >
      <Text variant="mono" size={8} letterSpacing={0.8} color={colors.mochaLight}>
        {text}
      </Text>
    </View>
  );
}
