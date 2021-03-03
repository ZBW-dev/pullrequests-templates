import { Fragment, h } from 'preact';
import { atom, useAtom } from 'jotai';
import { useLocation } from 'wouter-preact';

import { Button } from '../components/Button/Button';
import { saveTemplate } from '../api/templates';
import { Layout } from '../components/Layout/Layout';
import { Textarea } from '../components/Textarea/Textarea';
import { Header } from '../components/Header/Header';
import { Input } from '../components/Input/Input';

const nameAtom = atom('');
const contentAtom = atom('');

export function Add() {
  const [name, setName] = useAtom(nameAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [, setLocation] = useLocation();

  const handleSave = () => {
    if (!name) {
      return;
    }

    saveTemplate({ name, content }).then(() => {
      handleCancel();
    });
  };

  const handleCancel = () => {
    setLocation('#/');
    setName('');
    setContent('');
  };

  return (
    <Layout>
      <Header
        left={
          <Input
            name="name"
            value={name}
            onChange={setName}
          />
        }
        right={
          <Fragment>
            <Button disabled={!name} onClick={handleSave}>
              Save
            </Button>
            | <Button onClick={handleCancel}>Cancel</Button>
          </Fragment>
        }
      />

      <Textarea onChange={setContent} value={content} />
    </Layout>
  );
}
