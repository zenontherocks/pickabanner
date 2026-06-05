const COLORS = [
  '#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#319795',
  '#3182ce', '#5a67d8', '#805ad5', '#d53f8c', '#718096',
  '#fc8181', '#f6ad55', '#faf089', '#9ae6b4', '#81e6d9',
  '#90cdf4', '#a3bffa', '#d6bcfa', '#fbb6ce', '#e2e8f0',
  '#742a2a', '#7b341e', '#744210', '#276749', '#285e61',
  '#2a4365', '#3c366b', '#44337a', '#702459', '#1a202c',
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-semibold text-gray-700">Choose a color</label>
      <div className="grid grid-cols-10 gap-1.5">
        {COLORS.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            title={color}
            className="w-7 h-7 rounded-full transition-transform hover:scale-110 focus:outline-none"
            style={{
              background: color,
              boxShadow: value === color ? `0 0 0 2px white, 0 0 0 4px ${color}` : undefined,
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-7 h-7 rounded-full cursor-pointer border-0 p-0 bg-transparent"
          title="Custom color"
        />
        <span className="text-xs text-gray-400">Custom</span>
        <span className="text-xs text-gray-400 font-mono ml-auto">{value}</span>
      </div>
    </div>
  );
}
