import { h, JSX } from 'preact';

type ChangeEvent<TElement extends HTMLElement> = JSX.TargetedEvent<
  TElement,
  Event
>;

interface TextareaProps
  extends Omit<JSX.HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onChange: (value: string) => void;
}

export function Textarea({
  onChange,
  value,
  ...rest
}: TextareaProps): JSX.Element {
  return (
    <textarea
      className="Pane-textarea"
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        onChange(e.currentTarget.value)
      }
      value={value}
      {...rest}
    />
  );
}
