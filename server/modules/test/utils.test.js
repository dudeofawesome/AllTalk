var testing = require("../utils");

var should = require("should"); // jshint ignore:line

describe("utils.js tests", function () {
    it("password hashing", function (done) {
        testing.comparePassword(testing.hashPassword("hashme"), "hashme").should.equal(true);
        done();
    });
});
