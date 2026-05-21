import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { Text } from '@/components/ui/Text';
import { colors } from '@/constants/theme';

type Props = {
  value: string | null;
  onChange: (uri: string | null) => void;
};

function CameraGlyph({ color }: { color: string }) {
  return (
    <Svg width={40} height={40} viewBox="0 0 64 64" fill="none">
      <Rect
        x={8}
        y={18}
        width={48}
        height={36}
        rx={6}
        stroke={color}
        strokeWidth={2.2}
      />
      <Path
        d="M22 18 L24 12 H40 L42 18"
        stroke={color}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Path
        d="M32 28 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0"
        stroke={color}
        strokeWidth={2.2}
        fill="none"
      />
    </Svg>
  );
}

async function ensureCameraPermission(): Promise<boolean> {
  const current = await ImagePicker.getCameraPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Alert.alert('카메라 권한이 필요해요', '설정에서 카메라 권한을 허용해 주세요.');
    return false;
  }
  const next = await ImagePicker.requestCameraPermissionsAsync();
  return next.granted;
}

async function ensureLibraryPermission(): Promise<boolean> {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Alert.alert('사진 권한이 필요해요', '설정에서 사진 라이브러리 권한을 허용해 주세요.');
    return false;
  }
  const next = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return next.granted;
}

export function PhotoPicker({ value, onChange }: Props) {
  const [busy, setBusy] = useState(false);

  async function takePhoto() {
    if (!(await ensureCameraPermission())) return;
    try {
      setBusy(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (!result.canceled && result.assets[0]) {
        onChange(result.assets[0].uri);
      }
    } catch {
      Alert.alert('문제가 생겼어요', '카메라를 열 수 없어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }

  async function pickPhoto() {
    if (!(await ensureLibraryPermission())) return;
    try {
      setBusy(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (!result.canceled && result.assets[0]) {
        onChange(result.assets[0].uri);
      }
    } catch {
      Alert.alert('문제가 생겼어요', '사진을 불러올 수 없어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <View>
      <Pressable
        onPress={value ? pickPhoto : takePhoto}
        disabled={busy}
        style={({ pressed }) => ({
          width: '100%',
          aspectRatio: 1,
          borderRadius: 8,
          backgroundColor: colors.paperBg,
          borderWidth: value ? 0 : 1.5,
          borderStyle: 'dashed',
          borderColor: colors.paperLineStrong,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.85 : 1,
        })}
      >
        {value ? (
          <Image source={{ uri: value }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        ) : (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <CameraGlyph color={colors.mochaLight} />
            <Text variant="labelKr" size={14} color={colors.mochaLight}>
              사진 한 장 붙이기
            </Text>
            <Text
              variant="handwriteReg"
              size={15}
              color={colors.honey}
              style={{ transform: [{ rotate: '-1deg' }] }}
            >
              tap to capture
            </Text>
          </View>
        )}
      </Pressable>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 12 }}>
        <Pressable onPress={takePhoto} disabled={busy} hitSlop={6}>
          <Text variant="mono" size={10} letterSpacing={1.6} uppercase color={colors.mocha}>
            · Camera ·
          </Text>
        </Pressable>
        <Pressable onPress={pickPhoto} disabled={busy} hitSlop={6}>
          <Text variant="mono" size={10} letterSpacing={1.6} uppercase color={colors.mocha}>
            · Library ·
          </Text>
        </Pressable>
        {value ? (
          <Pressable onPress={() => onChange(null)} disabled={busy} hitSlop={6}>
            <Text variant="mono" size={10} letterSpacing={1.6} uppercase color={colors.dusty}>
              · Clear ·
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
