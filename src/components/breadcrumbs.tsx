import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  label?: string;
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

export function Breadcrumbs({ items, label = "Breadcrumb", linkProps }: BreadcrumbsProps) {
  return (
    <nav className="gui-breadcrumbs" aria-label={label}>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href && !item.current ? (
              <a href={item.href} {...linkProps}>
                {item.label}
              </a>
            ) : (
              <span aria-current={item.current ? "page" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function BreadcrumbSlot({ children }: { children: ReactNode }) {
  return <div className="gui-breadcrumb-slot">{children}</div>;
}
