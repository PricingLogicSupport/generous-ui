export interface LineChartPoint {
  label: string;
  value: number;
}

export interface LineChartProps {
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

function pointToPath(points: LineChartPoint[], min: number, max: number) {
  if (points.length === 1) {
    const y = 100 - ((points[0].value - min) / (max - min)) * 100;
    return `M 0 ${y} L 100 ${y}`;
  }

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - ((point.value - min) / (max - min)) * 100;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function LineChart({ label, points, min, max }: LineChartProps) {
  const values = points.map((point) => point.value);
  const range = resolveRange(values, min, max);
  const path = pointToPath(points, range.min, range.max);

  return (
    <figure className="gui-line-chart" aria-label={label}>
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 100 100" role="img" aria-label={`${label} line`}>
        <path className="gui-chart-grid" d="M 0 25 H 100 M 0 50 H 100 M 0 75 H 100" />
        <path className="gui-chart-line" d={path} />
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
