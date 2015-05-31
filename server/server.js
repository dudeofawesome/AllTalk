var CHAT_PORT = 35937;

var fs = require('fs');

var bcrypt = require('bcrypt-nodejs');
var utils = require('utils');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(d) {
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};
var DATE = new Date();

//var GCM = require('gcm').GCM;
//var apiKey = 'AIzaSyBg4mLnceWpKL8-Lpo6nUjGfx6v86Sovtk';
//var gcm = new GCM(apiKey);

var userSessions = [];
var failedAuthAttempts = [];
var disabledSocketIDs = [];
var connectedSockets = [];

var database = require('./modules/database').init();
var webServer = require('./modules/web_server').init();
var chatServer = require('./modules/chat_server').init();

function authenticateIDauthKey (ID, authKey) {
	stopBruteForce(ID);
	if (disabledSocketIDs[msg.bidder] != null) {
		if (DATE.getTime() < disabledSocketIDs[msg.bidder]) {
			return false;
		}
		else {
			disabledSocketIDs[msg.bidder] = null;
		}
	}
	// verify user session
	if (userSessions[msg.bidder] != null && userSessions[msg.bidder].authKey == msg.authKey)
		return true;
	else
		return false;
}

function stopBruteForce (ID) {
	if (failedAuthAttempts[ID] == null) {
		failedAuthAttempts[ID] = 1;
	}
	else if (disabledSocketIDs[ID] == null) {
		failedAuthAttempts[ID]++;
		if (failedAuthAttempts[ID] > 10) {
			//keep the user from trying to log in again for a while
			disabledSocketIDs[ID] = DATE.getTime() + (5 * 60 * 1000);
		}
	}
}

function determineID (username) {
	// TODO this DB get may have scaling issues once there are more users
	var id = "";
	db.users.find({username: username}, function(err, users) {
		if( err || !users) console.log(err);
		else
			id = users[0]._id
	});
	return id;
}

function determineAuthKey(id) {
	var key = 0;
	for (var i = 0; i < 32; i++)
		key += Math.floor(Math.random() * 10) * Math.pow(10, i);
	return id + key;
}

function validateEmail(email) {
	return (email.length >= 5 && email.indexOf(" ") == -1 && email.split("@").length == 2 && email.split(".").length == 2 && email.indexOf("@") < email.indexOf(".") - 1 && email.indexOf("@") != 0 && email.indexOf(".") != email.length - 1);
}

function validatePassword(password) {
	var longEnough = password.length >= 8;
	var shortEnough = password.length <= 32;
	// var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
	// var hasCorrectChars = password.match(regExp);
	var hasDigits = password.match(/\d/) != null;
	var hasLetters = password.match(/[a-zA-Z]/) != null;
	console.log(password + " = " + longEnough + " " + shortEnough + " " + hasDigits + " " + hasLetters);
	if (longEnough && shortEnough && hasDigits && hasLetters)
		return true;
	else {
		if (!longEnough) {
			return "Password is too short.";
		}
		if (!shortEnough) {
			return "Password is too long.";
		}
		if (!hasDigits) {
			return "Password must have numbers";
		}
		if (!hasLetters) {
			return "Password must have letters.";
		}
	}
}
