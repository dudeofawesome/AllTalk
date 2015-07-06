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
        socket.emit('get me');
    });
    socket.on('message', function (msg) {
        scope.ctrlChat.addMessage(msg);
    });
    socket.on('get chats', function (chats) {
        scope.ctrlMessenger.chats = chats;
        scope.$apply();
        scope.ctrlChat.switchChat(scope.ctrlMessenger.currentChat, document.getElementById('chats').firstElementChild);
    });
    socket.on('get me', function (user) {
        scope.ctrlMessenger.you = user;
    });
};
