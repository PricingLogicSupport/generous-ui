import type { ReactNode } from "react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Select } from "./select";
import { cn } from "../lib/cn";

export interface AccessRoleOption {
  value: string;
  label: string;
}

export interface AccessMember {
  id: string;
  name: string;
  email?: string;
  role: string;
  status?: "active" | "pending" | "owner";
}

export interface AccessListProps {
  title: string;
  description?: ReactNode;
  members: AccessMember[];
  roleOptions: AccessRoleOption[];
  onRoleChange?: (id: string, role: string) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

function statusTone(status?: AccessMember["status"]) {
  if (status === "owner" || status === "active") {
    return "success";
  }
  if (status === "pending") {
    return "warning";
  }
  return "neutral";
}

export function AccessList({
  title,
  description,
  members,
  roleOptions,
  onRoleChange,
  onRemove,
  className
}: AccessListProps) {
  return (
    <section className={cn("gui-access-list", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <div className="gui-access-rows">
        {members.map((member) => (
          <article key={member.id} className="gui-access-row">
            <Avatar name={member.name} />
            <div className="gui-access-copy">
              <strong>{member.name}</strong>
              {member.email ? <span>{member.email}</span> : null}
            </div>
            {member.status ? <Badge tone={statusTone(member.status)}>{member.status}</Badge> : null}
            <Select
              aria-label={`Role for ${member.name}`}
              value={member.role}
              disabled={member.status === "owner" || !onRoleChange}
              onChange={(event) => onRoleChange?.(member.id, event.currentTarget.value)}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {onRemove ? (
              <Button disabled={member.status === "owner"} onClick={() => onRemove(member.id)}>
                Remove
              </Button>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
