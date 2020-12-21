import { Socket } from "socket.io";

class User {
    id: string;
    socket: Socket;
    room: null | string;

    constructor(id: string, socket: Socket) {
        this.id = socket.id;
        this.socket = socket;
        this.room = null;
    }

    setRoom(room: string) {
        this.room = room;
    }
}

export default User;
