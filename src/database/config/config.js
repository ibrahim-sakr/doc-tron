require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env')
});

module.exports = {
  "development": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "migrations"
  },
  "test": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "migrations"
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "migrations"
  }
};