import { Socket } from "socket.io"
import User from "./user";

class  Room {
    numberMax: number;
    id: string;
    participants: User[];
    
    constructor(numberMax: number = 10, id: string) {
        this.participants = [];
        this.numberMax = numberMax;
        this.id = id;
    }

    addUser(user: User) {
        this.participants.push(user);
    }

    removeUser(user: User) {
        this.participants = this.participants.filter(({ socket }) => socket.id !== user.socket.id);
    }
}

export default Room;
