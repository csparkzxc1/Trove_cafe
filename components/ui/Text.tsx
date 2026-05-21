import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { colors } from '@/constants/theme';

export type TextVariant =
  | 'displayKr'
  | 'titleKr'
  | 'bodyKr'
  | 'bodyKrMed'
  | 'labelKr'
  | 'handwrite'
  | 'handwriteReg'
  | 'displayEn'
  | 'displayEnItalic'
  | 'sansEn'
  | 'mono'
  | 'monoBold';

type Props = RNTextProps & {
  variant?: TextVariant;
  color?: string;
  size?: number;
  letterSpacing?: number;
  uppercase?: boolean;
};

const baseByVariant: Record<TextVariant, TextStyle> = {
  displayKr: { fontFamily: 'Pretendard-ExtraBold', fontSize: 30, color: colors.mochaDark, letterSpacing: -0.6 },
  titleKr: { fontFamily: 'Pretendard-Bold', fontSize: 18, color: colors.mochaDark },
  bodyKr: { fontFamily: 'Pretendard-Regular', fontSize: 14, color: colors.mochaDark },
  bodyKrMed: { fontFamily: 'Pretendard-Medium', fontSize: 14, color: colors.mochaDark },
  labelKr: { fontFamily: 'Pretendard-SemiBold', fontSize: 12, color: colors.mochaDark },
  handwrite: { fontFamily: 'Caveat-Bold', fontSize: 22, color: colors.honey },
  handwriteReg: { fontFamily: 'Caveat-Medium', fontSize: 18, color: colors.honey },
  displayEn: { fontFamily: 'Fraunces-Medium', fontSize: 24, color: colors.mocha, letterSpacing: 4 },
  displayEnItalic: { fontFamily: 'Fraunces-MediumItalic', fontSize: 20, color: colors.mocha },
  sansEn: { fontFamily: 'Quicksand-Medium', fontSize: 14, color: colors.mocha },
  mono: { fontFamily: 'SpaceMono-Regular', fontSize: 9, color: colors.mochaLight, letterSpacing: 1.6 },
  monoBold: { fontFamily: 'SpaceMono-Bold', fontSize: 12, color: colors.mocha, letterSpacing: 0.5 },
};

export function Text({
  variant = 'bodyKr',
  color,
  size,
  letterSpacing,
  uppercase,
  style,
  ...rest
}: Props) {
  const base = baseByVariant[variant];
  const composed: TextStyle = {
    ...base,
    ...(color ? { color } : null),
    ...(size != null ? { fontSize: size } : null),
    ...(letterSpacing != null ? { letterSpacing } : null),
    ...(uppercase ? { textTransform: 'uppercase' } : null),
  };
  return <RNText {...rest} style={[composed, style]} />;
}
