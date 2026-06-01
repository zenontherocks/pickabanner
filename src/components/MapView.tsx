import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import type { Banner } from '../lib/types';
import BannerMarker from './BannerMarker';

interface MapViewProps {
  banners: Banner[];
}

// Spread radius in degrees, scales with zoom so pins are always visually separated.
// At zoom 2 (~world view) = ~3 degrees; at zoom 10 = ~0.01 degrees.
function spreadRadius(zoom: number) {
  return 3 / Math.pow(2, zoom - 2);
}

function spreadBanners(banners: Banner[], zoom: number): { banner: Banner; lat: number; lng: number }[] {
  const radius = spreadRadius(zoom);
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
      lat: b.lat + radius * Math.cos(angle),
      lng: b.lng + radius * Math.sin(angle),
    };
  });
}

function Markers({ banners }: { banners: Banner[] }) {
  const [zoom, setZoom] = useState(2);
  useMapEvents({ zoomend: (e) => setZoom(e.target.getZoom()) });
  const spread = spreadBanners(banners, zoom);
  return (
    <>
      {spread.map(({ banner, lat, lng }) => (
        <BannerMarker key={banner.id} banner={banner} lat={lat} lng={lng} />
      ))}
    </>
  );
}

export default function MapView({ banners }: MapViewProps) {
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
        <Markers banners={banners} />
      </MapContainer>
    </div>
  );
}
