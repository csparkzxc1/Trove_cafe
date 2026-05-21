# Trove Cafe — 트로브 카페

> 오늘 카페, 도감에 붙이기.
> Stick the places you love.

방문한 카페를 **스티커북처럼 모으는** 컬렉션 앱. React Native (Expo SDK 54) 기반.

이번 세션의 목표는 **빈 스티커북을 보여줄 수 있는 상태** — 12개 시드 카페를 종이·콜라주 톤으로 배치한 도감 UI, 인증 화면, 카페 상세(placeholder) 화면까지.

---

## 빠른 시작

```bash
npm install
npx expo start
```

큐알 코드로 Expo Go(iOS/Android)에서 열거나 `w` 키로 웹 미리보기를 띄울 수 있다.

타입체크와 린트:

```bash
npm run typecheck
npm run lint
```

---

## 스택

| 영역 | 선택 |
| --- | --- |
| Framework | Expo SDK 54 + Expo Router 6 |
| Language | TypeScript strict |
| Styling | NativeWind v4 + 디자인 토큰 (`constants/theme.ts`) |
| Animation | react-native-reanimated v4 |
| SVG | react-native-svg |
| Backend | Supabase (이번 세션은 client stub) |
| State | Zustand (auth) |
| Server state | @tanstack/react-query |

---

## 폰트

- **Pretendard** — 한국어 본문 / 디스플레이 (otf 로컬, `assets/fonts/`)
- **Caveat** — 손글씨 액센트 (영문 전용, 한글은 Pretendard로 자동 폴백)
- **Fraunces** — `TROVE` 워드마크 + manifesto serif
- **Quicksand** — 영문 산세리프 body
- **Space Mono** — 라벨·번호 스탬프·날짜 라인

`lib/fonts.ts`에서 한 곳으로 모아 로드. 새 weight가 필요하면 패키지에서 가져와 같은 키 이름으로 추가하면 된다.

---

## 디자인 토큰

색상·라운드·섀도우·회전값은 두 곳에서 같은 값을 사용한다.

- `tailwind.config.js` → NativeWind 클래스 (`bg-mocha`, `rounded-sticker` …)
- `constants/theme.ts` → 인라인 스타일 / Reanimated 값

핵심 팔레트:

| 토큰 | hex | 용도 |
| --- | --- | --- |
| `latte` | `#FBF6EC` | 전체 배경 |
| `cream` | `#FFFCF5` | 스티커·카드 표면 |
| `mocha` | `#5C4434` | 본문 텍스트 |
| `mochaDark` | `#3D2818` | 헤드라인 |
| `honey` | `#E6B450` | 액센트 · 손글씨 |
| `dusty` | `#E8B5A8` | vibe `감성적인` |
| `sage` | `#A8B89C` | vibe `조용한` · masking tape |

스티커 회전·간격은 `STICKER_ROTATIONS`, `STICKER_MARGIN_TOPS`로 결정적이다 (인덱스 기반).

---

## 폴더 구조

```
trove-cafe/
├── app/
│   ├── (auth)/          # login / signup
│   ├── (tabs)/          # 도감 / 추가 / 프로필
│   ├── cafe/[id].tsx    # 카페 상세
│   ├── _layout.tsx      # 폰트·Provider·Stack
│   └── index.tsx        # auth 분기 (Redirect)
├── components/
│   ├── ui/              # Text, Chip, PaperCard, MaskingTape, IntroBadge
│   ├── icons/           # 음료 SVG (cup / latte / cake / cross / donut / bagel + star)
│   ├── BrandWordmark.tsx
│   ├── StickerCard.tsx
│   ├── StickerGrid.tsx
│   ├── DiaryStatBlock.tsx
│   └── PolaroidCard.tsx
├── constants/
│   ├── theme.ts         # 색상 / 라운드 / 섀도우 / 회전값
│   ├── cafes-seed.ts    # 12개 시드 카페
│   └── vibes.ts         # 15개 vibe + 카페별 매핑
├── lib/
│   ├── fonts.ts
│   ├── supabase.ts      # 이번 세션은 stub
│   └── types.ts         # DB 행 타입
├── stores/
│   └── auth.ts          # zustand auth store
├── assets/fonts/        # Pretendard otf
└── docs/
    └── trove-cafe-prototype.html   # 시각 스펙 (source of truth)
```

