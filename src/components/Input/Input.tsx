import { h, JSX } from 'preact';

import type { ChangeEvent } from '../../../types/common';

interface InputProps
  extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

export function Input({ value, onChange, ...rest }: InputProps): JSX.Element {
  return (
    <input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(e.currentTarget.value)
      }
      {...rest}
    />
  );
}
