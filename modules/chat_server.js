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
            connectedSockets[socket.id] = true;
            socket.on('get me', function () {
                // TODO: replace '555acfded279374e636b3bd5' with correct user ID
                database.getUserByID('555acfded279374e636b3bd5', function (user) {
                    // TODO check to make sure users are friends before retrieving data
                    io.emit('get me', user);
                });
            });
            socket.on('get user', function (msg) {
                database.getUserByID(msg._id, function (user) {
                    // TODO check to make sure users are friends before retrieving data
                    io.emit('get user', user);
                });
            });
            socket.on('get chats', function () {
                // TODO: replace '555acfded279374e636b3bd5' with correct user ID
                database.getConversationsByUserID('555acfded279374e636b3bd5', function (chats) {
                    io.emit('get chats', chats);
                });
            });
            socket.on('message', function (msg) {
                database.storeMessage(msg);
                // TODO: remove this line once the DB works
                // TODO: only broadcast to users in the currnent chat
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
        // TODO change modes.TEST to false
        database.init({LOG: false, TEST: false});

        server.listen(PORT, function () {
            console.log('chat server listening on *:' + PORT);
        });
    },
    stopServer: function () {
        server.close();
        return true;
    }
};
