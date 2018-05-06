import path from 'path';

import config from './config';
import { Product, User } from './models';

import DirWatcher from './dirwatcher';
import Importer from './importer';

const dirWatcher = new DirWatcher();
const importer = new Importer();

const delay = 3000;

dirWatcher.on('changed', path => {
  importer
    .import(path)
    .then(console.log)
    .catch(console.err);
});
dirWatcher.watch(path.join(__dirname, '/data'), delay);