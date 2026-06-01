import { useState } from 'react';
import { EmojiPicker } from 'frimousse';

const FLAG_EMOJIS = [
  '🇺🇸','🇬🇧','🇨🇦','🇦🇺','🇩🇪','🇫🇷','🇯🇵','🇨🇳','🇮🇳','🇧🇷',
  '🇲🇽','🇮🇹','🇪🇸','🇰🇷','🇷🇺','🇿🇦','🇳🇬','🇪🇬','🇸🇦','🇦🇪',
  '🇹🇷','🇮🇩','🇵🇭','🇻🇳','🇹🇭','🇵🇰','🇧🇩','🇮🇷','🇮🇶','🇦🇷',
  '🇨🇴','🇨🇱','🇵🇪','🇺🇦','🇵🇱','🇳🇱','🇧🇪','🇸🇪','🇳🇴','🇩🇰',
  '🇫🇮','🇨🇭','🇦🇹','🇵🇹','🇬🇷','🇨🇿','🇭🇺','🇷🇴','🇸🇬','🇳🇿',
];

type Tab = 'emoji' | 'flag' | 'custom';

const TABS: { id: Tab; label: string }[] = [
  { id: 'emoji',  label: '😀 Emoji' },
  { id: 'flag',   label: '🏳️ Flag' },
  { id: 'custom', label: '✏️ Custom' },
];

interface CharacterPickerProps {
  value: string;
  onChange: (char: string) => void;
}

export default function CharacterPicker({ value, onChange }: CharacterPickerProps) {
  const [tab, setTab] = useState<Tab>('emoji');
  const [customInput, setCustomInput] = useState('');

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const first = [...e.target.value][0] ?? '';
    setCustomInput(first);
    if (first) onChange(first);
  }

  return (
    <div>
      <div className="flex gap-1 mb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
              tab === t.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'emoji' && (
        <EmojiPicker.Root
          onEmojiSelect={(emoji) => onChange(emoji.emoji)}
          className="w-full rounded-lg border border-gray-200 overflow-hidden"
          style={{ height: '280px' }}
        >
          <EmojiPicker.Search className="w-full px-3 py-2 text-sm border-b border-gray-200 outline-none" placeholder="Search emoji…" />
          <EmojiPicker.Viewport className="flex-1 overflow-y-auto">
            <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
            <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
            <EmojiPicker.List />
          </EmojiPicker.Viewport>
        </EmojiPicker.Root>
      )}

      {tab === 'flag' && (
        <div className="grid grid-cols-8 gap-1 max-h-[280px] overflow-y-auto p-1">
          {FLAG_EMOJIS.map((flag) => (
            <button
              key={flag}
              type="button"
              onClick={() => onChange(flag)}
              className={`text-2xl p-1 rounded hover:bg-gray-100 transition-colors ${
                value === flag ? 'bg-indigo-100 ring-2 ring-indigo-400' : ''
              }`}
            >
              {flag}
            </button>
          ))}
        </div>
      )}

      {tab === 'custom' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <input
            type="text"
            value={customInput}
            onChange={handleCustomChange}
            placeholder="Type any character…"
            className="border border-gray-300 rounded-lg px-3 py-2 text-center text-2xl w-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <p className="text-xs text-gray-400">Any single character, symbol, or emoji</p>
        </div>
      )}
    </div>
  );
}
