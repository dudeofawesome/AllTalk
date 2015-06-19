var testing = require('../chat_server');

var should = require('should'); // jshint ignore:line
var io = require('socket.io-client');

var socketURL = 'http://localhost:25585';
var options = {
    transports: ['websocket'],
    'force new connection': true
};
var chatUser1 = {name: 'Tom'};
var chatUser2 = {name: 'Sally'};
var chatUser3 = {name: 'Dana'};

describe('chat_server.js tests', function () {
    it('starting chat server', function (done) {
        testing = testing.init();
        testing.should.be.an.instanceOf(Object);
        done();
    });
    it('connect to chat server', function (done) {
        var client1 = io.connect(socketURL, options);
        client1.on('connect', function () {
            done();
        });
    });
    it('send message', function (done) {
        var testMsg = {
            conversationID: '123456789abcdef',
            sender: 'abcdef123456789',
            message: 'Hello World!',
            time: 1434695331570
        };

        var client1 = io.connect(socketURL, options);
        client1.on('connect', function () {
            client1.emit('message', testMsg);
            done();
        });
    });
    it('receive message', function (done) {
        var testMsg = {
            conversationID: '123456789abcdef',
            sender: 'abcdef123456789',
            message: 'Hello World!',
            time: 1434695331570
        };

        var client1 = io.connect(socketURL, options);
        client1.on('message', function (msg) {
            msg.conversationID.should.equal(testMsg.conversationID);
            msg.sender.should.equal(testMsg.sender);
            msg.message.should.equal(testMsg.message);
            msg.time.should.equal(testMsg.time);
            done();
        });
        client1.on('connect', function () {
            var client2 = io.connect(socketURL, options);
            client2.on('connect', function () {
                client2.emit('message', testMsg);
            });
        });
    });
    it('stopping chat server', function (done) {
        testing.stopServer().should.equal(true);
        done();
    });
});
