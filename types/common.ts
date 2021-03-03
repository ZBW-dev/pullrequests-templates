import type { JSX } from 'preact';

export type Template = string;

export interface Option {
  label: string;
  value: Template;
}

export type ChangeEvent<TElement extends HTMLElement> = JSX.TargetedEvent<
  TElement,
  Event
>;
