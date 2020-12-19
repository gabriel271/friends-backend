import {Socket} from "socket.io";
import User from "../entities/user";

class UserEventsIO {
    login(list: Socket[], socket: Socket) {
        socket.on('login', () => {
            const user = new User(socket);
            user.addUser(list);
            console.log('list', list.length);
        });
    }

    logOff(list: Socket[], socket: Socket) {
        const user = new User(socket);
        list = user.removeUser(list);
    }
}

export default new UserEventsIO;
