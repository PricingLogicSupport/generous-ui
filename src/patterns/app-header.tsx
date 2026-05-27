import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AppHeaderNavItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
  onClick?: () => void;
}

export interface AppHeaderProps {
  brand: ReactNode;
  href?: string;
  nav?: AppHeaderNavItem[];
  actions?: ReactNode;
  className?: string;
}

export function AppHeader({ brand, href = "#", nav = [], actions, className }: AppHeaderProps) {
  return (
    <header className={cn("gui-app-header", className)}>
      <a className="gui-app-brand" href={href}>
        {brand}
      </a>
      {nav.length ? (
        <nav aria-label="Primary navigation" className="gui-app-header-nav">
          {nav.map((item, index) => {
            const key = typeof item.label === "string" ? item.label : index;
            const sharedProps = {
              className: "gui-app-header-link",
              "aria-current": item.current ? "page" as const : undefined
            };

            return item.href ? (
              <a key={key} href={item.href} onClick={item.onClick} {...sharedProps}>
                {item.label}
              </a>
            ) : (
              <button key={key} type="button" onClick={item.onClick} {...sharedProps}>
                {item.label}
              </button>
            );
          })}
        </nav>
      ) : null}
      {actions ? <div className="gui-app-header-actions">{actions}</div> : null}
    </header>
  );
}
