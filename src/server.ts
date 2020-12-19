import express from 'express';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import userEventIO from './events/userEvents'
import Room from './entities/room';
import cors from 'cors';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new socketIO.Server(server, {cors: {origin: '*'}});
const users: Socket[] = [];
const rooms: Room[] = [];

io.on('connection', (socket: Socket) => {
    userEventIO.login(users, socket);
});
server.listen(PORT as number, HOST, () => console.log(`server running: http://${HOST}:${PORT}`));
