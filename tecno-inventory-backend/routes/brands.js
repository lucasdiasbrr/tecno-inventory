const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar marca' });
  }
});

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar marcas' });
  }
});

module.exports = router;
