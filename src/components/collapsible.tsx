import { useId, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CollapsibleProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Collapsible({
  title,
  description,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className
}: CollapsibleProps) {
  const contentId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  function toggle() {
    const nextOpen = !isOpen;
    setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <section className={cn("gui-collapsible", className)} data-open={isOpen || undefined}>
      <button
        type="button"
        className="gui-collapsible-trigger"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
      >
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen ? (
        <div id={contentId} className="gui-collapsible-content">
          {children}
        </div>
      ) : null}
    </section>
  );
}
