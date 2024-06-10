const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assetCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  additionalNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lastMaintenanceDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  nextMaintenanceDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responsibleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  physicalConditionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  operatingSystemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  technicalSpecificationId: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Update this to allow null
  }
});

module.exports = Item;
