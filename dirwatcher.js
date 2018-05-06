import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

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
    setInterval(() => {
      fs.readdir(this.root, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
          process.nextTick(() => this.recordFile(path.join(this.root, file)));
        });
      });

      this.detectFileDelete();
    }, 500);
  }

  recordFile(filePath) {
    const lastModification = fs.statSync(filePath).ctimeMs;
    
    if (!this.directoryStructure[filePath]) {
      this.directoryStructure[filePath] = lastModification;
      // New file has been added
      this.emit('changed', filePath);
    } else if (this.directoryStructure[filePath] !== lastModification) {
      this.directoryStructure[filePath] = lastModification;
      // The file has been changed
      this.emit('changed', filePath);
    }
  }

  detectFileDelete() {
    Object.keys(this.directoryStructure).forEach(file => {
      fs.open(file, 'r', (err, fd) => {
        if (err) {
          if (err.code === 'ENOENT') {
            // The file has been deleted
            this.emit('deleted', file);
            delete this.directoryStructure[file];
          }
        }
      });
    });
  }
}