var fs = require('fs');

// var bcrypt = require('-nodejs');
// var utils = require('./modules/utils');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(d) {
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};

// var GCM = require('gcm').GCM;
// var apiKey = 'AIzaSyBg4mLnceWpKL8-Lpo6nUjGfx6v86Sovtk';
// var gcm = new GCM(apiKey);

var userSessions = [];
var failedAuthAttempts = [];
var disabledSocketIDs = [];
var connectedSockets = [];

function authenticateIDauthKey (ID, authKey) {
	stopBruteForce(ID);
	if (disabledSocketIDs[msg.bidder] !== undefined) {
		if (DATE.getTime() < disabledSocketIDs[msg.bidder]) {
			return false;
		}
		else {
			disabledSocketIDs[msg.bidder] = undefined;
		}
	}
	// verify user session
	if (userSessions[msg.bidder] !== undefined && userSessions[msg.bidder].authKey === msg.authKey) {
		return true;
	}
	else {
		return false;
	}
}

function stopBruteForce (ID) {
	if (failedAuthAttempts[ID] === undefined) {
		failedAuthAttempts[ID] = 1;
	}
	else if (disabledSocketIDs[ID] === undefined) {
		failedAuthAttempts[ID]++;
		if (failedAuthAttempts[ID] > 10) {
			// keep the user from trying to log in again for a while
			disabledSocketIDs[ID] = DATE.getTime() + (5 * 60 * 1000);
		}
	}
}

function determineAuthKey(id) {
	var key = 0;
	for (var i = 0; i < 32; i++) {
		key += Math.floor(Math.random() * 10) * Math.pow(10, i);
	}
	return id + key;
}

function validatePassword(password) {
	var longEnough = password.length >= 8;
	var shortEnough = password.length <= 32;
	// var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
	// var hasCorrectChars = password.match(regExp);
	var hasDigits = password.match(/\d/) !== undefined;
	var hasLetters = password.match(/[a-zA-Z]/) !== undefined;
	console.log(password + ' = ' + longEnough + ' ' + shortEnough + ' ' + hasDigits + ' ' + hasLetters);
	if (longEnough && shortEnough && hasDigits && hasLetters) {
		return true;
	}
	else {
		if (!longEnough) {
			return 'Password is too short.';
		}
		if (!shortEnough) {
			return 'Password is too long.';
		}
		if (!hasDigits) {
			return 'Password must have numbers';
		}
		if (!hasLetters) {
			return 'Password must have letters.';
		}
	}
}

module.exports = {
	database: require('./modules/database'),
	webServer: require('./modules/web_server'),
	chatServer: require('./modules/chat_server'),

	startServers: function () {
		this.database.init();
		this.webServer.init();
		this.chatServer.init(this.webServer.getServer());

		return this;
	},
	stopServers: function () {
		var dbStopped = this.database.stopServer();
		var webStopped = this.webServer.stopServer();
		var chatStopped = this.chatServer.stopServer();

		return dbStopped && webStopped && chatStopped;
	}
};

module.exports.startServers();
