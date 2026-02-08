import { cn } from "@/lib/utils";
import type { ColorThemeItem } from "@/types";

interface ThemeItemProps {
  theme: ColorThemeItem;
  selected: boolean;
  onSelect: (theme: ColorThemeItem) => void;
}

const ThemeItem = ({ theme, selected, onSelect }: ThemeItemProps) => {
  return (
    <div
      className={cn(
        "w-34 h-44 rounded-md border p-1.5 shadow-sm hover:bg-muted/50 cursor-pointer",
        selected && "border-primary"
      )}
      onClick={() => onSelect(theme)}
    >
      <div className={cn("w-full h-20 rounded-md", theme.className)} />
      <div className="flex flex-col gap-1 p-1">
        <p className="text-sm font-bold">{theme.name}</p>
        <p className="text-xs text-gray-500">{theme.description}</p>
        <div className="flex gap-1">
          {theme.mainColorList.map((color) => (
            <div
              key={color}
              className={cn("w-4 h-4 rounded-full border mt-2", color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeItem;
