module.exports = {
    startServer: function () {
        app.use(express.static("./pages/"));
        app.get("/", function (req, res) {
            res.send(index);
        });
        app.post("/signup", function (req, res) {
        //	console.log("get flyers");
        //	db.fliers.find({school: req}, function(err, items) {
        //		if( err || !items || items.length == 0) res.send("No flyers were found.");
        //		else {
        //			res.send("flyers->" + items[0].flyers);
        //		}
        //	});
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

        app.listen(WEBSITE_PORT, function(){
            console.log('web server listening on *:' + WEBSITE_PORT);
        });
    },
    stopServer: function () {
        app.stop();
    }
};

var WEBSITE_PORT = 8080;

var fs = require('fs');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var index, messaging;

function loadPages () {
	// TODO: search document for all names encapsulated by {{}} and auto replace them if the var exists in this scope
	index = fs.readFileSync('./pages/index.html').toString();
//	configPage = configPage.replaceAll("{{SERVICE_NAME}}", SERVICE_NAME);

	messaging = fs.readFileSync('./pages/messaging.html').toString();
//	finishConfigPage = finishConfigPage.replaceAll("{{SERVICE_NAME}}", SERVICE_NAME);
}

loadPages();
module.exports.startServer();
