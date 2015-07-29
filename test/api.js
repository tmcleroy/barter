require('dotenv').load(); // environment variables in .env
var assert = require('chai').assert;
var request = require('supertest');

var url = 'http://localhost:' + process.env.PORT;

function status200Html (route, done) {
  request(url)
    .get(route)
    .end(function (err, res) {
      assert.equal(res.status, 200, 'status should be 200');
      assert.isTrue(res.text.indexOf('</html>') > -1, 'response body should contain closing html tag');
      done();
    });
}

function status302RedirectToLogin (route, done) {
  request(url)
    .get(route)
    .end(function (err, res) {
      assert.equal(res.status, 302, 'status should be 302');
      assert.equal(res.header.location, '/login', 'user should be redirected to /login');
      done();
    });
}

describe('Server Routes', function () {

  describe('No auth required', function () {
    it('reqs to / should return 200 with expected html', function (done) {
      status200Html('/', done);
    });
  });

  describe('Auth required', function () {
    it('reqs to /api/* should be redirected to /login', function (done) {
      status302RedirectToLogin('/api/', done);
    });
    it('reqs to /app/* should be redirected to /login', function (done) {
      status302RedirectToLogin('/app/', done);
    });
  });

});
