import { useRef, useState } from 'react';

const RAINBOW = 'linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))';

function hexToHsv(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 0xff) / 255, b = (n & 0xff) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

function hsvToHex(h: number, s: number, v: number): string {
  s /= 100; v /= 100;
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255).toString(16).padStart(2, '0');
  };
  return `#${f(5)}${f(3)}${f(1)}`;
}

function parseColors(value: string): [string, string, string] {
  const parts = value.split(',').map(s => s.trim()).filter(s => /^#[0-9a-fA-F]{6}$/.test(s));
  const base = parts[0] || '#888888';
  return [base, parts[1] ?? base, parts[2] ?? parts[1] ?? base];
}

function Sq({ h, s, v, onSV }: { h: number; s: number; v: number; onSV: (s: number, v: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  function pick(e: React.PointerEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onSV(Math.round(x * 100), Math.round((1 - y) * 100));
  }

  return (
    <div
      ref={ref}
      className="relative w-full rounded touch-none"
      style={{
        height: '72px',
        cursor: 'crosshair',
        background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(${h},100%,50%))`,
      }}
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); pick(e); }}
      onPointerMove={e => { if (e.buttons & 1) pick(e); }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '11px', height: '11px',
          left: `${s}%`, top: `${100 - v}%`,
          background: hsvToHex(h, s, v),
          border: '2px solid rgba(255,255,255,0.85)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.4)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [hsvs, setHsvs] = useState<[number, number, number][]>(() =>
    parseColors(value).map(hexToHsv)
  );

  function updateHsv(i: number, h: number, s: number, v: number) {
    const next = hsvs.map((c, j) => j === i ? [h, s, v] as [number, number, number] : c);
    setHsvs(next);
    onChange(next.map(([h, s, v]) => hsvToHex(h, s, v)).join(','));
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-semibold text-gray-700">Choose colors</label>
      <div className="flex gap-2">
        {hsvs.map(([h, s, v], i) => (
          <div key={i} className="flex-1 flex flex-col gap-1.5">
            <div className="h-5 rounded" style={{ background: hsvToHex(h, s, v) }} />
            <Sq h={h} s={s} v={v} onSV={(ns, nv) => updateHsv(i, h, ns, nv)} />
            <input
              type="range" min={0} max={360} value={h}
              className="color-slider w-full"
              style={{ background: RAINBOW }}
              onChange={e => updateHsv(i, +e.target.value, s, v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
