import User from "../entities/user";
import { Socket } from "socket.io";

class MessageEventsIO {
    sentMesage(socket: Socket, users: User[]) {
        socket.on('sentmesage', (data) => {
            users.forEach((user) => {
                user.socketIo.emit('newmesage', {message: data.message, name: data.name, author: socket.id});
            });
        });
    }
}

export default new MessageEventsIO;
