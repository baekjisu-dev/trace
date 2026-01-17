import { NAV_ITEMS } from "@/lib/nav-items";


interface SidebarNavProps {
  activeNavKey?: string;
}

const SidebarNav = ({ activeNavKey }: SidebarNavProps) => {
  return (
    <aside className="hidden md:block w-64 h-full border-r">sidebar-nav</aside>
  )
}

export default SidebarNav