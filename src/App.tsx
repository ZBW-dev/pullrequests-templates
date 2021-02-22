import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import type { Template, Option } from '../types/common';
import { Header } from './Header';
import { Pane } from './Pane';

import './App.css';
import './Button.css';

const getTemplates = async () => {
  const { templates } = await new Promise((r) =>
    chrome.storage.local.get(['templates'], r),
  );

  if (!templates) {
    return {};
  }

  return templates;
};

const saveTemplate = async ({
  name,
  content,
}: {
  name: string;
  content: string;
}) => {
  const templates = await getTemplates();

  templates[String(name)] = content;

  chrome.storage.local.set({ templates });
};

const removeTemplate = async ({ name }: { name: string }) => {
  const templates = await getTemplates();

  if (templates[name]) {
    delete templates[name];
  }

  chrome.storage.local.set({ templates });
};

function App() {
  const [templates, setTemplates] = useState<{ [key: string]: string }>({});
  const [options, setOptions] = useState<Option[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [template, setTemplate] = useState('');
  const [content, setContent] = useState(() => templates[template]);

  const handleTemplateAdd = () => {
    setIsNew(true);
    setContent('');
    setTemplate('');
  };

  const handleTemplateRemove = () => {
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

  const handleTemplateChange = (template: Template) => {
    setTemplate(template);
    setContent(templates[template] || '');

    if (templates[template] && content !== templates[template]) {
      setIsEdited(false);
    }
  };

  const handleTemplateEdit = (nextContent: string) => {
    setIsEdited(true);
    setContent(nextContent);
  };

  const fetchTemplates = () => {
    return getTemplates().then((templates) => {
      const options: Option[] = Object.keys(templates).map((template) => ({
        label: template,
        value: template,
      }));

      setOptions(options);
      setTemplates(templates);

      return templates;
    });
  };

  const handleTemplateSave = () => {
    saveTemplate({ name: template, content }).then(() => {
      fetchTemplates().then(() => {
        setTemplate(template);
        setContent(content);
        setIsEdited(false);
        setIsNew(false);
      });
    });
  };

  useEffect(() => {
    fetchTemplates().then((templates) => {
      const template = Object.keys(templates)[0];

      setTemplate(template);
      setContent(templates[template]);
    });
  }, []);

  return (
    <div className="App">
      <Header
        template={template}
        isNew={isNew}
        isEdited={isEdited}
        options={options}
        onTemplateAdd={handleTemplateAdd}
        onTemplateChange={handleTemplateChange}
        onTemplateSave={handleTemplateSave}
      />

      <Pane
        content={content}
        onEdit={handleTemplateEdit}
        canRemove={!isNew && options.length > 1}
        onRemove={handleTemplateRemove}
      />
    </div>
  );
}

export default App;
