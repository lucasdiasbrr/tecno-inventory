const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Rota para criação de marca
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newBrand = await Brand.create({ name });
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar a marca' });
  }
});

// Rota para leitura de marcas
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar marcas' });
  }
});

// Rota para atualização de marca
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.findByPk(id);
    if (brand) {
      brand.name = name;
      await brand.save();
      res.status(200).json(brand);
    } else {
      res.status(404).json({ error: 'Marca não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar a marca' });
  }
});

// Rota para exclusão de marca
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (brand) {
      await brand.destroy();
      res.status(204).json({ message: 'Marca deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Marca não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar a marca' });
  }
});

module.exports = router;
