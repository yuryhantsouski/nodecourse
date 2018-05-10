import path from 'path';

import config from './config';
import { Product, User } from './models';
import { DirWatcher, Importer } from './modules';

const dirWatcher = new DirWatcher();
const importer = new Importer();

const delay = config.watcherDelay;

dirWatcher.on('dirwatcher:changed', async path => {
  const json = await importer.import(path);
  console.log(`Async ${path} has been changed`);
  console.log(json);
});

dirWatcher.on('dirwatcher:changed', path => {
  const json = importer.importSync(path);
  console.log(`Sync ${path} has been changed`);
  console.log(json);
});

dirWatcher.on('dirwatcher:deleted', path => {
  console.log(`${path} has been deleted`);
});

dirWatcher.watch(path.join(__dirname, '/data'), delay);