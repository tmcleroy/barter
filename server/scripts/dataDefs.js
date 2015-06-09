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
          email: 'tmcleroy@gmail.com'
        }
      },
      {
        name: 'jessica',
        attrs: {
          username: 'jessica',
          password: 'jpass',
          email: 'raf.rkl@gmail.com'
        }
      },
      {
        name: 'laika',
        attrs: {
          username: 'laika',
          password: 'lpass',
          email: 'laika@gmail.com'
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
