import { h, JSX } from 'preact';

import type { ChangeEvent, Option } from '../../../types/common';

interface SelectProps
  extends Omit<JSX.HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  onChange: (value: string) => void;
  empty?: string;
  options: Option[];
}

export function Select({
  value,
  onChange,
  options,
  empty = 'Nothing to select',
  ...rest
}: SelectProps): JSX.Element {
  return (
    <select
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.currentTarget.value);
      }}
      {...rest}
    >
      {options.length === 0 && <option value="">{empty}</option>}
      {options.map(({ value, label }, i) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
}
