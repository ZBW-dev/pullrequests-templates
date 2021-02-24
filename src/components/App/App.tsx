import { h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import {
  getTemplates,
  saveTemplate,
  removeTemplate,
} from '../../api/templates';

import type { Template, Option } from '../../../types/common';
import { Header } from '../Header/Header';
import { Pane } from '../Pane/Pane';

import './App.css';

function App() {
  const [templates, setTemplates] = useState<{ [key: string]: string }>({});
  const [options, setOptions] = useState<Option[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [template, setTemplate] = useState('');
  const [content, setContent] = useState(() => templates[template]);
  const templateRef = useRef(null);

  const handleAdd = () => {
    setIsNew(true);
    setContent('');
    setTemplate('');
  };

  const handleRemove = () => {
    const currentIndex = options.findIndex(
      (option) => option.value === template,
    );

    const nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex + 1;

    removeTemplate({ name: template }).then(() => {
      fetchTemplates().then(() => {
        const template = options[nextIndex].value;

        setTemplate(template);
        setContent(templates[template]);
      });
    });
  };

  const handleChange = (template: Template) => {
    setTemplate(template);
    setContent(templates[template] || '');
    setIsEdited(true);

    if (!template) {
      setIsEdited(false);
    }

    if (templates[template] && content !== templates[template]) {
      setIsEdited(false);
    }
  };

  const handleEdit = (nextContent: string) => {
    setIsEdited(true);
    setContent(nextContent);
  };

  const fetchTemplates = useCallback(async () => {
    const templates = await getTemplates();
    const options: Option[] = Object.keys(templates).map((template) => ({
      label: template,
      value: template,
    }));

    setOptions(options);
    setTemplates(templates);

    return templates;
  }, []);

  const handleSave = () => {
    saveTemplate({ name: template, content }).then(() => {
      fetchTemplates().then(() => {
        setTemplate(template);
        setContent(content);
        setIsEdited(false);
        setIsNew(false);
      });
    });
  };

  const handleCancel = () => {
    setIsNew(false);
    setIsEdited(false);

    fetchTemplates().then((templates) => {
      const template = Object.keys(templates)[0];

      setTemplate(template);
      setContent(templates[template]);
    });
  };

  useEffect(() => {
    fetchTemplates().then((templates) => {
      const template = Object.keys(templates)[0];

      setTemplate(template);
      setContent(templates[template]);
    });
  }, []);

  const hasTemplates = options.length > 0;

  return (
    <div className="App">
      <Header
        template={template}
        isNew={isNew}
        isEdited={hasTemplates && isEdited}
        options={options}
        onAdd={handleAdd}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <Pane
        content={content}
        onEdit={handleEdit}
        canEdit={isNew || hasTemplates}
        canRemove={options.length > 1 && !isNew}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default App;
