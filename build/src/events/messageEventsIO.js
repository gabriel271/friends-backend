"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageEventsIO = /** @class */ (function () {
    function MessageEventsIO() {
    }
    MessageEventsIO.prototype.sentMesage = function (socket, users) {
        socket.on('sentmesage', function (data) {
            users.forEach(function (user) {
                user.socketIo.emit('newmesage', { message: data.message, name: data.name, author: socket.id });
            });
        });
    };
    return MessageEventsIO;
}());
exports.default = new MessageEventsIO;
