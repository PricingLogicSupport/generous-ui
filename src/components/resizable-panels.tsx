import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ResizablePanelsProps {
  start: ReactNode;
  end: ReactNode;
  startLabel?: string;
  endLabel?: string;
  resizeLabel?: string;
  defaultStartSize?: number;
  minStartSize?: number;
  maxStartSize?: number;
  onResize?: (startSize: number) => void;
  className?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ResizablePanels({
  start,
  end,
  startLabel = "Start panel",
  endLabel = "End panel",
  resizeLabel = "Resize panels",
  defaultStartSize = 62,
  minStartSize = 30,
  maxStartSize = 78,
  onResize,
  className
}: ResizablePanelsProps) {
  const [startSize, setStartSize] = useState(clamp(defaultStartSize, minStartSize, maxStartSize));
  const rootRef = useRef<HTMLDivElement>(null);

  function setSize(nextSize: number) {
    const clampedSize = clamp(Math.round(nextSize), minStartSize, maxStartSize);
    setStartSize(clampedSize);
    onResize?.(clampedSize);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const panelRoot = rootRef.current;
    if (!panelRoot) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = panelRoot.getBoundingClientRect();
    const raw = ((event.clientX - rect.left) / rect.width) * 100;
    const direction = getComputedStyle(panelRoot).direction;
    setSize(direction === "rtl" ? 100 - raw : raw);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const raw = ((event.clientX - rect.left) / rect.width) * 100;
    const direction = getComputedStyle(root).direction;
    setSize(direction === "rtl" ? 100 - raw : raw);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setSize(startSize - 5);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setSize(startSize + 5);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setSize(minStartSize);
    }
    if (event.key === "End") {
      event.preventDefault();
      setSize(maxStartSize);
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("gui-resizable-panels", className)}
      style={{ "--gui-resizable-start": `${startSize}%` } as CSSProperties}
    >
      <section aria-label={startLabel} className="gui-resizable-panel">
        {start}
      </section>
      <div
        role="separator"
        aria-label={resizeLabel}
        aria-orientation="vertical"
        aria-valuemin={minStartSize}
        aria-valuemax={maxStartSize}
        aria-valuenow={startSize}
        className="gui-resizable-handle"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <span aria-hidden="true" />
      </div>
      <section aria-label={endLabel} className="gui-resizable-panel">
        {end}
      </section>
    </div>
  );
}
