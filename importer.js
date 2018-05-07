import csvjson from 'csvjson';
import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);

export default class Importer {
  async import(path) {
    let data, json;
    try {
      data = await readFileAsync(path, { encoding: 'utf8' });
      json = csvjson.toObject(data);
    } catch (err) {
      console.err(err);
    }
    return Promise.resolve(json);
  }

  importSync(path) {
    let data, json;
    try {
      data = fs.readFileSync(path, { encoding: 'utf8' });
      json = csvjson.toObject(data);
    } catch (err) {
      console.err(err);
    }
    return json;
  }
}