var Utils = require('./utils');
var collections = ['users', 'conversations', 'attachments'];
var db;
var testDB = {};

module.exports = {
    modesSet: false,
    modes: {LOG: false, TEST: false},

    init: function (modes) {
        if (modes !== undefined && !module.exports.modesSet) {
            module.exports.modesSet = true;
            module.exports.modes = modes;
        }
        if (typeof global.it === 'function') {
            module.exports.modes.TEST = true;
        }
        if (!module.exports.modes.TEST) {
            if (db === undefined) {
                var credentials = {};
                if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
                    credentials.username = process.env.DB_USERNAME;
                    credentials.password = process.env.DB_PASSWORD;
                } else {
                    credentials = require('./secrets/database');
                }
                var databaseUrl = 'mongodb://' + credentials.username + ':' + credentials.password + '@ds051970.mongolab.com:51970/all-talk';
                db = require('mongojs').connect(databaseUrl, collections);
            }
        } else {
            // for (var i = 0; i < collections.length; i++) {
            //     testDB[collections[i]] = {
            //         data: {
            //             foo: 'foo',
            //             bar: 'bar'
            //         },
            //         find: function (query, callback) {
            //             var err = {};
            //
            //             // var queryKeys = Object.keys(query);
            //             var response = [];
            //             // var dataKeys = Object.keys(this.data);
            //             // for (var i = 0; i < queryKeys.length; i++) {
            //             //     for (var j = 0; j < dataKeys.length; j++) {
            //             //         if (queryKeys[i] === dataKeys[j]) {
            //             //             if (query[queryKeys[i]] !== '' || query[queryKeys[i]] !== undefined) {
            //             //                 response.push(this.data[dataKeys[j]]);
            //             //             }
            //             //         }
            //             //     }
            //             // }
            //
            //             callback(err, response);
            //         },
            //         save: function (newDoc, callback) {
            //             var err = {};
            //
            //             callback(err);
            //         },
            //         update: function (query, updateDoc, callback) {
            //             var err = {};
            //
            //             // var queryKeys = Object.keys(query);
            //             var response = [];
            //             // var dataKeys = Object.keys(this.data);
            //             // for (var i = 0; i < queryKeys.length; i++) {
            //             //     for (var j = 0; j < dataKeys.length; j++) {
            //             //         if (queryKeys[i] === dataKeys[j]) {
            //             //             if (query[queryKeys[i]] !== '' || query[queryKeys[i]] !== undefined) {
            //             //                 response.push(this.data[dataKeys[j]]);
            //             //             }
            //             //         }
            //             //     }
            //             // }
            //
            //             callback(err, response);
            //         }
            //     };
            // }
            // testDB.close = function () {
            //     return;
            // };
            if (db === undefined) {
                var databaseUrl = 'mongodb://travis:test@127.0.0.1:27017/mydb_test';
                db = require('mongojs').connect(databaseUrl, collections);
            }
        }
        return this;
    },
    disconnect: function () {
        if (db !== undefined) {
            db.close();
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
    getConversationsByUserID: function (uID, callback) {
        if (!module.exports.modes.TEST) {
            db.users.find({_id: db.ObjectId(uID)}, function (err, user) {
                user = user[0];
                if (!err) {
                    var returnConversations = {};
                    for (var i = 0; i < user.conversations.length; i++) {
                        db.conversations.find({_id: db.ObjectId(user.conversations[i].id)}, function (err, conversation) {
                            conversation = conversation[0];
                            for (var k = 0; k < user.conversations.length; k++) {
                                if (conversation._id == user.conversations[k].id) {
                                    conversation.status = user.conversations[k].status;
                                }
                            }
                            if (!err) {
                                // replace user IDs in conversation.users with actual data
                                var usersInChat = [];
                                for (var j = 0; j < conversation.users.length; j++) {
                                    if (conversation.users[j] !== uID) {
                                        db.users.find({_id: db.ObjectId(conversation.users[j])}, function (err, cUser) {
                                            if (!err) {
                                                cUser = cUser[0];
                                                cUser.conversations = undefined;
                                                usersInChat.push(cUser);
                                                if (usersInChat.length === conversation.users.length - 1) {
                                                    conversation.users = usersInChat;
                                                    returnConversations[conversation._id] = conversation;
                                                    returnConversations[conversation._id].id = returnConversations[conversation._id]._id;
                                                    returnConversations[conversation._id]._id = undefined;
                                                }
                                                if (Object.keys(returnConversations).length === user.conversations.length) {
                                                    callback(returnConversations);
                                                }
                                            }
                                        }); // jshint ignore:line
                                    }
                                }
                            }
                        }); // jshint ignore:line
                    }
                }
            });
        } else {
            callback(testDB.chats);
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
        }
    }
};
