import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export interface RequirementItem {
  label: ReactNode;
  description?: ReactNode;
  met: boolean;
}

export interface RequirementListProps {
  title: string;
  description?: ReactNode;
  requirements: RequirementItem[];
  className?: string;
}

export function RequirementList({ title, description, requirements, className }: RequirementListProps) {
  return (
    <section className={cn("gui-requirement-list", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <ul>
        {requirements.map((requirement, index) => (
          <li key={index} data-met={requirement.met || undefined}>
            <div>
              <strong>{requirement.label}</strong>
              {requirement.description ? <p>{requirement.description}</p> : null}
            </div>
            <Badge tone={requirement.met ? "success" : "warning"}>{requirement.met ? "Met" : "Needed"}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