---

## Supabase

이번 세션은 **stub만** 구성. `lib/supabase.ts`는 환경 변수가 없으면 더미 URL로 클라이언트를 만들기만 한다 (`isSupabaseConfigured` flag 제공).

실제 연결을 켜려면 `.env`에:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

### 스키마 (다음 세션에 적용)

```sql
create table cafes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_en text,
  address text,
  district text,
  city text default '서울',
  category text,
  signature_menu text,
  instagram text,
  latitude double precision,
  longitude double precision,
  is_verified boolean default false,
  added_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create index cafes_district_idx on cafes(district);
create index cafes_category_idx on cafes(category);

create table vibes (
  id uuid primary key default gen_random_uuid(),
  label text unique not null,
  display_color text
);

create table cafe_vibes (
  cafe_id uuid references cafes(id) on delete cascade,
  vibe_id uuid references vibes(id) on delete cascade,
  primary key (cafe_id, vibe_id)
);

create table visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cafe_id uuid not null references cafes(id) on delete restrict,
  photo_url text,
  photo_processed_url text,
  card_url text,
  visited_at timestamptz not null,
  ordered_menu text,
  rating int check (rating between 1 and 5),
  notes text,
  companion text,
  rotation_deg int default 0,
  image_bg_variant text default 'cream',
  is_public boolean default false,
  created_at timestamptz default now()
);

create index visits_user_idx on visits(user_id, visited_at desc);
create index visits_cafe_idx on visits(cafe_id);

alter table cafes enable row level security;
alter table vibes enable row level security;
alter table cafe_vibes enable row level security;
alter table visits enable row level security;

create policy "cafes readable" on cafes for select using (true);
create policy "vibes readable" on vibes for select using (true);
create policy "cafe_vibes readable" on cafe_vibes for select using (true);

create policy "own visits" on visits for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "public visits readable" on visits for select
  using (is_public = true);

create policy "auth users add cafes" on cafes for insert
  with check (auth.uid() = added_by);
```

시드는 `constants/cafes-seed.ts` / `constants/vibes.ts`의 데이터를 `insert into cafes(name, district, category, signature_menu)`로 옮기면 된다.

---

## 이번 세션 범위

**완료**
- Expo Router + NativeWind v4 + 폰트 5종 세팅
- 디자인 토큰 (TS / Tailwind 동기)
- 재사용 컴포넌트 `Text` (variant 11종), `Chip`, `PaperCard`, `MaskingTape`, `IntroBadge`, `BrandWordmark`
- 음료 SVG 6종 + `StarIcon`, `EmptyDishIcon`, `FeatureDrinkIcon`
- `StickerCard` (visited/empty), `StickerGrid` (회전·어긋난 marginTop + fade-up stagger), `DiaryStatBlock`, `PolaroidCard`
- Auth 분기, login / signup 화면 (latte 배경 + cream 폼 카드 + masking tape)
- 도감 메인 (`/(tabs)/index`) — 헤더 + Intro + DiaryStatBlock(0번째 페이지) + 12개 시드 카페 empty 콜라주 + manifesto
- 카페 상세 (`/cafe/[id]`) — placeholder 폴라로이드 + signature + vibe chips + "방문 기록 남기기" placeholder toast

**범위 밖 (다음 세션)**
- 카메라 / 위치 / 카페 자동 매칭 (Google Places)
- AI 누끼 / 카드 자동 생성
- 인스타 공유
- 결제 / 지도 / 사용자 카페 추가 UI
- vibe 필터 / sub 컬렉션 (빵지순례, 케이크 도감)

---

## 자매 앱: Trove Peaks

코어 인프라(Supabase, 컴포넌트 패턴, TROVE 워드마크)는 공유하되 톤은 완전히 다르다.

| | Peaks | Cafe |
| --- | --- | --- |
| 메타포 | 도감 책 (박물관) | 스티커북 (일기장) |
| 컬러 | navy / gold / cream | latte / mocha / honey / dusty / sage |
| 타이포 | Fraunces serif | Caveat 손글씨 + Pretendard 둥근 산세리프 |
| 레이아웃 | 격자 정렬 | 회전 콜라주 |
