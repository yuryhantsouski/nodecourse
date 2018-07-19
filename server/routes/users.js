import express from 'express';
import User from '../controllers/user';

const users = express.Router();

users.get('/', User.list);
users.post('/', User.post);

export default users;
