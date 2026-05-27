import type { ReactNode } from "react";

export interface ResultItem {
  title: string;
  description?: string;
  meta?: ReactNode;
  action?: ReactNode;
}

export interface ResultListProps {
  label: string;
  results: ResultItem[];
}

export function ResultList({ label, results }: ResultListProps) {
  return (
    <section className="gui-result-list" aria-label={label}>
      {results.map((result) => (
        <article key={result.title}>
          <div>
            <h2>{result.title}</h2>
            {result.description ? <p>{result.description}</p> : null}
            {result.meta ? <div className="gui-result-meta">{result.meta}</div> : null}
          </div>
          {result.action ? <div className="gui-result-action">{result.action}</div> : null}
        </article>
      ))}
    </section>
  );
}
