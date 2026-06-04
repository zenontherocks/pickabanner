interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-semibold text-gray-700">Choose a color</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-12 h-10 rounded cursor-pointer border border-gray-300"
        />
        <span className="text-sm text-gray-500 font-mono">{value}</span>
      </div>
    </div>
  );
}
