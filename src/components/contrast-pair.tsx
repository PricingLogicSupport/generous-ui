import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export interface ContrastPairProps {
  label: string;
  foreground: string;
  background: string;
  ratio: string;
  passes: boolean;
  sample?: ReactNode;
  className?: string;
}

export function ContrastPair({
  label,
  foreground,
  background,
  ratio,
  passes,
  sample = "Readable text",
  className
}: ContrastPairProps) {
  return (
    <section className={cn("gui-contrast-pair", className)}>
      <div>
        <h2>{label}</h2>
        <Badge tone={passes ? "success" : "danger"}>{passes ? "Pass" : "Fail"}</Badge>
      </div>
      <div
        className="gui-contrast-sample"
        style={{ color: foreground, backgroundColor: background }}
      >
        {sample}
      </div>
      <dl>
        <div>
          <dt>Foreground</dt>
          <dd>{foreground}</dd>
        </div>
        <div>
          <dt>Background</dt>
          <dd>{background}</dd>
        </div>
        <div>
          <dt>Ratio</dt>
          <dd>{ratio}</dd>
        </div>
      </dl>
    </section>
  );
}
