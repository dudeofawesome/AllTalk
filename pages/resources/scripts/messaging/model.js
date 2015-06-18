var socket;

var model = { // jshint ignore:line
    sendMessage: function (msg) {
        socket.emit('message', msg);
    }
};

window.onload = function () {
    // socket = io.connect('https://' + window.location.hostname + ':25585');
    // socket = io.connect('http://' + window.location.hostname + ':25585');
    socket = io(); // jshint ignore:line

    socket.on('message', function (msg) {
        alert('new message:' + msg);
        var scope = angular.element(document.getElementsByTagName('html')[0]).scope();
        // scope.ctrlMessenger.chats[msg.conversationID].history.push(msg.sender, (msg.sender === scope.ctrlMessenger.you.id) ? true : false, msg.message, msg.attachment, msg.time);
        // scope.$apply();
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
