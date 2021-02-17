import socketIO, { Socket } from 'socket.io';
import userEventsIO from './events/userEventsIO';
import Room from './entities/room';
import roomEventsIO from './events/roomEventsIO';
import User from './entities/user';
import messageEventsIO from './events/messageEventsIO';

const PORT = process.env.PORT || 8080;
const io = new socketIO.Server(PORT as number, {cors: {origin: '*'}});
const users: User[] = [];
const rooms: Room[] = [];

// Definindo os eventos que estarão sendo abservados
io.on('connection', (socket: Socket) => {
    userEventsIO.login(socket, users);
    userEventsIO.logOff(socket, users, rooms);
    roomEventsIO.createRoom(rooms, socket);
    roomEventsIO.getRooms(rooms, socket);
    roomEventsIO.leftRoom(rooms, socket);
    roomEventsIO.joinRoom(rooms, socket, users);
    messageEventsIO.sentMesage(socket, users, rooms);
});
