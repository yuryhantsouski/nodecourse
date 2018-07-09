import express from 'express';
import Product from '../controllers/product';
import reviews from './reviews';

const products = express.Router();

products.use('/:id/reviews', reviews);

products.get('/:id', Product.get);
products.get('/',Product.list);
products.post('/', Product.post);

export default products;
