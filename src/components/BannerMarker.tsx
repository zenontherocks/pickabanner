import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Banner } from '../lib/types';

interface BannerMarkerProps {
  banner: Banner;
}

export default function BannerMarker({ banner }: BannerMarkerProps) {
  const icon = useMemo(
    () =>
      L.divIcon({
        html: `<div class="banner-pin"><span>${banner.character}</span></div>`,
        className: '',
        iconSize: [44, 52],
        iconAnchor: [22, 52],
        popupAnchor: [0, -54],
      }),
    [banner.character]
  );

  return (
    <Marker position={[banner.lat, banner.lng]} icon={icon}>
      <Popup>
        <div className="text-center min-w-[140px]">
          <div className="text-5xl mb-2">{banner.character}</div>
          <div className="text-sm font-medium text-gray-700">{banner.locationInput}</div>
          {banner.note && (
            <div className="text-sm text-gray-500 mt-1 max-w-[200px] break-words">{banner.note}</div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
