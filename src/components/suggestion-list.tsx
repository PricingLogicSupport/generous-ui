import type { ReactNode } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface SuggestionItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  confidence?: "low" | "medium" | "high";
}

export interface SuggestionListProps {
  title: string;
  description?: ReactNode;
  suggestions: SuggestionItem[];
  onAccept: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

const confidenceTone = {
  low: "danger",
  medium: "warning",
  high: "success"
} as const;

export function SuggestionList({
  title,
  description,
  suggestions,
  onAccept,
  onDismiss,
  className
}: SuggestionListProps) {
  return (
    <section className={cn("gui-suggestion-list", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <div className="gui-suggestion-rows">
        {suggestions.map((suggestion) => (
          <article key={suggestion.id} className="gui-suggestion-row">
            <div>
              <h3>{suggestion.title}</h3>
              {suggestion.description ? <p>{suggestion.description}</p> : null}
            </div>
            {suggestion.confidence ? (
              <Badge tone={confidenceTone[suggestion.confidence]}>{suggestion.confidence} confidence</Badge>
            ) : null}
            <div className="gui-suggestion-actions">
              <Button onClick={() => onAccept(suggestion.id)}>Accept suggestion</Button>
              {onDismiss ? <Button onClick={() => onDismiss(suggestion.id)}>Dismiss</Button> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
