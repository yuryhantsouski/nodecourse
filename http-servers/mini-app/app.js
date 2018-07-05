import express from 'express';
import bodyParser from 'body-parser';

import { cookieParser, queryParser } from './middlewares';
import passport from './passport';
import routes from './routes';
import auth from './routes/auth';

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(queryParser);
app.use(cookieParser);

app.use('/auth', auth);
app.use('/api', passport.authenticate('jwt', { session: false }), routes);

export default app;