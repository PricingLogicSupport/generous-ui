import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface PermissionItem {
  label: ReactNode;
  reason: ReactNode;
}

export interface PermissionPanelProps {
  title: string;
  message: ReactNode;
  permissions: PermissionItem[];
  grantLabel: string;
  onGrant: () => void;
  denyLabel?: string;
  onDeny?: () => void;
  className?: string;
}

export function PermissionPanel({
  title,
  message,
  permissions,
  grantLabel,
  onGrant,
  denyLabel = "Not now",
  onDeny,
  className
}: PermissionPanelProps) {
  return (
    <section className={cn("gui-permission-panel", className)}>
      <header>
        <h2>{title}</h2>
        <p>{message}</p>
      </header>
      <ul>
        {permissions.map((permission, index) => (
          <li key={index}>
            <strong>{permission.label}</strong>
            <span>{permission.reason}</span>
          </li>
        ))}
      </ul>
      <div className="gui-permission-actions">
        <Button onClick={onGrant}>{grantLabel}</Button>
        {onDeny ? <Button onClick={onDeny}>{denyLabel}</Button> : null}
      </div>
    </section>
  );
}
