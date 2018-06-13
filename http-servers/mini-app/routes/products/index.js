import express from 'express';
import all from './all';
import single from './single';
import reviews from './reviews';
import findObject from '../../helpers/findObject';
import addProduct from './addProduct';

const products = express.Router();

products.param('id', findObject('product'));

products.use('/:id/reviews', reviews);

products.get('/:id', single);
products.get('/', all);

products.post('/', addProduct);

export default products;