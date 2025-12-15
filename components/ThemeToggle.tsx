"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="
        relative h-10 w-10 rounded-full
        flex items-center justify-center
        bg-white/5 border 
        border-white/10
        hover:bg-white/10 transition
      "
    >
      {/* SUN */}
      <Sun
        size={18}
        className={`
          absolute transition-all duration-300
          ${
            theme === "dark"
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }
        `}
      />

      {/* MOON */}
      <Moon
        size={18}
        className={`
          absolute transition-all duration-300
          ${
            theme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }
        `}
      />
    </button>
  );
}
