import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('connected');
  });
  socket.on('SEND_NAMES_TO_CLIENTS', names =>
    dispatch({ type: 'PUT_ALL_NAMES_TO_REDUCER', names })
  );

  socket.on('MEESAGE_FROM_SERVER', (message, username, fromMe) => dispatch({ type: 'MEESAGE_FROM_SERVER', message, username, fromMe }));
  return socket;
};


export const sendNameToServer = name =>
  socket.emit('SEND_NAME_TO_SERVER', name);

export const  sendMessageToServer = (message, username, fromMe) =>
  socket.emit('SEND_MESSAGE_CLIENT', message, username, fromMe);


export default configureSocket;
