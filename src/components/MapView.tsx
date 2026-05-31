import { MapContainer, TileLayer } from 'react-leaflet';
import type { Banner } from '../lib/types';
import BannerMarker from './BannerMarker';

interface MapViewProps {
  banners: Banner[];
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
        {banners.map((b) => (
          <BannerMarker key={b.id} banner={b} />
        ))}
      </MapContainer>
    </div>
  );
}
