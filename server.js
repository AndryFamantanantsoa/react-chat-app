const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

server.listen(8000, () => console.log('connected to port 8000!'));

app.use(cors());

let names = [];
let serverNames = [];
io.on('connection', socket => {

  socket.on('SEND_NAME_TO_SERVER', name => {
    
    serverNames = [...serverNames, { socketId: socket.id, name }];
    names = [...names, name];
    socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names);
    socket.emit('SEND_NAMES_TO_CLIENTS', names);
  });


  socket.on('SEND_MESSAGE_CLIENT', (message, username, fromMe) => {
    socket.broadcast.emit('MEESAGE_FROM_SERVER', message, username, fromMe);
  });

  socket.on('disconnect', () => {
    serverNames = serverNames.filter(data => data.socketId !== socket.id);
    names = serverNames.map(data => data.name);
    socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names);
    socket.emit('SEND_NAMES_TO_CLIENTS', names);
  });
});
