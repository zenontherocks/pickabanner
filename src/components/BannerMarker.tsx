import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Banner } from '../lib/types';

interface BannerMarkerProps {
  banner: Banner;
  lat: number;
  lng: number;
}

export default function BannerMarker({ banner, lat, lng }: BannerMarkerProps) {
  const color = /^#[0-9a-fA-F]{3,6}$/.test(banner.character) ? banner.character : '#6366f1';

  const icon = useMemo(
    () =>
      L.divIcon({
        html: `<div class="banner-pin" style="background:${color};border-color:${color}"></div>`,
        className: '',
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -34],
      }),
    [color]
  );

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup>
        <div className="text-center min-w-[140px]">
          <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: color }} />
          <div className="text-sm font-medium text-gray-700">{banner.locationInput}</div>
          {banner.note && (
            <div className="text-sm text-gray-500 mt-1 max-w-[200px] break-words">{banner.note}</div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
