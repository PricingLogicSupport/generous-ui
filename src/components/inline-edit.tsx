import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export interface InlineEditProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function InlineEdit({ label, value, onValueChange }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (!editing) {
    return (
      <div className="gui-inline-edit">
        <span>
          <strong>{label}</strong>
          <span>{value}</span>
        </span>
        <Button onClick={() => setEditing(true)}>Change</Button>
      </div>
    );
  }

  return (
    <div className="gui-inline-edit" data-editing="true">
      <label>
        <span>{label}</span>
        <Input value={draft} onChange={(event) => setDraft(event.currentTarget.value)} />
      </label>
      <div>
        <Button
          onClick={() => {
            setDraft(value);
            setEditing(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onValueChange(draft);
            setEditing(false);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
