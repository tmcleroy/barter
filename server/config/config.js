module.exports = {
  development: {
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: 'postgres',
    username: process.env.DB_USER_DEV,
    database: process.env.DB_NAME_DEV
  },
  production: {
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: 'postgres',
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_NAME_PROD,
    dialectOptions: {
      ssl: true
    }
  }
};
