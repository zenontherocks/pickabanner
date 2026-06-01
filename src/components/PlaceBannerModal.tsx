import { useState } from 'react';
import { geocode } from '../lib/geocode';
import { createBanner } from '../lib/api';
import type { Banner } from '../lib/types';
import CharacterPicker from './CharacterPicker';

interface PlaceBannerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (banner: Banner) => void;
}

export default function PlaceBannerModal({ open, onClose, onSubmit }: PlaceBannerModalProps) {
  const [character, setCharacter] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  function reset() {
    setCharacter('');
    setLocationInput('');
    setNote('');
    setError(null);
    setSubmitting(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!character) { setError('Please pick a character for your banner.'); return; }
    if (!locationInput.trim()) { setError('Please enter a location.'); return; }
    if (note.length > 128) { setError('Note must be 128 characters or fewer.'); return; }

    setError(null);
    setSubmitting(true);

    const geo = await geocode(locationInput.trim());
    if (!geo) {
      setError('Location not found. Try a city name, zip code, or "lat,lng".');
      setSubmitting(false);
      return;
    }

    try {
      const banner = await createBanner({
        character,
        locationInput: locationInput.trim(),
        lat: geo.lat,
        lng: geo.lng,
        note,
      });
      onSubmit(banner);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Place a Banner</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choose your banner
            </label>
            <CharacterPicker value={character} onChange={setCharacter} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="City, state, zip code, or lat,lng"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Note <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={128}
              rows={3}
              placeholder="Add a message…"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="text-xs text-gray-400 text-right mt-0.5">{note.length}/128</div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg py-2 text-sm font-semibold transition-colors"
            >
              {submitting ? 'Placing…' : 'Place Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
