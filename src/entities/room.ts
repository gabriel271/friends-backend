import User from "./user";

class Room {
    name: string;
    participants: User[];
    id: string;
    max: number;

    constructor(name: string, id: string, max: number) {
        this.participants = [];
        this.name = name;
        this.id = id;
        this.max = max
    }

    addUser(user: User) {
        this.participants.push(user);
    }

    removeUser(user: string) {
        this.participants = this.participants.filter(({ id }) => id !== user);
    }
}

export default Room;
