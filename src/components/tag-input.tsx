import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export interface TagInputProps {
  label: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagInput({ label, tags, onTagsChange }: TagInputProps) {
  const [value, setValue] = useState("");

  function addTag() {
    const next = value.trim();
    if (!next || tags.includes(next)) return;
    onTagsChange([...tags, next]);
    setValue("");
  }

  return (
    <div className="gui-tag-input">
      <label>{label}</label>
      <div className="gui-tag-list">
        {tags.map((tag) => (
          <button key={tag} type="button" onClick={() => onTagsChange(tags.filter((item) => item !== tag))}>
            {tag}
            <span aria-hidden="true">x</span>
          </button>
        ))}
      </div>
      <div>
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
        />
        <Button onClick={addTag}>Add</Button>
      </div>
    </div>
  );
}
