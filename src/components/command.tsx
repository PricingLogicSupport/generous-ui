import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Input } from "./input";

export interface CommandItem {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  onSelect: () => void;
}

export interface CommandProps {
  label: string;
  placeholder?: string;
  items: CommandItem[];
  emptyMessage?: string;
}

export function Command({ label, placeholder = "Search", items, emptyMessage = "No matching actions." }: CommandProps) {
  const [query, setQuery] = useState("");
  const id = useId();
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [item.label, item.description, item.value].filter(Boolean).join(" ").toLowerCase().includes(normalized)
    );
  }, [items, query]);

  return (
    <div className="gui-command">
      <label className="gui-sr-only" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        value={query}
        placeholder={placeholder}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <div className="gui-command-list" role="listbox" aria-label={label}>
        {filtered.length ? (
          filtered.map((item) => (
            <button key={item.value} type="button" role="option" onClick={item.onSelect}>
              {item.icon ? <span className="gui-command-icon">{item.icon}</span> : null}
              <span>
                <strong>{item.label}</strong>
                {item.description ? <small>{item.description}</small> : null}
              </span>
            </button>
          ))
        ) : (
          <p>{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
