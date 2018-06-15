import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v1';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export class Products {
  async create({ name, brand, price, options }) {
    try {
      let data = await readFileAsync(path.join(__dirname, '../data/index.json'));
          data = JSON.parse(data.toString());

      const products = [...data.products, { id: uuid(), name, brand, price, options }];
      const newData = { ...data, products };

      await writeFileAsync(path.join(__dirname, '../data/index.json'), JSON.stringify(newData));
      return newData.products;
    } catch (e) {
      console.err(e);
    }
  }
}