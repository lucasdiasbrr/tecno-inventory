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

// Rota para atualizar categoria
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar categoria' });
  }
});

// Rota para excluir categoria
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(204).json({ message: 'Categoria deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar categoria' });
  }
});

module.exports = router;
