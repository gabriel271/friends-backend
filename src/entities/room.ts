class Room {
    name: string;
    participants: string[];
    id: string;
    max: number;

    constructor(name: string, id: string, max: number) {
        this.participants = [];
        this.name = name;
        this.id = id;
        this.max = max
    }

    addUser(user: string) {
        this.participants.push(user);
    }

    removeUser(userId: string) {
        this.participants = this.participants.filter((user) => userId !== user);
    }
}

export default Room;
