import type { ReactNode } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Progress } from "./progress";
import { cn } from "../lib/cn";

export interface ReleaseGateProps {
  title: string;
  description?: ReactNode;
  readiness: number;
  blockers?: ReactNode[];
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  className?: string;
}

export function ReleaseGate({ title, description, readiness, blockers = [], action, className }: ReleaseGateProps) {
  const blocked = blockers.length > 0;

  return (
    <section className={cn("gui-release-gate", className)} data-blocked={blocked || undefined}>
      <header>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        <Badge tone={blocked ? "warning" : "success"}>{blocked ? "Blocked" : "Ready"}</Badge>
      </header>
      <Progress value={readiness} label="Release readiness" />
      {blockers.length ? (
        <ul>
          {blockers.map((blocker, index) => (
            <li key={index}>{blocker}</li>
          ))}
        </ul>
      ) : null}
      {action ? (
        <div className="gui-release-action">
          <Button disabled={action.disabled ?? blocked} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
