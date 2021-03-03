import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { atom, useAtom } from 'jotai';

import { getTemplates, removeTemplate, saveTemplate } from '../api/templates';
import { Button } from '../components/Button/Button';
import { Pane } from '../components/Pane/Pane';
import { Layout } from '../components/Layout/Layout';
import { Header } from '../components/Header/Header';
import { Select } from '../components/Select/Select';

const selectedTemplateAtom = atom('');
const templatesAtom = atom<Templates>({});
const isEditedAtom = atom(false);
const nextContentAtom = atom('');
const selectedAtom = atom<string, string>(
  (get) => {
    const selectedTemplate = get(selectedTemplateAtom);

    if (selectedTemplate) {
      return selectedTemplate;
    }

    const templates = get(templatesAtom) || {};

    return Object.keys(templates)[0];
  },
  (_get, set, value) => {
    set(nextContentAtom, '');
    set(isEditedAtom, false);

    return set(selectedTemplateAtom, value);
  },
);

type Templates = { [key: string]: string };

const createOptions = (templates: Templates) => {
  if (!templates) {
    return [];
  }

  return Object.keys(templates).map((key) => ({ label: key, value: key }));
};

export function Index() {
  const [selected, setSelected] = useAtom(selectedAtom);
  const [templates, setTemplates] = useAtom(templatesAtom);
  const [isEdited, setIsEdited] = useAtom(isEditedAtom);
  const [nextContent, setNextContent] = useAtom(nextContentAtom);
  const options = createOptions(templates);
  const hasEmptyTemplates = options.length === 0;

  const handleEdit = (content: string) => {
    if (content !== templates[selected]) {
      setIsEdited(true);
      setNextContent(content);
    } else {
      handleCancel();
    }
  };
  const handleSave = () => {
    saveTemplate({ name: selected, content: nextContent })
      .then(getTemplates)
      .then((templates) => {
        setTemplates(templates);
        setIsEdited(false);
        setNextContent('');
      });
  };
  const handleRemove = () => {
    removeTemplate({ name: selected })
      .then(getTemplates)
      .then((templates) => {
        const currentIndex = options.findIndex(
          (option) => option.value === selected,
        );

        const nextIndex =
          currentIndex > 0 ? currentIndex - 1 : currentIndex + 1;

        setTemplates(templates);
        setSelected(options[nextIndex].value);
      });
  };

  const handleCancel = () => {
    setSelected(selected);
  };

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  return (
    <Layout>
      <Header
        left={
          <Select
            disabled={hasEmptyTemplates}
            onChange={setSelected}
            options={options}
            empty="No templates"
          />
        }
        right={
          isEdited ? (
            <Fragment>
              <Button onClick={handleSave}>Save</Button> |{' '}
              <Button onClick={handleCancel}>Cancel</Button>
            </Fragment>
          ) : (
            <Fragment>
              <a href="#/add">+ Add new</a> | <a href="#/import">Import</a>
            </Fragment>
          )
        }
      />

      <Pane
        content={nextContent || templates[selected]}
        onEdit={handleEdit}
        canEdit={!hasEmptyTemplates}
        canRemove={options.length > 1}
        onRemove={handleRemove}
      />
    </Layout>
  );
}
