import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AppFooterLink {
  label: ReactNode;
  href: string;
}

export interface AppFooterProps {
  children?: ReactNode;
  links?: AppFooterLink[];
  className?: string;
}

export function AppFooter({ children, links = [], className }: AppFooterProps) {
  return (
    <footer className={cn("gui-app-footer", className)}>
      {children ? <div className="gui-app-footer-copy">{children}</div> : null}
      {links.length ? (
        <nav aria-label="Footer navigation" className="gui-app-footer-links">
          {links.map((link, index) => (
            <a key={typeof link.label === "string" ? link.label : index} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </footer>
  );
}
