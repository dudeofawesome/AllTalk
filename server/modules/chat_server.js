var PORT = 25585;

// var fs = require('fs');
// var https_options = {
//   key: fs.readFileSync('/Users/DudeOfAwesome/github/AllTalk/server/certificates/key.pem').toString(),
//   cert: fs.readFileSync('/Users/DudeOfAwesome/github/AllTalk/server/certificates/cert.pem').toString()
// };

// var app = require('express')();
// var server = require('https').Server(https_options, app);
// var server = require('http').Server(app);
var server;
var io = require('socket.io');
// var bcrypt = require('bcrypt-nodejs');
var database = require('./database');

var connectedSockets = [];

module.exports = {
    init: function (httpServer) {
        if (httpServer === undefined) {
            var app = require('express')();
            server = require('http').Server(app);
            io = io(server);
        } else {
            server = httpServer;
            io = io(server);
        }

        io.on('connection', function (socket) {
            // TODO ensure the user is properly authenticated now, so that we don't have to worry about it later
            console.log('new user connected');
            connectedSockets[socket.id] = true;
            socket.on('get user', function (msg) {
                console.log('get user');
                database.getUserByID(msg._id, function (user) {
                    io.emit('get user', user);
                });
            });
            socket.on('message', function (msg) {
                console.log('new message');
                database.storeMessage(msg);
                socket.broadcast.emit('message', msg);
            });
            socket.on('disconnect', function () {
                connectedSockets[socket.id] = undefined;
            });
        });

        this.startServer();
        return this;
    },
    startServer: function () {
        database.init({LOG: false, TEST: true});

        server.listen(PORT, function () {
            console.log('chat server listening on *:' + PORT);
        });
    },
    stopServer: function () {
        database.disconnect();
        server.close();
        return true;
    }
};
