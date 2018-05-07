import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readdirAsync = util.promisify(fs.readdir);
const readStatAsync = util.promisify(fs.stat);

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.root = '';
    this.directoryStructure = {};
  }

  watch(directory, delay) {
    this.root = directory;
    setTimeout(() => this.startWatching(), delay);
  }

  startWatching() {
    setInterval(async () => {
      try {
        const files = await readdirAsync(this.root);
        files.forEach(file => this.recordFile(path.join(this.root, file)));
      } catch (err) {
        console.err(err);
      }

      this.detectFileDelete();
    }, 500);
  }

  async recordFile(filePath) {
    const { ctimeMs: lastModification } = await readStatAsync(filePath);
    
    if (!this.directoryStructure[filePath]) {
      this.directoryStructure[filePath] = lastModification;
      // New file has been added
      this.emit('dirwatcher:changed', filePath);
    } else if (this.directoryStructure[filePath] !== lastModification) {
      this.directoryStructure[filePath] = lastModification;
      // The file has been changed
      this.emit('dirwatcher:changed', filePath);
    }
  }

  detectFileDelete() {
    Object.keys(this.directoryStructure).forEach(file => {
      fs.open(file, 'r', (err, fd) => {
        if (err) {
          if (err.code === 'ENOENT') {
            // The file has been deleted
            this.emit('dirwatcher:deleted', file);
            delete this.directoryStructure[file];
          }
        }
      });
    });
  }
}