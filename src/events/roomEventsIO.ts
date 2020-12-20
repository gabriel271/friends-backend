import {Socket} from "socket.io";
import Room from "../entities/room";
import crypto from 'crypto';

class RoomEventsIO {
    listRooms(list: Room[], socket: Socket) {
        socket.emit('listrooms', list);
    }

    userJoin(list: Room[], socket: Socket) {
        socket.on('joinroom', (data) => {
            list.forEach((room) => {
                if(room.id === data.room) room.addUser(socket);
            });
        })
    }

    userLeft(list: Room[], socket: Socket) {
        socket.on('userleft', (data) => {
            list.forEach((room) => {
                if(room.id === data.room) room.removeUser(socket);
            });
        })
    }

    createRoom(list: Room[], socket: Socket) {
        socket.on('createroom', (data) => {
            const id = crypto.randomBytes(5).toString('hex');
            const room = new Room(data.name, id);
            list.push(room);
            socket.broadcast.emit('listrooms', list)
        })
    }

    deleteRoom(list: Room[], roomId: string) {
        list = list.filter(({ id }) => id !== roomId);
    }
}

export default new RoomEventsIO;
