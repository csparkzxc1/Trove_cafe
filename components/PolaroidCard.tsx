import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

import { FeatureDrinkIcon, StarIcon, type DrinkIconKey, DrinkIcon } from '@/components/icons';
import { MaskingTape } from '@/components/ui/MaskingTape';
import { Text } from '@/components/ui/Text';
import { colors, radii, shadows } from '@/constants/theme';

type Props = {
  nameKo: string;
  location: string;
  order?: string;
  dateLine: string;
  rating?: number;
  iconKey?: DrinkIconKey;
  photoUri?: string | null;
  visited?: boolean;
  placeholderText?: string;
  rotation?: number;
};

export function PolaroidCard({
  nameKo,
  location,
  order,
  dateLine,
  rating = 0,
  iconKey,
  photoUri,
  visited = true,
  placeholderText = '방문 전',
  rotation = -2,
}: Props) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 18 }}>
      <View
        style={[
          {
            backgroundColor: colors.cream,
            padding: 16,
            paddingBottom: 22,
            borderRadius: radii.polaroid,
            transform: [{ rotate: `${rotation}deg` }],
            maxWidth: 320,
            width: '90%',
          },
          shadows.polaroid,
        ]}
      >
        <View
          style={{
            position: 'absolute',
            top: -14,
            alignSelf: 'center',
            left: '50%',
            marginLeft: -40,
          }}
        >
          <MaskingTape color="sage" width={80} height={22} rotation={-3} opacity={0.65} />
        </View>

        <View
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 2,
            marginBottom: 16,
            overflow: 'hidden',
          }}
        >
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          ) : (
            <LinearGradient
              colors={
                visited
                  ? [colors.dusty, colors.dustyLight, colors.honeyLight]
                  : [colors.latteDark, colors.cream, colors.latteDark]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {visited ? (
                iconKey ? (
                  <DrinkIcon iconKey={iconKey} size={160} color={colors.mocha} />
                ) : (
                  <FeatureDrinkIcon size={180} color={colors.mocha} />
                )
              ) : (
                <Text
                  variant="handwriteReg"
                  size={26}
                  color={colors.mochaLight}
                  style={{ transform: [{ rotate: '-2deg' }] }}
                >
                  {placeholderText}
                </Text>
              )}
            </LinearGradient>
          )}
          {visited ? (
            <View
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                flexDirection: 'row',
                gap: 2,
              }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  size={14}
                  color={photoUri ? colors.cream : colors.mocha}
                  filled={n <= Math.round(rating)}
                />
              ))}
            </View>
          ) : null}
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text
            variant="displayKr"
            size={22}
            color={colors.mochaDark}
            letterSpacing={-0.4}
            style={{ marginBottom: 4 }}
          >
            {nameKo}
          </Text>
          <Text
            variant="mono"
            size={10}
            letterSpacing={2}
            uppercase
            color={colors.mochaLight}
            style={{ marginBottom: 10 }}
          >
            {location}
          </Text>
          {order ? (
            <Text
              variant="handwriteReg"
              size={19}
              color={colors.honey}
              style={{ transform: [{ rotate: '-1deg' }], lineHeight: 22 }}
            >
              {order}
            </Text>
          ) : null}
          <View
            style={{
              width: 30,
              height: 1,
              backgroundColor: colors.paperLine,
              marginVertical: 10,
            }}
          />
          <Text variant="mono" size={9} letterSpacing={1.5} color={colors.mochaLight}>
            {dateLine}
          </Text>
        </View>
      </View>
    </View>
  );
}
