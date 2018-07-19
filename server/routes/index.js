import express from 'express';
import products from './products';
import users from './users';
import cities from './cities';

const routes = express.Router();

routes.use('/products', products);
routes.use('/users', users);
routes.use('/cities', cities);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected' });
});

export default routes;
