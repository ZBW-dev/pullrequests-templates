import { h, JSX } from 'preact';

import './Button.css';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

export function Button({
  children,
  type = 'button',
  ...props
}: ButtonProps): JSX.Element {
  const _className = `Button ${props.className}`;

  return (
    <button {...props} type={type} className={_className}>
      {children}
    </button>
  );
}
