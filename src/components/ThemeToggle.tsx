"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme ?? "light";
  const isLight = currentTheme === "light";
  const isDark = currentTheme === "dark";

  const handleClick = (mode: "dark" | "light") => setTheme(mode);

  return (
    <div className="flex items-center justify-center w-fit mx-auto p-1 rounded-2xl gap-2">
      <button
        onClick={() => handleClick("light")}
        className={`
          flex items-center cursor-pointer text-xs text-center font-semibold rounded-2xl px-4 py-1 gap-1
          ${isLight ? "bg-[#FFFFFF] text-[#1C1D22]" : "text-[#FFFFFF80]"}
        `}
      >
        Light <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => handleClick("dark")}
        className={`
          flex items-center px-4 cursor-pointer font-semibold py-1 rounded-2xl text-xs text-center gap-1
          ${isDark ? "text-white bg-[#FFFFFF0F]" : "text-[#1C1D2280]"}
        `}
      >
        Dark <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
