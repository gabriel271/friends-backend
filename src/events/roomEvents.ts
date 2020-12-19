import Room from "../entities/room";
import User from "../entities/user";

class RoomEventsIO {
    userJoin(list: Room[], user: User, roomId: string) {
        list.forEach((room) => {
            if(room.id === roomId) room.addUser(user);
        });
    }

    userLeft(list: Room[], user: User) {
        list.forEach((room) => {
            if(user.room === room.id) {
                room.removeUser(user);
            }
        });
    }
}

export default new RoomEventsIO;
