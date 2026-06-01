interface CharacterPickerProps {
  value: string;
  onChange: (char: string) => void;
}

export default function CharacterPicker({ value, onChange }: CharacterPickerProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const first = [...e.target.value][0] ?? '';
    if (first) onChange(first);
  }

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type or paste any emoji or character…"
        className="border border-gray-300 rounded-lg px-3 py-2 text-center text-3xl w-48 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <p className="text-xs text-gray-400">Paste an emoji, flag, letter, or any symbol</p>
    </div>
  );
}
