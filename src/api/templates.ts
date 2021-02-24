import { browser } from 'webextension-polyfill-ts';

type Templates = { [key: string]: string };

export const getTemplates = async (): Promise<Templates> => {
  const { templates } = await browser.storage.local.get(['templates']);

  if (!templates) {
    return {}
  }

  return templates;
};

export const saveTemplate = async ({
  name,
  content,
}: {
  name: string;
  content: string;
}): Promise<Templates> => {
  const templates = await getTemplates();

  templates[String(name)] = content;

  await browser.storage.local.set({ templates });

  return templates;
};

export const removeTemplate = async ({
  name,
}: {
  name: string;
}): Promise<void> => {
  const templates = await getTemplates();

  if (templates[name]) {
    delete templates[name];
  }

  return browser.storage.local.set({ templates });
};
