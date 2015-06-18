var Utils = require('./utils');

var databaseUrl = 'mongodb://localhost:27017/AllTalk';
var collections = ['users', 'conversations', 'attachments'];
var db;
var testDB = {};

module.exports = {
    // TODO change modes.TEST to false
    modes: {LOG: false, TEST: true},

    init: function (modes) {
        if (modes !== undefined) {
            this.modes = modes;
        }
        if (!this.modes.TEST) {
            if (db === undefined) {
                db = require('mongojs').connect(databaseUrl, collections);
            }
        } else {
            // var tmpDB = require('mongojs').connect(databaseUrl, collections);
            // for (var i = 0; i < collections.length; i++) {
            //     testDB[collections[i]] = {};
            // }
            // tmpDB.users.find({}, function (err, users) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         testDB.users = users;
            //     }
            // });
            // tmpDB.conversations.find({}, function (err, conversations) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         testDB.conversations = conversations;
            //     }
            // });
            // tmpDB.attachments.find({}, function (err, attachments) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         testDB.attachments = attachments;
            //     }
            // });

            var tmpDB = {};
            for (var i = 0; i < collections.length; i++) {
                testDB[collections[i]] = {};
            }
        }
        return this;
    },
    disconnect: function () {
        if (!this.modes.TEST) {
            if (db !== undefined) {
                db.close();
            }
        }
    },
    getUsers: function (callback) {
        db.users.find({}, function (err, users) {
            if (err) {
                callback(err);
            } else {
                callback(users);
            }
        });
    },
    getUser: function (username, callback) {
        db.users.find({username: username}, function (err, user) {
            if (err) {
                callback(err);
            } else {
                callback(user[0]);
            }
        });
    },
    getUserByID: function (ID, callback) {
        db.users.find({_id: db.ObjectId(ID)}, function (err, user) {
            if (err) {
                callback(err);
            } else {
                callback(user[0]);
            }
        });
    },
    addUser: function (user, callback) {
        db.users.find({username: user.username}, function (err, users) {
            // verify there are no other users with username and that the email is valid
            if (users.length === 0) {
                db.users.save({username: user.username, password: Utils.hashPassword(user.password), email: user.email}, function (err, saved) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(saved._id);
                    }
                });
            } else {
                callback('User already exists');
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
    },
    storeMessage: function (msg) {
        if (!this.modes.TEST) {
            db.conversations.update({_id: db.ObjectId(msg.conversationID)}, {$push: {history: {sender: msg.sender, message: msg.message, time: msg.time}}}, function (err, saved) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(saved);
                }
            });
        } else {
            for (var i = 0; i < testDB.conversations.length; i++) {
                if (testDB.conversations[i]._id === msg.conversationID) {
                    testDB.conversations[i].history.push({sender: msg.sender, message: msg.message, time: msg.time});
                }
            }
        }
    }
};
