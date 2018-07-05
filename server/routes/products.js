import express from 'express';

import { productsController } from '../controllers';

import reviews from './reviews';

const products = express.Router();

products.use('/:id/reviews', reviews);

products.get('/:id', productsController.retrieve);
products.get('/', productsController.list);

products.post('/', productsController.create);

export default products;