const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('Model', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Model;
