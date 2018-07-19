import express from 'express';
import Review from '../controllers/review';

const reviews = express.Router({ mergeParams: true });

reviews.get('/', Review.list);
reviews.post('/', Review.post);

export default reviews;
