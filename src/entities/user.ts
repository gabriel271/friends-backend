import { Socket } from "socket.io"

class  User {
    socket: Socket;
    room: string;
    
    constructor(socket: Socket) {
        this.socket = socket
        this.room = 'null';
    }

    addUser(listUsers: Socket[]) {
        listUsers.push(this.socket);
    }

    removeUser(listUsers: Socket[]) {
        return listUsers.filter(({ id }) => id !== this.socket.id);
    }

    setRoom(roomId: string) {
        this.room = roomId;
    }
}

export default User
