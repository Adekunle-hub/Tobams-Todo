"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (theme === "dark") console.log("Dark mode is enabled");
    else console.log("Light mode is enabled");
  }, [theme]);

  if (!mounted) return null;

  const handleClick = (mode: "dark" | "light") => {
    setTheme(mode);
  };

  return (
    <div>
      {(theme === "light" || theme==="system") && (
        <div className="flex items-center justify-center bg-background-dark w-fit  mx-auto p-1 rounded-2xl gap-2">
          <button
            onClick={() => handleClick("light")}
            className="
      flex items-center cursor-pointer text-xs text-center font-semibold bg-[#FFFFFF] text-[#1C1D22]  rounded-2xl px-4 py-1 gap-1"
          >
            Light <Sun className="h-4 w-4" />{" "}
          </button>
          <button
            onClick={() => handleClick("dark")}
            className="
        flex items-center px-4 cursor-pointer font-semibold py-1 text-[#1C1D2280]  rounded-2xl text-xs text-center  gap-1"
          >
            Dark <Moon className="h-4 w-4" />{" "}
          </button>
        </div>
      )}
      {theme === "dark" && (
        <div className="flex items-center justify-center bg-[#FFFFFF0A] w-fit  mx-auto p-1 rounded-2xl gap-2">
          <button
            onClick={() => handleClick("light")}
            className="
      flex items-center cursor-pointer text-xs text-center font-semibold  text-[#FFFFFF80]  rounded-2xl px-4 py-1 gap-1"
          >
            Light <Sun className="h-4 w-4" />{" "}
          </button>
          <button
            onClick={() => handleClick("dark")}
            className="
        flex items-center px-4 cursor-pointer font-semibold py-1 text-white bg-[#FFFFFF0F]  rounded-2xl text-xs text-center  gap-1"
          >
            Dark <Moon className="h-4 w-4" />{" "}
          </button>
        </div>
      )}
    </div>
  );
}
