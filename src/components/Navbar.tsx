interface NavbarProps {
  onPlaceBanner: () => void;
}

export default function Navbar({ onPlaceBanner }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-md h-14 flex items-center px-4 gap-4">
      <span className="text-xl font-bold text-gray-800 tracking-tight">📍 PickABanner</span>
      <div className="flex-1" />
      <button
        onClick={onPlaceBanner}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Place a Banner
      </button>
    </nav>
  );
}
