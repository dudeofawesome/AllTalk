var WEBSITE_PORT = 8080;

var fs = require("fs");

var express = require("express");
var app = express();
var server;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var index, messaging;

function loadPages () {
	index = fs.readFileSync("./pages/index.html").toString();
	messaging = fs.readFileSync("./pages/messaging.html").toString();
}

module.exports = {
    init: function () {
        loadPages();
        this.startServer();
        return this;
    },
    startServer: function () {
        app.use(express.static("./pages/"));
        app.get("/", function (req, res) {
            res.send(index);
        });
        app.post("/signup", function (req, res) {
            // console.log("get flyers");
            // db.fliers.find({school: req}, function(err, items) {
            // 	if( err || !items || items.length == 0) res.send("No flyers were found.");
            // 	else {
            // 		res.send("flyers->" + items[0].flyers);
            // 	}
            // });
            if (req.body.username != "failme") {
                res.send("success " + "ib87f9n88JYT&*&df89");
            } else {
                res.send("fail");
            }
        });
        app.get("/messaging", function (req, res) {
            var loggedIn = true;
            if (loggedIn) {
                res.send(messaging);
            }
        });

        server = app.listen(WEBSITE_PORT, function() {
            console.log("web server listening on *:" + WEBSITE_PORT);
        });
    },
    stopServer: function () {
        server.close();
        return true;
    },
    getApp: function () {
        return app;
    }
};
