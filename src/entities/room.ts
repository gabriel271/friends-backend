import { Socket } from "socket.io";

class Room {
    name: string;
    participants: Socket[];
    id: string;

    constructor(name: string, id: string) {
        this.participants = [];
        this.name = name;
        this.id = id;
    }

    addUser(socket: Socket) {
        this.participants.push(socket);
    }

    removeUser(socket: Socket) {
        this.participants = this.participants.filter(({ id }) => id !== socket.id);
    }
}

export default Room;
