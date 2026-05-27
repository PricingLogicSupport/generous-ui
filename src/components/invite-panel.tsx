import type { ReactNode } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Select } from "./select";
import type { AccessRoleOption } from "./access-list";
import { cn } from "../lib/cn";

export interface InvitePanelProps {
  title: string;
  description?: ReactNode;
  email: string;
  role: string;
  roleOptions: AccessRoleOption[];
  onEmailChange: (email: string) => void;
  onRoleChange: (role: string) => void;
  onInvite: () => void;
  inviteLabel?: string;
  className?: string;
}

export function InvitePanel({
  title,
  description,
  email,
  role,
  roleOptions,
  onEmailChange,
  onRoleChange,
  onInvite,
  inviteLabel = "Send invite",
  className
}: InvitePanelProps) {
  return (
    <section className={cn("gui-invite-panel", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <div className="gui-invite-controls">
        <label>
          <span>Email</span>
          <Input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.currentTarget.value)}
          />
        </label>
        <label>
          <span>Role</span>
          <Select value={role} onChange={(event) => onRoleChange(event.currentTarget.value)}>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
        <Button onClick={onInvite}>{inviteLabel}</Button>
      </div>
    </section>
  );
}
