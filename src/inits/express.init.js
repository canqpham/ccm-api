import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
// import socket from 'socket.io';
// import { StartSocket } from '../socket/index';

import indexRouter from '../routes';
// import mediaRoute from '../routes/media.route';

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
app.use(express.static(path.join(__dirname, '/public')));
app.get("/api/media/", express.static(path.join(__dirname, "/media")));

const server = http.createServer(app);

// const io = socket(server)
//   io.on('connection', function (socket) {
//     console.log('Client connected ', socket.id);
//     socket.on('get_issue', function (data) {
//       console.log('get issue: ', data)
//       socket.emit('message', `Hello ${data}`)
//     });
//   });

// Make io accessible to our router
// app.use(function(req,res,next){
//   req.io = io;
//   next();
// });

//Config router
// app.use('/media', mediaRoute);
app.use('/api', indexRouter);

const initExpress = async () => {
  server.listen(ServerConfig.PORT, (error) => {
    if (error) console.log(error)
    console.log(`[API RUNNING]: http://${ServerConfig.IP}:${ServerConfig.PORT}/${ServerConfig.URLAPI}`);
  });
};

export default initExpress;
