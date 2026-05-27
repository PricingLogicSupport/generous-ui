import type { ReactNode } from "react";

export interface LoadingRegionProps {
  loading: boolean;
  label: string;
  skeleton: ReactNode;
  children: ReactNode;
}

export function LoadingRegion({ loading, label, skeleton, children }: LoadingRegionProps) {
  return (
    <section className="gui-loading-region" aria-busy={loading} aria-label={label}>
      {loading ? skeleton : children}
    </section>
  );
}
