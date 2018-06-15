import express from 'express';
import all from './all';

const reviews = express.Router({ mergeParams: true });

reviews.get('/', all);

export default reviews;