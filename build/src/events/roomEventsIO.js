"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var room_1 = __importDefault(require("../entities/room"));
var crypto_1 = __importDefault(require("crypto"));
var RoomEventsIO = /** @class */ (function () {
    function RoomEventsIO() {
    }
    RoomEventsIO.prototype.listRooms = function (rooms, socket) {
        socket.emit('listrooms', JSON.stringify(rooms));
    };
    RoomEventsIO.prototype.getRooms = function (rooms, socket) {
        var _this = this;
        socket.on('getrooms', function () {
            _this.listRooms(rooms, socket);
        });
    };
    RoomEventsIO.prototype.joinRoom = function (rooms, socket, users) {
        socket.on('joinroom', function (data) {
            users.forEach(function (user) {
                if (user.id === socket.id) {
                    user.room = data.room;
                    rooms.forEach(function (room) {
                        if (user.room === room.id) {
                            room.participants.push(user.id);
                        }
                    });
                }
            });
        });
    };
    RoomEventsIO.prototype.leftRoom = function (rooms, socket) {
        var _this = this;
        socket.on('leftroom', function (data) {
            var position = -1;
            rooms.forEach(function (room, index) {
                if (room.id === data.room) {
                    room.removeUser(socket.id);
                    if (room.participants.length === 0) {
                        position = index;
                    }
                }
            });
            _this.deleteRoom(rooms, position);
        });
    };
    RoomEventsIO.prototype.createRoom = function (rooms, socket) {
        var _this = this;
        socket.on('createroom', function (data) {
            var id = crypto_1.default.randomBytes(5).toString('hex');
            var room = new room_1.default(data.name, id, Math.abs(Number(data.max)));
            rooms.push(room);
            _this.listRooms(rooms, socket);
            console.log(rooms.length, 'salas criadas');
        });
    };
    RoomEventsIO.prototype.deleteRoom = function (rooms, position) {
        if (position >= 0)
            rooms.splice(position, 1);
    };
    return RoomEventsIO;
}());
exports.default = new RoomEventsIO;
