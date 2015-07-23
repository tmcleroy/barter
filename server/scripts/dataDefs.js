var models = require('../models');

var defs = [
  {
    name: 'user',
    model: models.User,
    instances: [
      {
        name: 'tommy',
        attrs: {
          username: 'tommy',
          password: 'tpass',
          email: 'tmcleroy@gmail.com',
          rep: 12036
        }
      },
      {
        name: 'jessica',
        attrs: {
          username: 'jessica',
          password: 'jpass',
          email: 'raf.rkl@gmail.com',
          rep: 9001
        }
      },
      {
        name: 'laika',
        attrs: {
          username: 'laika',
          password: 'lpass',
          email: 'laika@gmanfjfil.com',
          rep: 135
        }
      },
      {
        name: 'bob',
        attrs: {
          username: 'bob',
          password: 'bpass',
          email: 'bob@gmfjsdjail.com',
          rep: 653
        }
      },
      {
        name: 'jim',
        attrs: {
          username: 'jim',
          password: 'jpass',
          email: 'jim@gmjfifjail.com',
          rep: 139
        }
      },
      {
        name: 'john',
        attrs: {
          username: 'JohnCarmack',
          password: 'id',
          email: 'john@id.com',
          rep: 10600
        }
      },
      {
        name: 'richard',
        attrs: {
          username: 'richard_stallman',
          password: 'free',
          email: 'rich@stallman.org',
          rep: 780
        }
      }
    ]
  },
  {
    name: 'permission',
    model: models.Permission,
    instances: [
      {
        name: 'user',
        attrs: {
          name: 'user'
        }
      },
      {
        name: 'api',
        attrs: {
          name: 'api'
        }
      },
      {
        name: 'admin',
        attrs: {
          name: 'admin'
        }
      }
    ]
  }
];

module.exports = defs;
