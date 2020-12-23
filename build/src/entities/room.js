"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = /** @class */ (function () {
    function Room(name, id, max) {
        this.participants = [];
        this.name = name;
        this.id = id;
        this.max = max;
    }
    Room.prototype.addUser = function (user) {
        this.participants.push(user);
    };
    Room.prototype.removeUser = function (userId) {
        this.participants = this.participants.filter(function (user) { return userId !== user; });
    };
    return Room;
}());
exports.default = Room;
