import { h, JSX } from 'preact';

import './Header.css';

interface HeaderProps {
  left: JSX.Element | JSX.Element[];
  right: JSX.Element | JSX.Element[];
}

export function Header({ left, right }: HeaderProps): JSX.Element {
  return (
    <div className="Header">
      <div className="Header-left-side">{left}</div>
      <div className="Header-right-side">{right}</div>
    </div>
  );
}
