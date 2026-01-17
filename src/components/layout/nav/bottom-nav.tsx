import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { Link } from "react-router";


interface BottomNavProps {
  activeNavKey?: string;
}

const BottomNav = ({ activeNavKey }: BottomNavProps) => {
  return (
    <nav className="md:hidden border-t w-full px-4 py-2 h-15 flex items-center justify-between gap-2 box-border">
      {NAV_ITEMS.map((item) => (
        <Link className="w-full h-full box-border" key={item.key} to={item.href}>
          <Button variant="ghost" className={cn("w-full h-full flex-col text-muted-foreground gap-1", activeNavKey === item.key && "text-primary")}>
            <item.icon className={cn("size-4 stroke-2", activeNavKey === item.key && "stroke-3")} />
            <span className={cn("text-xs", activeNavKey === item.key && "font-bold")}>{item.label}</span>
          </Button>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav