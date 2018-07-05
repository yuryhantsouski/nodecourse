import express from 'express';

import { reviewsController } from '../controllers';

const reviews = express.Router({ mergeParams: true });

reviews.get('/', reviewsController.list);

reviews.post('/', reviewsController.create);

export default reviews;