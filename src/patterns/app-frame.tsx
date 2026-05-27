import type { ReactNode } from "react";
import { Button } from "../components/button";

export interface AppFrameNavItem {
  label: string;
  current?: boolean;
  onClick?: () => void;
}

export interface AppFrameProps {
  title: string;
  nav: AppFrameNavItem[];
  children: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AppFrame({ title, nav, children, action }: AppFrameProps) {
  return (
    <div className="gui-app-frame">
      <aside>
        <strong>{title}</strong>
        <nav aria-label={`${title} navigation`}>
          {nav.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-current={item.current ? "page" : undefined}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <section>
        {children}
        {action ? (
          <footer>
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          </footer>
        ) : null}
      </section>
    </div>
  );
}
