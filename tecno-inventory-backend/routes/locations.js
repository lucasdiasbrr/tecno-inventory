const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Rota para adicionar localização
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const location = await Location.create({ name });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar localização' });
  }
});

// Rota para listar localizações
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar localizações' });
  }
});

module.exports = router;
