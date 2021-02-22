import { h, JSX } from 'preact';
import { useMemo } from 'preact/hooks';

import type { Template, Option } from '../types/common';
import './Header.css';

interface HeaderProps {
  template: Template;
  options: Option[];
  isEdited: boolean;
  isNew: boolean;
  onTemplateAdd: () => void;
  onTemplateChange: (template: Template) => void;
  onTemplateSave: () => void;
}

export function Header({
  template,
  options,
  isEdited,
  isNew,
  onTemplateAdd,
  onTemplateChange,
  onTemplateSave,
}: HeaderProps) {

  const leftSide = useMemo(() => {
    return isNew ? (
      <input
        type="name"
        className="Header-input"
        value={template}
        onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
          onTemplateChange(e.currentTarget.value as Template)
        }
      />
    ) : (
      <select
        name="template"
        className="Header-select"
        onChange={(e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
          const value = e.currentTarget.value as Template;
          onTemplateChange(value);
        }}
        value={template}
      >
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    );
  }, [isNew, options, template]);

  const rightSide = useMemo(() => {
    if (isEdited) {
      return (
        <button className="Button" type="button" onClick={onTemplateSave}>
          Save
        </button>
      );
    }

    return !isNew ? (
      <button className="Button" type="button" onClick={onTemplateAdd}>
        + Add new
      </button>
    ) : null;
  }, [isNew, isEdited]);

  return (
    <div className="Header">
      <div className="Header-left-side">{leftSide}</div>
      <div className="Header-right-side">{rightSide}</div>
    </div>
  );
}