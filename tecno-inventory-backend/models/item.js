// models/Item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Brand = require('./Brand');
const Model = require('./Model');
const Category = require('./Category');
const Location = require('./Location');
const State = require('./State');
const Supplier = require('./Supplier');
const Responsible = require('./Responsible');
const PhysicalCondition = require('./PhysicalCondition');
const OperatingSystem = require('./OperatingSystem');
const TechnicalSpecification = require('./TechnicalSpecification');

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
    allowNull: true,
  }
});

// Definir associações com aliases
Item.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' });
Item.belongsTo(Model, { foreignKey: 'modelId', as: 'model' });
Item.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Item.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });
Item.belongsTo(State, { foreignKey: 'stateId', as: 'state' });
Item.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Item.belongsTo(Responsible, { foreignKey: 'responsibleId', as: 'responsible' });
Item.belongsTo(PhysicalCondition, { foreignKey: 'physicalConditionId', as: 'physicalCondition' });
Item.belongsTo(OperatingSystem, { foreignKey: 'operatingSystemId', as: 'operatingSystem' });
Item.belongsTo(TechnicalSpecification, { foreignKey: 'technicalSpecificationId', as: 'technicalSpecification' });

module.exports = Item;
