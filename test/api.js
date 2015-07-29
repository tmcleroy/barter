require('dotenv').load(); // environment variables in .env
var assert = require('chai').assert;
var request = require('supertest');
var testUser = require('superagent').agent();

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

  describe('Unauthenticated user', function () {
    it('reqs to / should return 200 with expected html', function (done) {
      status200Html('/', done);
    });
    it('reqs to /api/* should be redirected to /login', function (done) {
      status302RedirectToLogin('/api/', done);
    });
    it('reqs to /app/* should be redirected to /login', function (done) {
      status302RedirectToLogin('/app/', done);
    });
  });

  describe('Authenticated user', function () {
    // this test should be run before any other test requiring authentication
    // since it sets up the `testUser` object with all the auth cookies
    it('test user can authenticate', function (done) {
      var USERNAME = 'tommy';
      var PASSWORD = 'tpass';
      testUser.post(url + '/login')
        .send({ username: USERNAME, password: PASSWORD })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'status should be 200');
          assert.equal(res.body.username, USERNAME, 'correct username should be returned');
          done();
        });
    });
    it('test user can browse requests', function (done) {
      testUser.get(url + '/app/requests/browse')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'status should be 200');
          done();
        });
    });
  });

});
