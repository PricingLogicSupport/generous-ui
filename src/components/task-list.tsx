import type { ReactNode } from "react";

export interface TaskListItem {
  title: string;
  description?: string;
  status: ReactNode;
}

export interface TaskListProps {
  title?: string;
  items: TaskListItem[];
}

export function TaskList({ title, items }: TaskListProps) {
  return (
    <section className="gui-task-list">
      {title ? <h2>{title}</h2> : null}
      <ol>
        {items.map((item) => (
          <li key={item.title}>
            <div>
              <strong>{item.title}</strong>
              {item.description ? <p>{item.description}</p> : null}
            </div>
            <div>{item.status}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
