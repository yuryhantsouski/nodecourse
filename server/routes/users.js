import express from 'express';

import { usersController } from '../controllers';

const users = express.Router();

users.get('/', usersController.list);

users.post('/', usersController.create);

export default users;