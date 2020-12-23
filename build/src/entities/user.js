"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, socket) {
        this.id = socket.id;
        this.socketIo = socket;
        this.room = null;
    }
    User.prototype.setRoom = function (room) {
        this.room = room;
    };
    return User;
}());
exports.default = User;
