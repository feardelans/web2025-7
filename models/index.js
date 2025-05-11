const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
	logging: false
  }
);

// Підключення моделей
const Device = require('./device')(sequelize, DataTypes);

// Додати інші моделі за потреби, напр., User
// const User = require('./user')(sequelize, DataTypes);

const User = require('./user')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Device,
  User
};
