import express from 'express';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';
import userEventsIO from './events/userEventsIO';
import Room from './entities/room';
import roomEventsIO from './events/roomEventsIO';
import User from './entities/user';
import messageEventsIO from './events/messageEventsIO';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new socketIO.Server(server, {cors: {origin: '*'}});
const users: User[] = [];
const rooms: Room[] = [];

io.on('connection', (socket: Socket) => {
    console.log(users.length + 1, 'clientes conectados');
    userEventsIO.login(socket, users);
    roomEventsIO.createRoom(rooms, socket, users);
    roomEventsIO.getRooms(rooms, socket);
    messageEventsIO.sentMesage(socket, users);
});
server.listen(PORT as number, HOST, () => console.log(`server running: http://${HOST}:${PORT}`));
