var databaseUrl = "mongodb://localhost:27017/AllTalk";
var collections = ["users", "fliers"];
var db = require("mongojs").connect(databaseUrl, collections);

