import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import PlaceBannerModal from './components/PlaceBannerModal';
import { fetchBanners } from './lib/api';
import type { Banner } from './lib/types';

export default function App() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchBanners().then(setBanners).catch(console.error);
    const id = setInterval(() => {
      fetchBanners().then(setBanners).catch(console.error);
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Navbar onPlaceBanner={() => setModalOpen(true)} />
      <MapView banners={banners} />
      <PlaceBannerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(banner) => setBanners((prev) => [banner, ...prev])}
      />
    </div>
  );
}
