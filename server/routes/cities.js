import express from 'express';
import City from '../controllers/city';

const cities = express.Router();

cities.get('/:id', City.get);
cities.put('/:id', City.put);
cities.delete('/:id', City.delete);

cities.get('/', City.list);
cities.post('/', City.post);

export default cities;
