import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { Link } from "react-router";


interface SidebarNavProps {
  activeNavKey?: string;
}

const SidebarNav = ({ activeNavKey }: SidebarNavProps) => {
  return (
    <nav className="hidden md:flex w-40 h-full border-r flex-col gap-2 px-2 py-4">
      {NAV_ITEMS.map((item) => (
        <Link className="w-full box-border" key={item.key} to={item.href}>
          <Button variant="ghost" className={cn("w-full justify-start text-muted-foreground gap-1", activeNavKey === item.key && "text-primary")}>
            <item.icon className={cn("size-4 stroke-2", activeNavKey === item.key && "stroke-3")} />
            <span className={cn("text-xs", activeNavKey === item.key && "font-bold")}>{item.label}</span>
          </Button>
        </Link>
      ))}
    </nav>
  )
}

export default SidebarNav