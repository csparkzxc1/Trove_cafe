export type SeedCafe = {
  id: string;
  name: string;
  district: string;
  category: '스페셜티' | '디저트' | '베이커리' | '브런치' | '한옥' | '루프탑' | '북카페';
  signature_menu: string;
  icon: 'cup' | 'latte' | 'cake' | 'cross' | 'donut' | 'bagel';
  note: string;
};

export const CAFES_SEED: SeedCafe[] = [
  { id: 'c-001', name: '센터커피',          district: '성수동', category: '스페셜티', signature_menu: '드립커피',         icon: 'cup',   note: '다음 자리' },
  { id: 'c-002', name: '베르크 로스터스',   district: '성수동', category: '스페셜티', signature_menu: '에스프레소',       icon: 'latte', note: '곧 가보기' },
  { id: 'c-003', name: '플랜트',            district: '한남동', category: '브런치',   signature_menu: '아보카도 토스트',  icon: 'bagel', note: '이번 주말' },
  { id: 'c-004', name: '오르에르',          district: '한남동', category: '디저트',   signature_menu: '플랫화이트',       icon: 'cake',  note: '곧 가보기' },
  { id: 'c-005', name: '레이어드',          district: '연남동', category: '베이커리', signature_menu: '스콘',             icon: 'cross', note: '다음 자리' },
  { id: 'c-006', name: '카페 이마',         district: '연남동', category: '스페셜티', signature_menu: '핸드드립',         icon: 'cup',   note: '곧 가보기' },
  { id: 'c-007', name: '식물',              district: '익선동', category: '한옥',     signature_menu: '오미자에이드',     icon: 'latte', note: '이번 주말' },
  { id: 'c-008', name: '낙원장',            district: '익선동', category: '브런치',   signature_menu: '브런치 플레이트',  icon: 'bagel', note: '다음 자리' },
  { id: 'c-009', name: '망원동 티라미수',   district: '망원동', category: '디저트',   signature_menu: '티라미수',         icon: 'cake',  note: '다음 자리' },
  { id: 'c-010', name: '대림창고',          district: '서촌',   category: '루프탑',   signature_menu: '라떼',             icon: 'latte', note: '곧 가보기' },
  { id: 'c-011', name: '런던 베이글 뮤지엄', district: '안국동', category: '베이커리', signature_menu: '베이글',           icon: 'bagel', note: '곧 가보기' },
  { id: 'c-012', name: '오랑우탄',          district: '해방촌', category: '스페셜티', signature_menu: '콜드브루',         icon: 'cup',   note: '이번 주말' },
];

export function findCafe(id: string): SeedCafe | undefined {
  return CAFES_SEED.find((c) => c.id === id);
}
