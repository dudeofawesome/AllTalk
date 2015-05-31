var Utils = require("./utils");

var databaseUrl = "mongodb://localhost:27017/AllTalk";
var collections = ["users", "conversations", "attachments"];
var db;

module.exports = {
    init: function () {
        if (db === undefined) {
            db = require("mongojs").connect(databaseUrl, collections);
        }
        return this;
    },
    getUsers: function (callback) {
        db.users.find(function(err, users) {
            if (err) {
                callback(err);
            } else {
                callback(users);
            }
        });
    },
    getUser: function (username, callback) {
        db.users.find({username: username}, function(err, user) {
            if (err) {
                callback(err);
            } else {
                callback(user[0]);
            }
		});
    },
    getUserByID: function (ID, callback) {
        db.users.find({_id: db.ObjectId(ID)}, function(err, user) {
            if (err) {
                callback(err);
            } else {
                callback(user[0]);
            }
		});
    },
    addUser: function (user, callback) {
        db.users.find({username: user.username}, function(err, users) {
			//verify there are no other users with username and that the email is valid
			if (users.length === 0) {
				db.users.save({username: user.username, password: Utils.hashPassword(user.password), email: user.email}, function(err, saved) {
					if (err) {
                        callback(err);
					} else {
						callback(saved._id);
					}
				});
			} else {
				callback("User already exists");
			}
		});
    },
    getConversationsByUserID: function (ID, callback) {
        db.users.find({_id: ID}, function (err, user) {
            if (err) {
                callback(err);
            } else {
                var returnConversations = [];
                for (var i = 0; i < user.conversations.length; i++) {
                    db.conversations.find({_id: user.conversations[i]}, function (err, conversation) {
                        if (!err) {
                            returnConversations.push(conversation);
                            if (returnConversations.length === user.conversations.length) {
                                callback(returnConversations);
                            }
                        }
                    }); // jshint ignore:line
                }
                callback(user.conversations);
            }
        });
    }
};
