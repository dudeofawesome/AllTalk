var testing = require("../chat_server");

var should = require("should"); // jshint ignore:line

describe("chat_server.js tests", function () {
    it("starting chat server", function (done) {
        testing = testing.init();
        testing.should.be.an.instanceOf(Object);
        done();
    });
    it("send message", function (done) {
        throw new Error("implement this test");
        testing.addUser(undefined, function (ID) {
            done();
        });
    });
    it("receive message", function (done) {
        throw new Error("implement this test");
        testing.addUser(undefined, function (ID) {
            done();
        });
    });
    it("stopping chat server", function (done) {
        testing.stopServer().should.equal(true);
        done();
    });
});
