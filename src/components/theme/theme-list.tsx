import { THEMES } from "@/lib/constants";
import ThemeItem from "./theme-item";

const ThemeList = () => {
  return (
    <div className="w-full  p-2.5 flex flex-col gap-2.5">
      <p className="text-xl font-bold">테마 변경</p>
      <div className="flex gap-2.5 flex-wrap">
        {THEMES.map((theme) => (
          <ThemeItem key={theme.name} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default ThemeList;
