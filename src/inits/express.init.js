import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';

import indexRouter from '../routes';
import { ServerConfig } from '../../configs/index';
// Config express
var app = express();
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Config passport
require('./passport.init');

//Config public folder
app.use(express.static(path.join(__dirname, 'publics')));

//Config router
app.use('/api', indexRouter);

const initExpress = async () => {
  const server = http.createServer(app);
  server.listen(ServerConfig.PORT, (error) => {
    if (error) console.log(error)
    console.log(`[API RUNNING]: http://${ServerConfig.IP}:${ServerConfig.PORT}/${ServerConfig.URLAPI}`);
  });
};

export default initExpress;
