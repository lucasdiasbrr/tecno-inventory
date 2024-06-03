const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Rota para criação de item
router.post('/items', async (req, res) => {
  try {
    const { name, quantity, category } = req.body;
    const newItem = await Item.create({ name, quantity, category });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Rota para leitura de itens
router.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Rota para atualização de item
router.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, category } = req.body;
    const item = await Item.findByPk(id);
    if (item) {
      item.name = name;
      item.quantity = quantity;
      item.category = category;
      await item.save();
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Rota para exclusão de item
router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (item) {
      await item.destroy();
      res.status(204).json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
