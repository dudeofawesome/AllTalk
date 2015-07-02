var socket;

var model = { // jshint ignore:line
    sendMessage: function (msg) {
        socket.emit('message', msg);
    }
};

window.onload = function () {
    socket = io(); // jshint ignore:line
    var scope = angular.element(document.getElementsByTagName('html')[0]).scope().$$childHead;

    socket.on('login', function () {

    });
    socket.on('connect', function () {
        socket.emit('get chats');
    });
    socket.on('message', function (msg) {
        scope.ctrlChat.addMessage(msg);
    });
    socket.on('get chats', function (chats) {
        scope.ctrlMessenger.chats = chats;
        // TODO: for through each chat and add it to the list
        scope.$apply();
    });
};
