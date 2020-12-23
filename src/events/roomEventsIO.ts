import {Socket} from "socket.io";
import Room from "../entities/room";
import User from '../entities/user';
import crypto from 'crypto';

class RoomEventsIO {
    listRooms(rooms: Room[], socket: Socket) {
        socket.emit('listrooms', JSON.stringify(rooms));
    }

    getRooms(rooms: Room[], socket: Socket) {
        socket.on('getrooms', () => {
            this.listRooms(rooms, socket);
        })
    }

    joinRoom(rooms: Room[], socket: Socket, users: User[]) {
        socket.on('joinroom', (data) => {
            users.forEach((user) => {
                if(user.id === socket.id) {
                    user.room = data.room;
                    rooms.forEach((room) => {
                        if(user.room === room.id) {
                            room.participants.push(user.id);
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
            this.deleteRoom(rooms, position);
        });
    }

    createRoom(rooms: Room[], socket: Socket) {
        socket.on('createroom', (data) => {
            const id = crypto.randomBytes(5).toString('hex');
            const room = new Room(data.name, id, Math.abs(Number(data.max)));
            rooms.push(room);
            this.listRooms(rooms, socket);
            console.log(rooms.length, 'salas criadas');
        });
    }

    deleteRoom(rooms: Room[], position: number) {
        if(position >= 0) rooms.splice(position, 1);
    }
}

export default new RoomEventsIO;
