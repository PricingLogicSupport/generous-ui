import { Menu } from "./menu";
import type { MenuItem } from "./menu";
import { cn } from "../lib/cn";

export interface MenuBarGroup {
  label: string;
  items: MenuItem[];
}

export interface MenuBarProps {
  label: string;
  groups: MenuBarGroup[];
  className?: string;
}

export function MenuBar({ label, groups, className }: MenuBarProps) {
  return (
    <nav className={cn("gui-menu-bar", className)} aria-label={label}>
      {groups.map((group) => (
        <Menu key={group.label} label={`${group.label} menu`} trigger={group.label} items={group.items} />
      ))}
    </nav>
  );
}
