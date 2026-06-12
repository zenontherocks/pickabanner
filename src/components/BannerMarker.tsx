import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Banner } from '../lib/types';

interface BannerMarkerProps {
  banner: Banner;
  lat: number;
  lng: number;
}

function parseColors(character: string): string[] {
  const parts = character.split(',').map(s => s.trim()).filter(s => /^#[0-9a-fA-F]{6}$/.test(s));
  if (parts.length > 0) return parts;
  if (/^#[0-9a-fA-F]{3}$/.test(character)) {
    return ['#' + [...character.slice(1)].map(c => c + c).join('')];
  }
  return ['#6366f1'];
}

function pinBackground(colors: string[], direction: string): string {
  const d = direction === 'vertical' ? '135deg' : '225deg';
  if (colors.length === 1) return colors[0];
  if (colors.length === 2) return `linear-gradient(${d},${colors[0]} 50%,${colors[1]} 50%)`;
  return `linear-gradient(${d},${colors[0]} 33.3%,${colors[1]} 33.3% 66.6%,${colors[2]} 66.6%)`;
}

export default function BannerMarker({ banner, lat, lng }: BannerMarkerProps) {
  const colors = useMemo(() => parseColors(banner.character), [banner.character]);
  const bg = useMemo(() => pinBackground(colors, banner.direction ?? 'horizontal'), [colors, banner.direction]);

  const icon = useMemo(
    () =>
      L.divIcon({
        html: `<div class="banner-pin" style="background:${bg}"></div>`,
        className: '',
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -34],
      }),
    [bg]
  );

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup>
        <div className="text-center min-w-[140px]">
          <div className="flex justify-center gap-1 mb-2">
            {colors.map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="text-sm font-medium text-gray-700">{banner.locationInput}</div>
          {banner.note && (
            <div className="text-sm text-gray-500 mt-1 max-w-[200px] break-words">{banner.note}</div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
