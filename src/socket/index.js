import socket from 'socket.io';
import Authenticate from '../middlewares/auth.middleware' 
export const StartSocket = server => {
  const io = socket(server)
  io.on('connection', function (socket) {
    console.log('Client connected ', socket.id);
    socket.on('get_issue', function (data) {
      console.log('get issue: ', data)
      socket.emit('message', `Hello ${data}`)
    });
  });
}