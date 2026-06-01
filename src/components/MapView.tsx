import { MapContainer, TileLayer } from 'react-leaflet';
import type { Banner } from '../lib/types';
import BannerMarker from './BannerMarker';

interface MapViewProps {
  banners: Banner[];
}

// When multiple banners share the same coordinates, spread them in a
// small circle so none are hidden behind another.
const SPREAD_RADIUS = 0.0004; // ~40 metres

function spreadBanners(banners: Banner[]): { banner: Banner; lat: number; lng: number }[] {
  const groups = new Map<string, Banner[]>();
  for (const b of banners) {
    const key = `${b.lat},${b.lng}`;
    const group = groups.get(key) ?? [];
    group.push(b);
    groups.set(key, group);
  }

  return banners.map((b) => {
    const key = `${b.lat},${b.lng}`;
    const group = groups.get(key)!;
    if (group.length === 1) return { banner: b, lat: b.lat, lng: b.lng };
    const idx = group.indexOf(b);
    const angle = (2 * Math.PI * idx) / group.length;
    return {
      banner: b,
      lat: b.lat + SPREAD_RADIUS * Math.cos(angle),
      lng: b.lng + SPREAD_RADIUS * Math.sin(angle),
    };
  });
}

export default function MapView({ banners }: MapViewProps) {
  const spread = spreadBanners(banners);

  return (
    <div className="absolute inset-0 top-14">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        worldCopyJump
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {spread.map(({ banner, lat, lng }) => (
          <BannerMarker key={banner.id} banner={banner} lat={lat} lng={lng} />
        ))}
      </MapContainer>
    </div>
  );
}
