import { createContext, useContext } from "react";

export type Theme = "dark" | "light" | "system";
export type ColorTheme = "evergreen" | "afterglow" | "linen" | "midnight";

export type ThemeProviderState = {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
};

const createThemeProviderState = (): ThemeProviderState => ({
  theme: "light",
  colorTheme: "evergreen",
  setTheme: () => null,
  setColorTheme: () => null,
});

export const ThemeProviderContext = createContext<ThemeProviderState>(
  createThemeProviderState()
);

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  return context;
};
