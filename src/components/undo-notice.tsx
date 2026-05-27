import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface UndoNoticeProps {
  title: string;
  message?: ReactNode;
  undoLabel?: string;
  dismissLabel?: string;
  onUndo: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function UndoNotice({
  title,
  message,
  undoLabel = "Undo",
  dismissLabel = "Dismiss",
  onUndo,
  onDismiss,
  className
}: UndoNoticeProps) {
  return (
    <section className={cn("gui-undo-notice", className)} role="status">
      <div>
        <h2>{title}</h2>
        {message ? <p>{message}</p> : null}
      </div>
      <div className="gui-undo-actions">
        <Button onClick={onUndo}>{undoLabel}</Button>
        {onDismiss ? <Button onClick={onDismiss}>{dismissLabel}</Button> : null}
      </div>
    </section>
  );
}
