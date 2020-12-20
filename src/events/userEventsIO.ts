import {Socket} from "socket.io";
import Room from "../entities/room";
import roomEventsIO from "./roomEventsIO";

class UserEventsIO {
    login(socket: Socket, userList: Socket[], roomList: Room[]) {
        socket.on('login', () => {
            this.addUser(socket, userList);
            roomEventsIO.listRooms(roomList, socket);
        });
    }

    logOff(socket: Socket, list: Socket[]) {
        this.removeUser(socket, list);
    }

    addUser(socket: Socket, list: Socket[]) {
        list.push(socket);
    }

    removeUser(socket: Socket, list: Socket[]) {
        list = list.filter(({ id }) => id !== socket.id);
    }
}

export default new UserEventsIO;
