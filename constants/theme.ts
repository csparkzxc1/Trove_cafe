export const colors = {
  latte: '#FBF6EC',
  latteDark: '#F2E9D6',
  cream: '#FFFCF5',
  mocha: '#5C4434',
  mochaLight: '#7A5C45',
  mochaDark: '#3D2818',
  honey: '#E6B450',
  honeyLight: '#F4D58A',
  dusty: '#E8B5A8',
  dustyLight: '#F5D2C9',
  sage: '#A8B89C',
  sageLight: '#C2CFB7',
  butter: '#F4D58A',
  cocoa: '#7A5C45',
  paperLine: 'rgba(92, 68, 52, 0.14)',
  paperLineStrong: 'rgba(92, 68, 52, 0.25)',
  paperBg: 'rgba(92, 68, 52, 0.04)',
} as const;

export const shadows = {
  sticker: {
    shadowColor: '#5C4434',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  polaroid: {
    shadowColor: '#5C4434',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 8,
  },
  chip: {
    shadowColor: '#5C4434',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

export const radii = {
  sticker: 8,
  polaroid: 4,
  card: 16,
  chip: 999,
} as const;

export type ImageBgVariant = 'pink' | 'sage' | 'honey' | 'mocha' | 'cream';

export const imageGradients: Record<ImageBgVariant, [string, string]> = {
  pink: [colors.dusty, colors.dustyLight],
  sage: [colors.sage, colors.sageLight],
  honey: [colors.honeyLight, '#FAE5B5'],
  mocha: ['#C4A78B', '#DEC6AB'],
  cream: [colors.latteDark, colors.cream],
};

export const STICKER_ROTATIONS = [-2.5, 1.5, 2, -1.5, -1, 2.5];
export const STICKER_MARGIN_TOPS = [0, 12, 0, 8, 0, 10];

export function rotationFor(index: number): number {
  return STICKER_ROTATIONS[index % STICKER_ROTATIONS.length];
}

export function marginTopFor(index: number): number {
  return STICKER_MARGIN_TOPS[index % STICKER_MARGIN_TOPS.length];
}

export const imageBgForIndex = (index: number): ImageBgVariant => {
  const order: ImageBgVariant[] = ['pink', 'mocha', 'honey', 'sage', 'cream'];
  return order[index % order.length];
};
