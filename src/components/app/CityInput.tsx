import { useState, useRef, useEffect } from "react";
import { RUSSIAN_CITIES } from "@/data/cities";

interface CityInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

export default function CityInput({ value, onChange, placeholder, icon }: CityInputProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const suggestions = value.length >= 1
    ? RUSSIAN_CITIES.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
        {icon}
        <input
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-sm"
          autoComplete="off"
        />
        {value && (
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className="text-white/30 hover:text-white/60 transition-all text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full mt-1 z-50 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(18,20,30,0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {suggestions.map((city) => (
            <button
              key={city}
              className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-all flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(city);
                setOpen(false);
              }}
            >
              <span className="text-base">📍</span>
              <span>
                <span className="text-white font-medium">{city.slice(0, value.length)}</span>
                <span className="text-white/50">{city.slice(value.length)}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
