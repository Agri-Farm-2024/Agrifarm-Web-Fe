import io from 'socket.io-client';
// import {API_SOCKET} from '@env';
const API_SOCKET = 'https://api.agrifarm.site/';

const socket = io(API_SOCKET);

export default socket;
