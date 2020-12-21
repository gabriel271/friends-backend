import {Socket} from "socket.io";
import User from '../entities/user';

class UserEventsIO {
    login(socket: Socket, users: User[]) {
        socket.on('login', () => {
            const user = new User(socket.id, socket);
            this.addUser(user, users);
        });
    }

    logOff(user: User, users: User[]) {
        this.removeUser(user, users);
    }

    addUser(user: User, users: User[]) {
        users.push(user);
    }

    removeUser(user: User, users: User[]) {
        users = users.filter(({ id }) => id !== user.id);
    }
}

export default new UserEventsIO;
