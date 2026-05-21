import Svg, { Circle, Ellipse, Path, type SvgProps } from 'react-native-svg';

import { colors } from '@/constants/theme';

type IconProps = SvgProps & { size?: number; color?: string };

const baseProps = (color: string): { stroke: string; fill: string } => ({
  stroke: color,
  fill: 'none',
});

export function CupIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  const { stroke } = baseProps(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Path
        d="M14 22 L14 44 Q14 54 24 54 L38 54 Q48 54 48 44 L48 22 Z"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M48 26 Q56 26 56 34 Q56 42 48 42"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M22 16 Q22 12 24 10"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
      <Path
        d="M30 16 Q30 12 32 10"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
      <Path
        d="M38 16 Q38 12 40 10"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
    </Svg>
  );
}

export function LatteIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Path
        d="M12 18 L12 46 Q12 56 22 56 L42 56 Q52 56 52 46 L52 18 Z"
        fill={colors.latte}
        stroke={color}
        strokeWidth={2.5}
      />
      <Ellipse cx={32} cy={20} rx={20} ry={4} fill={colors.latte} stroke={color} strokeWidth={2} />
      <Path
        d="M22 20 Q28 14 32 20 Q36 14 42 20"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        opacity={0.5}
      />
      <Path
        d="M52 24 Q60 24 60 32 Q60 40 52 40"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CroissantIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Path
        d="M10 38 Q10 22 26 18 Q42 14 54 28 Q58 34 54 40 Q42 50 26 46 Q14 44 10 38 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Path
        d="M20 28 L20 38 M28 24 L28 42 M36 24 L36 42 M44 28 L44 38"
        stroke={color}
        strokeWidth={1.5}
        opacity={0.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CakeIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Path
        d="M14 50 L32 14 L50 50 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Path d="M20 38 L44 38" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M24 28 L40 28"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.7}
      />
      <Circle cx={32} cy={20} r={2.5} fill={color} />
    </Svg>
  );
}

export function DonutIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Circle cx={32} cy={32} r={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={32} cy={32} r={7} fill="none" stroke={color} strokeWidth={2.5} />
      <Path
        d="M18 24 Q22 20 24 22 M40 18 Q44 16 46 20 M48 38 Q52 40 50 44 M16 42 Q14 38 18 36"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}

export function BagelIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Circle cx={32} cy={32} r={22} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={32} cy={32} r={9} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={22} cy={22} r={1} fill={color} opacity={0.7} />
      <Circle cx={42} cy={20} r={1} fill={color} opacity={0.7} />
      <Circle cx={46} cy={38} r={1} fill={color} opacity={0.7} />
      <Circle cx={18} cy={40} r={1} fill={color} opacity={0.7} />
      <Circle cx={32} cy={14} r={1} fill={color} opacity={0.7} />
      <Circle cx={32} cy={52} r={1} fill={color} opacity={0.7} />
    </Svg>
  );
}

export function StarIcon({ size = 14, color = colors.mocha, filled = true, ...rest }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" {...rest}>
      <Path
        d="M8 1 L10 6 L15 6 L11 9.5 L13 14.5 L8 11.5 L3 14.5 L5 9.5 L1 6 L6 6 Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : 1.2}
      />
    </Svg>
  );
}

export function EmptyDishIcon({ size = 56, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" {...rest}>
      <Circle
        cx={32}
        cy={32}
        r={22}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="3 3"
      />
    </Svg>
  );
}

export function FeatureDrinkIcon({ size = 200, color = colors.mocha, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" {...rest}>
      <Ellipse cx={50} cy={30} rx={34} ry={8} fill={colors.cream} stroke={color} strokeWidth={1.5} />
      <Path
        d="M16 30 L20 78 Q20 88 32 88 L68 88 Q80 88 80 78 L84 30"
        fill={colors.cream}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M30 30 Q40 22 50 30 Q60 22 70 30"
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        opacity={0.6}
      />
      <Path
        d="M84 36 Q94 36 94 50 Q94 64 84 64"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M40 50 L40 70 M50 48 L50 70 M60 50 L60 70"
        stroke={color}
        strokeWidth={0.8}
        opacity={0.3}
      />
    </Svg>
  );
}

export type DrinkIconKey = 'cup' | 'latte' | 'cross' | 'cake' | 'donut' | 'bagel';

export function DrinkIcon({
  iconKey,
  size,
  color,
}: {
  iconKey: DrinkIconKey;
  size?: number;
  color?: string;
}) {
  switch (iconKey) {
    case 'cup':
      return <CupIcon size={size} color={color} />;
    case 'latte':
      return <LatteIcon size={size} color={color} />;
    case 'cross':
      return <CroissantIcon size={size} color={color} />;
    case 'cake':
      return <CakeIcon size={size} color={color} />;
    case 'donut':
      return <DonutIcon size={size} color={color} />;
    case 'bagel':
      return <BagelIcon size={size} color={color} />;
  }
}
