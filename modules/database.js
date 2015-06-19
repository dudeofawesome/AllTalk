var Utils = require('./utils');

var databaseUrl = 'mongodb://localhost:27017/AllTalk';
var collections = ['users', 'conversations', 'attachments'];
var db;
var testDB = {};

module.exports = {
    modes: {LOG: false, TEST: false},

    init: function (modes) {
        if (modes !== undefined) {
            module.exports.modes = modes;
        }
        if (!module.exports.modes.TEST) {
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

            for (var i = 0; i < collections.length; i++) {
                testDB[collections[i]] = {
                    data: {
                        foo: 'foo',
                        bar: 'bar'
                    },
                    find: function (query, callback) {
                        var err = {};

                        // var queryKeys = Object.keys(query);
                        var response = [];
                        // var dataKeys = Object.keys(this.data);
                        // for (var i = 0; i < queryKeys.length; i++) {
                        //     for (var j = 0; j < dataKeys.length; j++) {
                        //         if (queryKeys[i] === dataKeys[j]) {
                        //             if (query[queryKeys[i]] !== '' || query[queryKeys[i]] !== undefined) {
                        //                 response.push(this.data[dataKeys[j]]);
                        //             }
                        //         }
                        //     }
                        // }

                        callback(err, response);
                    },
                    save: function (newDoc, callback) {
                        var err = {};

                        callback(err);
                    },
                    update: function (query, updateDoc, callback) {
                        var err = {};

                        // var queryKeys = Object.keys(query);
                        var response = [];
                        // var dataKeys = Object.keys(this.data);
                        // for (var i = 0; i < queryKeys.length; i++) {
                        //     for (var j = 0; j < dataKeys.length; j++) {
                        //         if (queryKeys[i] === dataKeys[j]) {
                        //             if (query[queryKeys[i]] !== '' || query[queryKeys[i]] !== undefined) {
                        //                 response.push(this.data[dataKeys[j]]);
                        //             }
                        //         }
                        //     }
                        // }

                        callback(err, response);
                    }
                };
            }
            testDB.close = function () {
                return;
            };
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
        if (!module.exports.modes.TEST) {
            db.users.find({}, function (err, users) {
                if (err) {
                    callback(err);
                } else {
                    callback(users);
                }
            });
        } else {

        }
    },
    getUser: function (username, callback) {
        if (!module.exports.modes.TEST) {
            db.users.find({username: username}, function (err, user) {
                if (err) {
                    callback(err);
                } else {
                    callback(user[0]);
                }
            });
        } else {

        }
    },
    getUserByID: function (ID, callback) {
        if (!module.exports.modes.TEST) {
            db.users.find({_id: db.ObjectId(ID)}, function (err, user) {
                if (err) {
                    callback(err);
                } else {
                    callback(user[0]);
                }
            });
        } else {

        }
    },
    addUser: function (user, callback) {
        if (!module.exports.modes.TEST) {
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
        } else {
            for (var i = 0; i < testDB.users.data.length; i++) {
                if (testDB.users.data[i].username === user.username) {
                    callback('User already exists');
                    return;
                }
            }
            testDB.users.data.push({username: user.username});
            callback(testDB.users.data.length);
        }
    },
    getConversationsByUserID: function (ID, callback) {
        if (!module.exports.modes.TEST) {
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
        } else {

        }
    },
    storeMessage: function (msg) {
        if (!module.exports.modes.TEST) {
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
                    testDB.conversations.data[i].history.push({sender: msg.sender, message: msg.message, time: msg.time});
                }
            }
        }
    }
};
