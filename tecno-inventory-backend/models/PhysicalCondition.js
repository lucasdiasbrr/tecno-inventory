const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhysicalCondition = sequelize.define('PhysicalCondition', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PhysicalCondition;
