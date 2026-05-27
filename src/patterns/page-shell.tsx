import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button, IconButton } from "../components/button";

export interface PageShellProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  id?: string;
  actions?: ReactNode;
  backLabel?: string;
  onBack?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function PageShell({
  title,
  eyebrow,
  children,
  id,
  actions,
  backLabel = "Back",
  onBack,
  primaryAction
}: PageShellProps) {
  return (
    <main id={id} className="gui-page">
      <header className="gui-page-header">
        <div className="gui-page-leading">
          {onBack ? (
            <IconButton aria-label={backLabel} onClick={onBack}>
              <ArrowLeft aria-hidden="true" size={21} />
            </IconButton>
          ) : null}
          <div>
            {eyebrow ? <p className="gui-page-eyebrow">{eyebrow}</p> : null}
            <h1 className="gui-page-title">{title}</h1>
          </div>
        </div>
        {actions ? <div className="gui-page-actions">{actions}</div> : null}
      </header>
      <div className="gui-page-content">{children}</div>
      {primaryAction ? (
        <footer className="gui-primary-footer">
          <Button variant="primary" size="lg" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        </footer>
      ) : null}
    </main>
  );
}
