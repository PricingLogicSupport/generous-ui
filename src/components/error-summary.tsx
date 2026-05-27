export interface ErrorSummaryItem {
  fieldId?: string;
  message: string;
}

export interface ErrorSummaryProps {
  title?: string;
  items: ErrorSummaryItem[];
}

export function ErrorSummary({ title = "There is a problem", items }: ErrorSummaryProps) {
  if (!items.length) return null;

  return (
    <section className="gui-error-summary" role="alert" tabIndex={-1}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={`${item.fieldId ?? "error"}-${item.message}`}>
            {item.fieldId ? <a href={`#${item.fieldId}`}>{item.message}</a> : item.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
