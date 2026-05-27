import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ItemGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

export function ItemGroup({ title, description, children, className, ...props }: ItemGroupProps) {
  return (
    <section className={cn("gui-item-group", className)} {...props}>
      {title || description ? (
        <header>
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="gui-item-group-list">{children}</div>
    </section>
  );
}

export interface ItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  media?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  selected?: boolean;
}

export function Item({
  title,
  description,
  media,
  meta,
  actions,
  selected = false,
  className,
  ...props
}: ItemProps) {
  return (
    <article className={cn("gui-item", className)} data-selected={selected || undefined} {...props}>
      {media ? <div className="gui-item-media">{media}</div> : null}
      <div className="gui-item-content">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {meta ? <div className="gui-item-meta">{meta}</div> : null}
      {actions ? <div className="gui-item-actions">{actions}</div> : null}
    </article>
  );
}
