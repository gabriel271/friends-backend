import User from "../entities/user";
import { Socket } from "socket.io";
import Room from "../entities/room";

class MessageEventsIO {
    sentMesage(socket: Socket, users: User[] , rooms: Room[]) {
        socket.on('sentmesage', (data) => {
            let participants: string[] = [];
            rooms.forEach((room) => {
                if(room.id === data.room) {
                    participants = room.participants
                }
            });
            users.forEach((user) => {
                if(participants.indexOf(user.id) >= 0) {
                    user.socketIo.emit('newmesage', {
                        message: data.message, 
                        name: data.name, 
                        author: socket.id
                    });
                }
            });
        });
    }
}

export default new MessageEventsIO;
