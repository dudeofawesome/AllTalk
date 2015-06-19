var socket;

var model = { // jshint ignore:line
    sendMessage: function (msg) {
        socket.emit('message', msg);
    }
};

window.onload = function () {
    socket = io(); // jshint ignore:line

    socket.on('message', function (msg) {
        var scope = angular.element(document.getElementsByTagName('html')[0]).scope().$$childHead;
        // TODO check is sender is really not you // (msg.sender === scope.ctrlMessenger.you.id) ? true : false
        scope.ctrlMessenger.chats[msg.conversationID].history.push(new Message(msg.sender, false, msg.message, msg.attachment, msg.time));
        scope.$apply();
    });
    socket.on('login', function (msg) {

    });
    socket.on('reconnect', function (msg) {

    });
};

function rejoinSession () {
    if (localStorage.ID !== '' && localStorage.authKey !== '' && localStorage.ID !== undefined && localStorage.authKey !== undefined) {
        console.log('attempting to rejoin');
        socket.emit('reconnect to session', {id: localStorage.ID, authKey: localStorage.authKey});
        return true;
    } else {
        return false;
    }
}
