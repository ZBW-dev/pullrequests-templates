import { h, JSX } from 'preact';
import { useMemo } from 'preact/hooks';

import type { Template, Option } from '../../../types/common';
import { Button } from '../Button/Button';
import './Header.css';

interface HeaderProps {
  template: Template;
  options: Option[];
  isEdited: boolean;
  isNew: boolean;
  onAdd: () => void;
  onChange: (template: Template) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function Header({
  template,
  options,
  isEdited,
  isNew,
  onAdd,
  onChange,
  onSave,
  onCancel,
}: HeaderProps) {
  const leftSide = isNew ? (
    <input
      type="name"
      className="Header-input"
      value={template}
      onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
        onChange(e.currentTarget.value as Template)
      }
    />
  ) : (
    <select
      name="template"
      className="Header-select"
      onChange={(e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
        onChange(e.currentTarget.value as Template);
      }}
      value={template}
      disabled={options.length === 0}
    >
      {options.length === 0 && <option value="">No templates</option>}
      {options.map(({ value, label }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
  console.log(isEdited, !isNew && !isEdited)
  const rightSide =
    !isNew && !isEdited ? (
      <Button onClick={onAdd}>+ Add new</Button>
    ) : (
      <div>
        <Button disabled={!isEdited} onClick={onSave}>
          Save
        </Button>
        | <Button onClick={onCancel}>Cancel</Button>
      </div>
    );

  return (
    <div className="Header">
      <div className="Header-left-side">{leftSide}</div>
      <div className="Header-right-side">{rightSide}</div>
    </div>
  );
}
