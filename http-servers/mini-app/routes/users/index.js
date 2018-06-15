import express from 'express';
import all from './all';

const users = express.Router();

users.get('/', all);

export default users;