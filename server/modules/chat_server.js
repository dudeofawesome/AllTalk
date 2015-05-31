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


var connectedSockets = [];

io.on("connection", function (socket) {
	console.log("new user connected");
	connectedSockets[socket.id] = true;
	socket.on("get friends", function() {
		console.log("get auction items");
		db.items.find(function(err, items) {
			if( err || !items || items.length === 0) {
				io.to(socket.id).emit("get auction items", "No items were found.");
			}
			else {
				io.to(socket.id).emit("get auction items", items);
			}
		});
	});
    socket.on("disconnect", function () {
		connectedSockets[socket.id] = undefined;
	});
});

server.listen(PORT, function(){
	console.log("chat server listening on *:" + PORT);
});
