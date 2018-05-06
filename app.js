import path from 'path';

import config from './config';
import { Product, User } from './models';

import DirWatcher from './dirwatcher';
import Importer from './importer';

const dirWatcher = new DirWatcher();
const importer = new Importer();

const delay = config.watcherDelay;

dirWatcher.on('dirwatcher:changed', path => {
  importer
    .import(path)
    .then(console.log)
    .catch(console.err);
});
dirWatcher.watch(path.join(__dirname, '/data'), delay);