import type { ReactNode } from "react";

export interface BarChartItem {
  label: string;
  value: number;
  meta?: ReactNode;
}

export interface BarChartProps {
  label: string;
  items: BarChartItem[];
  max?: number;
}

export function BarChart({ label, items, max }: BarChartProps) {
  const resolvedMax = max ?? Math.max(1, ...items.map((item) => item.value));

  return (
    <figure className="gui-bar-chart" aria-label={label}>
      <figcaption>{label}</figcaption>
      <div>
        {items.map((item) => {
          const percent = Math.min(100, Math.max(0, (item.value / resolvedMax) * 100));
          return (
            <div className="gui-bar-row" key={item.label}>
              <span>{item.label}</span>
              <div className="gui-bar-track" aria-hidden="true">
                <span style={{ width: `${percent}%` }} />
              </div>
              <strong>{item.value}</strong>
              {item.meta ? <small>{item.meta}</small> : null}
            </div>
          );
        })}
      </div>
    </figure>
  );
}
