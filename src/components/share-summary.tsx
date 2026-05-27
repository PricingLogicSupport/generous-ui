import type { ReactNode } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export interface ShareSummaryProps {
  title: string;
  visibility: string;
  description?: ReactNode;
  linkLabel?: string;
  onCopyLink?: () => void;
  action?: ReactNode;
  className?: string;
}

export function ShareSummary({
  title,
  visibility,
  description,
  linkLabel = "Copy link",
  onCopyLink,
  action,
  className
}: ShareSummaryProps) {
  return (
    <section className={cn("gui-share-summary", className)}>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <Badge tone="accent">{visibility}</Badge>
      <div className="gui-share-actions">
        {onCopyLink ? <Button onClick={onCopyLink}>{linkLabel}</Button> : null}
        {action}
      </div>
    </section>
  );
}
