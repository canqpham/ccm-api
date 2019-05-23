import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import multer from 'multer';
// const upload = multer();
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

const cleanFileName = fileName => {
  let ext = fileName.split(".").pop();
  let name = fileName.substr(0, fileName.lastIndexOf("." + ext));
  name = name.replace(/[^a-zA-Z0-9\-]/g, "");
  return [name, ext].join(".");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, 'media');
  },
  filename: (req, file, cb) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    const newFilename = cleanFileName(file.originalname);
    cb(null, newFilename);
  },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

app.use(upload.single('file'))
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
