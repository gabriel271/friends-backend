import {Socket} from "socket.io";
import Room from "../entities/room";
import User from '../entities/user';
import crypto from 'crypto';

class RoomEventsIO {
    listRooms(list: Room[], socket: Socket) {
        socket.emit('listrooms', list);
    }

    getRooms(rooms: Room[], socket: Socket) {
        socket.on('getrooms', () => this.listRooms(rooms, socket));
    }

    joinRoom(rooms: Room[], user: User) {
        user.socket.on('joinroom', (data) => {
            user.room = data.room;
            rooms.forEach((room) => {
                if(room.id === data.room) room.addUser(user);
            });
        });
    }

    leftRoom(rooms: Room[], socket: Socket) {
        socket.on('leftroom', (data) => {
            rooms.forEach((room) => {
                if(room.id === data.room) room.removeUser(socket.id);
            });
            rooms = rooms.filter((room) => 0 !== room.participants.length);
            console.log(rooms.length);
        });
    }

    createRoom(rooms: Room[], socket: Socket, users: User[]) {
        socket.on('createroom', (data) => {
            const id = crypto.randomBytes(5).toString('hex');
            const room = new Room(data.name, id, Math.abs(Number(data.max)));
            rooms.push(room);
            users.forEach((user) => {
                this.listRooms(rooms, socket);
            });
            console.log(rooms.length, 'salas criadas');
        });
    }

    deleteRoom(rooms: Room[], roomId: string) {
        rooms = rooms.filter(({ id }) => id !== roomId);
    }
}

export default new RoomEventsIO;
