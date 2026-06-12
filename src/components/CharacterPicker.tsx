import { useState } from 'react';

const RAINBOW = 'linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))';

function hslToHex(h: number, s: number, l: number): string {
  l /= 100; s /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 0xff) / 255, b = (n & 0xff) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  if (d === 0) return [0, 0, Math.round(l * 100)];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0)
          : max === g ? (b - r) / d + 2
          : (r - g) / d + 4;
  return [Math.round((h / 6) * 360), Math.round(s * 100), Math.round(l * 100)];
}

function parseColors(value: string): [string, string, string] {
  const parts = value.split(',').map(s => s.trim()).filter(s => /^#[0-9a-fA-F]{6}$/.test(s));
  const base = parts[0] || '#6366f1';
  return [base, parts[1] ?? base, parts[2] ?? parts[1] ?? base];
}

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [colors, setColors] = useState<[string, string, string]>(() => parseColors(value));

  function setColor(i: number, hex: string) {
    const next = [...colors] as [string, string, string];
    next[i] = hex;
    setColors(next);
    onChange(next.join(','));
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-semibold text-gray-700">Choose colors</label>
      <div className="flex gap-3">
        {colors.map((hex, i) => {
          const [h, s, l] = hexToHsl(hex);
          const midColor = s > 5 ? `hsl(${h},${s}%,50%)` : '#808080';
          return (
            <div key={i} className="flex-1 flex flex-col gap-1.5">
              <div className="h-9 rounded-lg" style={{ background: hex }} />
              <input
                type="range" min={0} max={360} value={h}
                className="color-slider w-full"
                style={{ background: RAINBOW }}
                onChange={e => setColor(i, hslToHex(+e.target.value, s < 10 ? 80 : s, l < 5 || l > 95 ? 50 : l))}
              />
              <input
                type="range" min={0} max={100} value={l}
                className="color-slider w-full"
                style={{ background: `linear-gradient(to right,#000,${midColor},#fff)` }}
                onChange={e => setColor(i, hslToHex(h, s < 10 && +e.target.value > 5 && +e.target.value < 95 ? 0 : s, +e.target.value))}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
