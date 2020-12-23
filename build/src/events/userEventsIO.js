"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../entities/user"));
var roomEventsIO_1 = __importDefault(require("../events/roomEventsIO"));
var UserEventsIO = /** @class */ (function () {
    function UserEventsIO() {
    }
    UserEventsIO.prototype.login = function (socket, users) {
        var _this = this;
        socket.on('login', function () {
            var user = new user_1.default(socket.id, socket);
            _this.addUser(user, users);
            console.log(users.length, 'users conectados (entrou)');
        });
    };
    UserEventsIO.prototype.logOff = function (socket, users, rooms) {
        var _this = this;
        socket.on('disconnect', function () {
            var position = -1;
            var user = _this.removeUser(socket, users);
            rooms.forEach(function (room, index) {
                if (user[0].room === room.id) {
                    room.removeUser(user[0].id);
                    if (room.participants.length === 0) {
                        position = index;
                        roomEventsIO_1.default.deleteRoom(rooms, position);
                    }
                }
            });
            console.log(users.length, 'users conectados (saiu)');
        });
    };
    UserEventsIO.prototype.addUser = function (user, users) {
        users.push(user);
    };
    UserEventsIO.prototype.removeUser = function (socket, users) {
        var position = -1;
        users.forEach(function (user, index) {
            if (user.id === socket.id) {
                position = index;
            }
        });
        return users.splice(position, 1);
    };
    return UserEventsIO;
}());
exports.default = new UserEventsIO;
