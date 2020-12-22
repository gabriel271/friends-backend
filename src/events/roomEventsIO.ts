import {Socket} from "socket.io";
import Room from "../entities/room";
import User from '../entities/user';
import crypto from 'crypto';

class RoomEventsIO {
    listRooms(list: Room[], socket: Socket) {
        socket.emit('listrooms', JSON.stringify(list));
    }

    joinRoom(rooms: Room[], socket: Socket, users: User[]) {
        socket.on('joinroom', (data) => {
            users.forEach((user) => {
                if(user.id === socket.id) {
                    user.room = data.room;
                    rooms.forEach((room, index) => {
                        if(user.room === room.id) {
                            console.log('TEST')
                            room.participants.push(user);
                        }
                    });
                }
            });
        });
    }

    leftRoom(rooms: Room[], socket: Socket) {
        socket.on('leftroom', (data) => {
            let position = -1;
            rooms.forEach((room, index) => {
                if(room.id === data.room) {
                    room.removeUser(socket.id);
                    if(room.participants.length === 0) {
                        position = index;
                    }
                }
            });
            if(position >= 0) rooms.splice(position, 1);
        });
    }

    createRoom(rooms: Room[], socket: Socket) {
        socket.on('createroom', (data) => {
            const id = crypto.randomBytes(5).toString('hex');
            console.log(id)
            const room = new Room(data.name, id, Math.abs(Number(data.max)));
            rooms.push(room);
            this.listRooms(rooms, socket);
            console.log(rooms.length, 'salas criadas');
        });
    }
}

export default new RoomEventsIO;
