// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Brand = require('../models/Brand');
const Model = require('../models/Model');
const Category = require('../models/Category');
const Location = require('../models/Location');
const State = require('../models/State');
const Supplier = require('../models/Supplier');
const Responsible = require('../models/Responsible');
const PhysicalCondition = require('../models/PhysicalCondition');
const OperatingSystem = require('../models/OperatingSystem');
const TechnicalSpecification = require('../models/TechnicalSpecification');

// Rota para criar item
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar item', details: error.message });
  }
});

// Rota para listar itens
router.get('/', async (req, res) => {
  try {
    const includeDetails = req.query.includeDetails === 'true';
    const items = await Item.findAll({
      include: includeDetails ? [
        { model: Brand, as: 'brand' },
        { model: Model, as: 'model' },
        { model: Category, as: 'category' },
        { model: Location, as: 'location' },
        { model: State, as: 'state' },
        { model: Supplier, as: 'supplier' },
        { model: Responsible, as: 'responsible' },
        { model: PhysicalCondition, as: 'physicalCondition' },
        { model: OperatingSystem, as: 'operatingSystem' },
        { model: TechnicalSpecification, as: 'technicalSpecification' }
      ] : []
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar itens' });
  }
});

// Rota para atualizar item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.update(req.body);
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar item' });
  }
});

// Rota para deletar item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(204).json({ message: 'Item deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Item não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar item' });
  }
});

module.exports = router;
