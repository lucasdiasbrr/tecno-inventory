const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OperatingSystem = sequelize.define('OperatingSystem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = OperatingSystem;
