import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface PopoverProps {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
}

export function Popover({ trigger, title, children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="gui-popover" ref={ref}>
      <button type="button" className="gui-popover-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {trigger}
      </button>
      {open ? (
        <div className="gui-popover-panel" role="dialog" aria-label={title}>
          {title ? <h2>{title}</h2> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}
