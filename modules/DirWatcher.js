import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdirAsync = promisify(fs.readdir);
const readStatAsync = promisify(fs.stat);
const openFileAsync = promisify(fs.open);

export class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.directoryStructure = {};
  }

  watch(directory, delay) {
    setTimeout(() => this.startWatching(directory), delay);
  }

  startWatching(directory) {
    setInterval(async () => {
      try {
        const files = await readdirAsync(directory);
        files.forEach(file => this.recordFile(path.join(directory, file)));
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
    Object.keys(this.directoryStructure).forEach(async file => {
      try {
        await openFileAsync(file, 'r');
      } catch (err) {
        if (err.code === 'ENOENT') {
          // The file has been deleted
          this.emit('dirwatcher:deleted', file);
          delete this.directoryStructure[file];
        }
      }
    });
  }
}