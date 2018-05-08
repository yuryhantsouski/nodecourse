import path from 'path';

import config from './config';
import { Product, User } from './models';

import DirWatcher from './dirwatcher';
import Importer from './importer';

const dirWatcher = new DirWatcher();
const importer = new Importer();

const delay = config.watcherDelay;

dirWatcher.on('dirwatcher:changed', async path => {
  const json = await importer.import(path);
  console.log(`${path} has been changed`);
  console.log(json);
});

dirWatcher.on('dirwatcher:changed', path => {
  console.log(`Sync ${path} has been changed`);
  console.log(importer.importSync(path));
});

dirWatcher.on('dirwatcher:deleted', path => {
  console.log(`${path} has been deleted`);
});

dirWatcher.watch(path.join(__dirname, '/data'), delay);