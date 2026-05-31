import { useState } from 'react';
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';

const FLAG_EMOJIS = [
  '🇺🇸','🇬🇧','🇨🇦','🇦🇺','🇩🇪','🇫🇷','🇯🇵','🇨🇳','🇮🇳','🇧🇷',
  '🇲🇽','🇮🇹','🇪🇸','🇰🇷','🇷🇺','🇿🇦','🇳🇬','🇪🇬','🇸🇦','🇦🇪',
  '🇹🇷','🇮🇩','🇵🇭','🇻🇳','🇹🇭','🇵🇰','🇧🇩','🇮🇷','🇮🇶','🇦🇷',
  '🇨🇴','🇨🇱','🇵🇪','🇺🇦','🇵🇱','🇳🇱','🇧🇪','🇸🇪','🇳🇴','🇩🇰',
  '🇫🇮','🇨🇭','🇦🇹','🇵🇹','🇬🇷','🇨🇿','🇭🇺','🇷🇴','🇸🇬','🇳🇿',
];

type Tab = 'emoji' | 'flag' | 'custom';

interface CharacterPickerProps {
  value: string;
  onChange: (char: string) => void;
}

export default function CharacterPicker({ value, onChange }: CharacterPickerProps) {
  const [tab, setTab] = useState<Tab>('emoji');
  const [customInput, setCustomInput] = useState('');

  function handleEmojiClick(data: EmojiClickData) {
    onChange(data.emoji);
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const chars = [...raw];
    const first = chars[0] ?? '';
    setCustomInput(first);
    if (first) onChange(first);
  }

  return (
    <div>
      {value && (
        <div className="text-center mb-3">
          <span className="text-5xl">{value}</span>
        </div>
      )}

      <div className="flex gap-1 mb-3">
        {(['emoji', 'flag', 'custom'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
              tab === t
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'emoji' && (
        <div className="flex justify-center">
          <EmojiPicker onEmojiClick={handleEmojiClick} height={320} width="100%" />
        </div>
      )}

      {tab === 'flag' && (
        <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto p-1">
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
        <div className="flex flex-col items-center gap-3">
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
