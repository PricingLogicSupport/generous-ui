import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button, IconButton } from "./button";

export interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  onOpenChange: (open: boolean) => void;
}

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  closeLabel = "Close",
  onOpenChange
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );

    focusable?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open, onOpenChange]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="gui-dialog-layer" role="presentation">
      <div className="gui-dialog-backdrop" onClick={() => onOpenChange(false)} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="gui-dialog"
      >
        <header className="gui-dialog-header">
          <div>
            <h2 id={titleId} className="gui-dialog-title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="gui-dialog-description">
                {description}
              </p>
            ) : null}
          </div>
          <IconButton aria-label={closeLabel} onClick={() => onOpenChange(false)}>
            <X aria-hidden="true" size={20} />
          </IconButton>
        </header>
        <div className="gui-dialog-body">{children}</div>
        {footer ? <footer className="gui-dialog-footer">{footer}</footer> : null}
      </div>
    </div>,
    document.body
  );
}

export function ConfirmDialogFooter({
  cancelLabel = "Cancel",
  confirmLabel,
  onCancel,
  onConfirm
}: {
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <Button onClick={onCancel}>{cancelLabel}</Button>
      <Button variant="primary" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </>
  );
}
