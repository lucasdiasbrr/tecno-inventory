const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tecno-inventory-db', 'postgres', 'lucas123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
