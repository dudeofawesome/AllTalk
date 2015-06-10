var testing = require('../server');

var should = require('should'); // jshint ignore:line

describe('utils.js tests', function () {
    it('start servers', function (done) {
        testing = testing.init();
        testing.should.be.an.instanceOf(Object);

        done();
    });
    it('stop servers', function (done) {
        testing = testing.init();
        testing.stopServer().should.equal(true);

        done();
    });
});
