import { createContext, useContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const createThemeProviderState = (): ThemeProviderState => ({
  theme: "system",
  setTheme: () => null,
});

export const ThemeProviderContext = createContext<ThemeProviderState>(
  createThemeProviderState(),
);

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  return context;
};
