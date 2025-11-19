"use client";

import { Palette, Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/theme-context";

const themes = [
  { name: "Teal", value: "teal", color: "#20808d" },
  { name: "Blue", value: "blue", color: "#2563eb" },
  { name: "Purple", value: "purple", color: "#9333ea" },
  { name: "Green", value: "green", color: "#16a34a" },
  { name: "Orange", value: "orange", color: "#ea580c" },
  { name: "Pink", value: "pink", color: "#db2777" },
] as const;

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        title="Change theme color"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Theme</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-200 p-3 z-50 animate-fadeIn">
            <div className="mb-2 px-2 py-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Choose Theme
              </p>
            </div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center"
                    style={{ backgroundColor: t.color }}
                  >
                    {theme === t.value && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-1 text-left">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
