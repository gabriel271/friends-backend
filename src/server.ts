import express from 'express';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';
import userEventsIO from './events/userEventsIO';
import Room from './entities/room';
import roomEventsIO from './events/roomEventsIO';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new socketIO.Server(server, {cors: {origin: '*'}});
const users: Socket[] = [];
const rooms: Room[] = [];

io.on('connection', (socket: Socket) => {
    userEventsIO.login(socket, users, rooms);
    roomEventsIO.createRoom(rooms, socket);
});
server.listen(PORT as number, HOST, () => console.log(`server running: http://${HOST}:${PORT}`));
