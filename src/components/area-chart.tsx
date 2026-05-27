import type { LineChartPoint } from "./line-chart";

export interface AreaChartProps {
  label: string;
  points: LineChartPoint[];
  min?: number;
  max?: number;
}

function resolveRange(values: number[], min?: number, max?: number) {
  const resolvedMin = min ?? Math.min(0, ...values);
  const resolvedMax = max ?? Math.max(1, ...values);
  return resolvedMax === resolvedMin
    ? { min: resolvedMin, max: resolvedMin + 1 }
    : { min: resolvedMin, max: resolvedMax };
}

function buildPaths(points: LineChartPoint[], min: number, max: number) {
  if (points.length === 1) {
    const y = 100 - ((points[0].value - min) / (max - min)) * 100;
    return {
      line: `M 0 ${y} L 100 ${y}`,
      area: `M 0 100 L 0 ${y} L 100 ${y} L 100 100 Z`
    };
  }

  const line = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - ((point.value - min) / (max - min)) * 100;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return { line, area: `${line} L 100 100 L 0 100 Z` };
}

export function AreaChart({ label, points, min, max }: AreaChartProps) {
  const values = points.map((point) => point.value);
  const range = resolveRange(values, min, max);
  const paths = buildPaths(points, range.min, range.max);

  return (
    <figure className="gui-area-chart" aria-label={label}>
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 100 100" role="img" aria-label={`${label} area`}>
        <path className="gui-chart-grid" d="M 0 25 H 100 M 0 50 H 100 M 0 75 H 100" />
        <path className="gui-chart-area" d={paths.area} />
        <path className="gui-chart-line" d={paths.line} />
      </svg>
      <dl>
        {points.map((point) => (
          <div key={point.label}>
            <dt>{point.label}</dt>
            <dd>{point.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
