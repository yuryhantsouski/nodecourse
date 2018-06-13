import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import { cookieParser, queryParser } from './middlewares';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(queryParser);
app.use(cookieParser);

app.use('/api', routes);

export default app;