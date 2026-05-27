import type { ReactNode } from "react";
import { Kbd } from "./kbd";
import { cn } from "../lib/cn";

export interface ShortcutItem {
  action: ReactNode;
  description?: ReactNode;
  keys: string[];
}

export interface ShortcutListProps {
  title: string;
  description?: ReactNode;
  shortcuts: ShortcutItem[];
  className?: string;
}

export function ShortcutList({ title, description, shortcuts, className }: ShortcutListProps) {
  return (
    <section className={cn("gui-shortcut-list", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <dl>
        {shortcuts.map((shortcut, index) => (
          <div key={index}>
            <dt>
              <strong>{shortcut.action}</strong>
              {shortcut.description ? <span>{shortcut.description}</span> : null}
            </dt>
            <dd>
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
