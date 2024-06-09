const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Responsible = sequelize.define('Responsible', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Responsible;
