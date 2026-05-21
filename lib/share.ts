import { Platform, Share, type View } from 'react-native';
import { type RefObject } from 'react';

import type { AppCafe } from '@/lib/cafes';
import type { Visit } from '@/stores/visits';

export function buildShareText(cafe: AppCafe, visit: Visit): string {
  const stars = '★'.repeat(Math.round(visit.rating)) + '☆'.repeat(5 - Math.round(visit.rating));
  const d = new Date(visit.visitedAt);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const lines: string[] = [];
  lines.push(`📒 ${cafe.name} · ${cafe.district}`);
  if (visit.orderedMenu) lines.push(`☕ ${visit.orderedMenu}`);
  lines.push(`${stars}  ${yyyy}.${mm}.${dd}`);
  if (visit.notes) lines.push(`"${visit.notes}"`);
  if (visit.vibes.length > 0) lines.push(`#${visit.vibes.join(' #')}`);
  lines.push('');
  lines.push('via Trove Cafe — 오늘 카페, 도감에 붙이기.');
  return lines.join('\n');
}

export async function shareVisitText(cafe: AppCafe, visit: Visit): Promise<void> {
  await Share.share({ message: buildShareText(cafe, visit) });
}

export type ShareResult = 'image' | 'text' | 'cancelled' | 'failed';

export async function shareVisitImage(
  ref: RefObject<View | null>,
  cafe: AppCafe,
  visit: Visit,
): Promise<ShareResult> {
  if (Platform.OS === 'web') {
    try {
      await shareVisitText(cafe, visit);
      return 'text';
    } catch {
      return 'cancelled';
    }
  }
  try {
    const node = ref.current;
    if (!node) throw new Error('share-ref-missing');
    const [{ captureRef }, Sharing] = await Promise.all([
      import('react-native-view-shot'),
      import('expo-sharing'),
    ]);
    const uri = await captureRef(node, {
      format: 'png',
      quality: 1,
      result: 'tmpfile',
    });
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      await shareVisitText(cafe, visit);
      return 'text';
    }
    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: 'Trove 스티커 공유',
    });
    return 'image';
  } catch (e) {
    // Expo Go falls back here: native view-shot not bundled.
    try {
      await shareVisitText(cafe, visit);
      return 'text';
    } catch {
      return 'failed';
    }
  }
}
