export type VibeColor = 'dusty' | 'sage' | 'honey' | 'cream' | 'mocha';

export type Vibe = {
  label: string;
  display_color: VibeColor;
};

export const VIBES_SEED: Vibe[] = [
  { label: '조용한',         display_color: 'sage' },
  { label: '공부하기 좋은',  display_color: 'cream' },
  { label: '데이트',         display_color: 'honey' },
  { label: '혼카페',         display_color: 'cream' },
  { label: '감성적인',       display_color: 'dusty' },
  { label: '넓은',           display_color: 'cream' },
  { label: '루프탑',         display_color: 'sage' },
  { label: '한옥',           display_color: 'mocha' },
  { label: '펫프렌들리',     display_color: 'honey' },
  { label: '브런치',         display_color: 'cream' },
  { label: '디저트 맛집',    display_color: 'dusty' },
  { label: '커피 맛집',      display_color: 'mocha' },
  { label: '뷰 좋은',        display_color: 'sage' },
  { label: '인스타 감성',    display_color: 'dusty' },
  { label: '비밀스러운',     display_color: 'cream' },
];

export function vibesForCafeId(id: string): Vibe[] {
  const seedIdx = parseInt(id.replace(/\D/g, ''), 10) || 0;
  const start = (seedIdx * 3) % VIBES_SEED.length;
  return [0, 1, 2, 3]
    .map((offset) => VIBES_SEED[(start + offset) % VIBES_SEED.length])
    .slice(0, 4);
}
