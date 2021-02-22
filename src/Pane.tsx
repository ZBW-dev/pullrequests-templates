import { h, JSX, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import snarkdown from 'snarkdown';

import './Pane.css';

interface PaneProps {
  content: string;
  canRemove: boolean;
  onEdit: (nextContent: string) => void;
  onRemove: () => void;
}

export function Pane({ content, onEdit, onRemove, canRemove }: PaneProps) {
  const [isEditor, setIsEditor] = useState(true);

  const toggleEditor = () => setIsEditor(!isEditor);
  const handleCopy = () => navigator.clipboard.writeText(content);

  return (
    <div className="Pane">
      {isEditor ? (
        <Fragment>
          <button
            className="Button Button-float-top-right Button-white"
            onClick={handleCopy}
          >
            copy
          </button>
          <textarea
            className="Pane-textarea"
            onChange={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
              onEdit(e.currentTarget.value)
            }
            value={content}
          />
        </Fragment>
      ) : (
        <div
          className="Pane-preview"
          dangerouslySetInnerHTML={{ __html: snarkdown(content) }}
        />
      )}
      <div className="Pane-actions">
        {canRemove && (
          <button
            className="Button Button-danger"
            type="button"
            onClick={onRemove}
          >
            remove
          </button>
        )}

        <button className="Button Pane-float-right-button" type="button" onClick={toggleEditor}>
          switch to {isEditor ? 'preview' : 'editor'}
        </button>
      </div>
    </div>
  );
}
