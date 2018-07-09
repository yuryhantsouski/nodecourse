import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import routes from './server/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

export default app;
