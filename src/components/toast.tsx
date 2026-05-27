import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./button";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  tone?: "neutral" | "success" | "danger";
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

export interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { ...toast, id }]);
      window.setTimeout(() => removeToast(id), 4800);
      return id;
    },
    [removeToast]
  );

  const value = useMemo(() => ({ addToast, removeToast, toasts }), [addToast, removeToast, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToasts() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts must be used inside ToastProvider.");
  }
  return context;
}

export function Toaster() {
  const { removeToast, toasts } = useToasts();

  return (
    <div className="gui-toaster" aria-live="polite" aria-relevant="additions removals">
      {toasts.map((toast) => (
        <div className="gui-toast" data-tone={toast.tone ?? "neutral"} key={toast.id}>
          <div>
            <div className="gui-toast-title">{toast.title}</div>
            {toast.message ? <div className="gui-toast-message">{toast.message}</div> : null}
            {toast.action ? (
              <button
                type="button"
                className="gui-toast-action"
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
              >
                {toast.action.label}
              </button>
            ) : null}
          </div>
          <IconButton aria-label="Dismiss notification" onClick={() => removeToast(toast.id)}>
            <X aria-hidden="true" size={18} />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
