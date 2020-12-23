import {Socket} from "socket.io";
import Room from "../entities/room";
import User from '../entities/user';
import roomEventsIO from '../events/roomEventsIO';

class UserEventsIO {
    login(socket: Socket, users: User[]) {
        socket.on('login', () => {
            const user = new User(socket.id, socket);
            this.addUser(user, users);
            console.log(users.length, 'users conectados (entrou)');
        });
    }

    logOff(socket: Socket, users: User[], rooms: Room[]) {
        socket.on('disconnect', () => {
            let position = -1;
            const user = this.removeUser(socket, users);
            rooms.forEach((room, index) => {
                if(user[0].room === room.id) {
                    room.removeUser(user[0].id);
                    if(room.participants.length === 0) {
                        position = index;
                        roomEventsIO.deleteRoom(rooms, position);
                    }
                }
            })
            console.log(users.length, 'users conectados (saiu)');
        });
    }

    addUser(user: User, users: User[]) {
        users.push(user);
    }

    removeUser(socket: Socket, users: User[]) {
        let position = -1
        users.forEach((user, index) => {
            if(user.id === socket.id) {
                position = index;
            }
        });
        return users.splice(position,1);
    }
}

export default new UserEventsIO;
