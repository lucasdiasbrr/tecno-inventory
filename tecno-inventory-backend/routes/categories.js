const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Rota para adicionar categoria
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar categoria' });
  }
});

// Rota para listar categorias
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar categorias' });
  }
});

module.exports = router;
