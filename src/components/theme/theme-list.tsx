import { THEMES } from "@/lib/constants";
import ThemeItem from "./theme-item";
import { useTheme } from "@/lib/theme-context";
import type { ColorThemeItem } from "@/types";

const ThemeList = () => {
  const { colorTheme, setColorTheme } = useTheme();

  const handleSelect = (theme: ColorThemeItem) => {
    setColorTheme(theme.name);
  };

  return (
    <div className="w-full  p-2.5 flex flex-col gap-2.5">
      <p className="text-xl font-bold">테마 변경</p>
      <p className="text-sm text-muted-foreground">
        선택한 테마가 바로 적용됩니다.
      </p>
      <div className="flex gap-2.5 flex-wrap">
        {THEMES.map((theme) => (
          <ThemeItem
            key={theme.name}
            theme={theme}
            selected={colorTheme === theme.name}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeList;
