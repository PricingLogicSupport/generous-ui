export interface MeterProps {
  label: string;
  value: number;
  max?: number;
  tone?: "neutral" | "success" | "warning" | "danger";
}

export function Meter({ label, value, max = 100, tone = "neutral" }: MeterProps) {
  const safeMax = max > 0 ? max : 100;
  const percent = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div className="gui-meter" data-tone={tone}>
      <div>
        <span>{label}</span>
        <strong>{Math.round(percent)}%</strong>
      </div>
      <meter min={0} max={safeMax} value={value} />
    </div>
  );
}
