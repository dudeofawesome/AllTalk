var PORT = 255855;

// var fs = require('fs');
// Setup some https server options
// var https_options = {
//   key: fs.readFileSync('/Users/DudeOfAwesome/github/Auctioneer/Web/certificates/key.pem').toString(),
//   cert: fs.readFileSync('/Users/DudeOfAwesome/github/Auctioneer/Web/certificates/cert.pem').toString()
// };

var app = require("express")();
// var server = require('https').Server(https_options, app);
var server = require("http").Server(app);
var io = require("socket.io")(server);
// var bcrypt = require("bcrypt-nodejs");
var database = require("./database");


var connectedSockets = [];

module.exports = {
	init: function () {
		io.on("connection", function (socket) {
			console.log("new user connected");
			connectedSockets[socket.id] = true;
			socket.on("get user", function(msg) {
				console.log("get user");
				database.getUserByID(msg._id, function (user) {
					io.emit("get user", user);
				})
			});
			socket.on("message", function (msg) {

			});
		    socket.on("disconnect", function () {
				connectedSockets[socket.id] = undefined;
			});
		});

		this.startServer();
		return this;
	},
	startServer: function () {
		server.listen(PORT, function(){
			console.log("chat server listening on *:" + PORT);
		});
	},
	stopServer: function () {
		server.close();
		return true;
	}
};
