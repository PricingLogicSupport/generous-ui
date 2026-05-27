import type { ReactNode } from "react";
import { Button } from "./button";

export interface ConfirmationPanelProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children?: ReactNode;
}

export function ConfirmationPanel({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  children
}: ConfirmationPanelProps) {
  return (
    <section className="gui-confirmation-panel">
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {children}
      </div>
      <div>
        {onCancel ? <Button onClick={onCancel}>{cancelLabel}</Button> : null}
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </section>
  );
}
