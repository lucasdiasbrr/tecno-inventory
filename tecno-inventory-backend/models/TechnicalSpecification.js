const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TechnicalSpecification = sequelize.define('TechnicalSpecification', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = TechnicalSpecification;
