import type { Banner } from './types';

export async function fetchBanners(): Promise<Banner[]> {
  const res = await fetch('/api/banners');
  if (!res.ok) throw new Error(`Failed to load banners: ${res.status}`);
  return res.json();
}

export async function createBanner(payload: {
  character: string;
  locationInput: string;
  lat: number;
  lng: number;
  note: string;
  direction: string;
}): Promise<Banner> {
  const res = await fetch('/api/banners', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json();
}
