import csvjson from 'csvjson';
import fs from 'fs';

export default class Importer {
  import(path) {
    const parsed = this.parseToJson(path);
    return Promise.resolve(parsed);
  }

  importSync(path) {
    return this.parseToJson(path);
  }

  parseToJson(path) {
    let data, json;
    try {
      data = fs.readFileSync(path, { encoding: 'utf8' });
      json = csvjson.toObject(data);
    } catch(err) {
      console.err(err);
    }
    return json;
  }
}