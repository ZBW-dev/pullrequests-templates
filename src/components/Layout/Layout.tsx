import { h, JSX } from 'preact';

export function Layout({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  return <div className="App">{children}</div>;
}
