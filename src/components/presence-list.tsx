import type { ReactNode } from "react";
import { Avatar } from "./avatar";
import { cn } from "../lib/cn";

export interface PresencePerson {
  id: string;
  name: string;
  detail?: ReactNode;
}

export interface PresenceListProps {
  label: string;
  people: PresencePerson[];
  className?: string;
}

export function PresenceList({ label, people, className }: PresenceListProps) {
  return (
    <section className={cn("gui-presence-list", className)} aria-label={label}>
      <strong>{label}</strong>
      <div>
        {people.map((person) => (
          <span key={person.id} className="gui-presence-person">
            <Avatar name={person.name} size="sm" />
            <span>
              <b>{person.name}</b>
              {person.detail ? <small>{person.detail}</small> : null}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
