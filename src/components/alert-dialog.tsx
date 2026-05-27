import type { ReactNode } from "react";
import { Button } from "./button";
import { Dialog } from "./dialog";

export interface AlertDialogProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  cancelLabel?: string;
  actionLabel: string;
  onCancel?: () => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export function AlertDialog({
  open,
  title,
  description,
  children,
  cancelLabel = "Cancel",
  actionLabel,
  onCancel,
  onConfirm,
  onOpenChange
}: AlertDialogProps) {
  function cancel() {
    onCancel?.();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      title={title}
      description={description}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button onClick={cancel}>{cancelLabel}</Button>
          <Button variant="danger" onClick={onConfirm}>
            {actionLabel}
          </Button>
        </>
      }
    >
      <div className="gui-alert-dialog-body">{children}</div>
    </Dialog>
  );
}
