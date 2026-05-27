import type { ReactNode } from "react";

export interface NavigationItem {
  label: string;
  href?: string;
  current?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface NavigationListProps {
  label: string;
  items: NavigationItem[];
}

export function NavigationList({ label, items }: NavigationListProps) {
  return (
    <nav className="gui-navigation-list" aria-label={label}>
      {items.map((item) => {
        const content = (
          <>
            {item.icon ? <span className="gui-navigation-icon">{item.icon}</span> : null}
            <span>{item.label}</span>
          </>
        );

        return item.href ? (
          <a key={item.label} href={item.href} aria-current={item.current ? "page" : undefined}>
            {content}
          </a>
        ) : (
          <button key={item.label} type="button" aria-current={item.current ? "page" : undefined} onClick={item.onClick}>
            {content}
          </button>
        );
      })}
    </nav>
  );
}
