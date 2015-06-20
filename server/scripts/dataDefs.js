var models = require('../models');

module.exports = [
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
  },
  {
    name: 'skill',
    model: models.Skill,
    instances: [
      {
        name: 'javascript',
        attrs: {
          name: 'javascript'
        }
      },
      {
        name: 'ruby',
        attrs: {
          name: 'ruby'
        }
      },
      {
        name: 'java',
        attrs: {
          name: 'java'
        }
      },
      {
        name: 'cpp',
        attrs: {
          name: 'c++'
        }
      },
      {
        name: 'css',
        attrs: {
          name: 'css'
        }
      }
    ]
  },
  {
    name: 'tag',
    model: models.Tag,
    instances: [
      {
        name: 'algorithm',
        attrs: {
          name: 'algorithm'
        }
      },
      {
        name: 'database query',
        attrs: {
          name: 'database query'
        }
      },
      {
        name: 'regex',
        attrs: {
          name: 'regex'
        }
      },
      {
        name: 'fxn',
        attrs: {
          name: 'function'
        }
      }
    ]
  }
];
