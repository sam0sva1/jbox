import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';
import subsRoute from './routes/subscriber';
import memberRoute from './routes/member';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.static('./src'));

app.listen(config.port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s.", config.port);
  }
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/member', memberRoute);
app.use('/subscriber', subsRoute);

app.use(errorHandler);