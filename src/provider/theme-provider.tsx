import { useEffect, useState } from "react";
import {
  type ColorTheme,
  type Theme,
  ThemeProviderContext,
  type ThemeProviderState,
} from "@/lib/theme-context";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  defaultColorTheme?: ColorTheme;
  colorStorageKey?: string;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  defaultColorTheme = "evergreen",
  colorStorageKey = "vite-ui-color-theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    return (
      (localStorage.getItem(colorStorageKey) as ColorTheme) || defaultColorTheme
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.dataset.theme = colorTheme;
  }, [colorTheme]);

  const value: ThemeProviderState = {
    theme,
    colorTheme,
    setTheme: (nextTheme) => {
      localStorage.setItem(storageKey, nextTheme);
      setTheme(nextTheme);
    },
    setColorTheme: (nextColorTheme) => {
      localStorage.setItem(colorStorageKey, nextColorTheme);
      setColorTheme(nextColorTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
