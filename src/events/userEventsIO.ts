import {Socket} from "socket.io";
import User from '../entities/user';

class UserEventsIO {
    login(socket: Socket, users: User[]) {
        socket.on('login', () => {
            const user = new User(socket.id, socket);
            this.addUser(user, users);
            console.log(users.length, 'users conectados1');
        });
    }

    logOff(socket: Socket, users: User[]) {
        socket.on('disconnect', () => {
            this.removeUser(socket, users);
            console.log(users.length, 'users conectados2');
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
        users.splice(position,1);
    }
}

export default new UserEventsIO;
