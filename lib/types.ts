export type Cafe = {
  id: string;
  name: string;
  name_en: string | null;
  address: string | null;
  district: string | null;
  city: string;
  category: string | null;
  signature_menu: string | null;
  instagram: string | null;
  latitude: number | null;
  longitude: number | null;
  is_verified: boolean;
  added_by: string | null;
  created_at: string;
};

export type Vibe = {
  id: string;
  label: string;
  display_color: 'dusty' | 'sage' | 'honey' | 'cream' | 'mocha' | null;
};

export type Visit = {
  id: string;
  user_id: string;
  cafe_id: string;
  photo_url: string | null;
  photo_processed_url: string | null;
  card_url: string | null;
  visited_at: string;
  ordered_menu: string | null;
  rating: number | null;
  notes: string | null;
  companion: string | null;
  rotation_deg: number;
  image_bg_variant: 'pink' | 'sage' | 'honey' | 'mocha' | 'cream';
  is_public: boolean;
  created_at: string;
};

export type CafeWithVibes = Cafe & { vibes: Vibe[] };

export type Profile = {
  id: string;
  email: string;
  display_name: string | null;
  member_number: string;
};
