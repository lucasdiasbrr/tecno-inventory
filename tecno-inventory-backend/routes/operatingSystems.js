const express = require('express');
const router = express.Router();
const OperatingSystem = require('../models/OperatingSystem');

// Rota para adicionar sistema operacional
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const operatingSystem = await OperatingSystem.create({ name });
    res.status(201).json(operatingSystem);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar sistema operacional' });
  }
});

// Rota para listar sistemas operacionais
router.get('/', async (req, res) => {
  try {
    const operatingSystems = await OperatingSystem.findAll();
    res.status(200).json(operatingSystems);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar sistemas operacionais' });
  }
});

module.exports = router;
