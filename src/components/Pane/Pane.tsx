import { h, JSX, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import snarkdown from 'snarkdown';

import { Button } from '../Button/Button';
import { Textarea } from '../Textarea/Textarea';

import './Pane.css';

interface PaneProps {
  content: string;
  canRemove: boolean;
  canEdit: boolean;
  onEdit: (nextContent: string) => void;
  onRemove: () => void;
}

export function Pane({
  content,
  onEdit,
  onRemove,
  canRemove,
  canEdit,
}: PaneProps) {
  const [isEditor, setIsEditor] = useState(true);

  const toggleEditor = () => setIsEditor(!isEditor);
  const handleCopy = () => navigator.clipboard.writeText(content);

  return (
    <div className="Pane">
      {isEditor ? (
        <Fragment>
          {canEdit && (
            <Button
              className="Pane-float-top-right-button Pane-copy-button"
              onClick={handleCopy}
            >
              copy
            </Button>
          )}
          <Textarea onChange={onEdit} value={content} disabled={!canEdit} />
        </Fragment>
      ) : (
        <div
          className="Pane-preview"
          dangerouslySetInnerHTML={{ __html: snarkdown(content) }}
        />
      )}
      <div className="Pane-actions">
        {canRemove && (
          <Button className="Button-danger" onClick={onRemove}>
            remove
          </Button>
        )}

        <Button
          className="Pane-float-right-button"
          type="button"
          onClick={toggleEditor}
          disabled={!canEdit}
        >
          switch to {isEditor ? 'preview' : 'editor'}
        </Button>
      </div>
    </div>
  );
}
