const express = require('express');
const router = express.Router();
const PhysicalCondition = require('../models/PhysicalCondition');

// Rota para adicionar condição física
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const physicalCondition = await PhysicalCondition.create({ name });
    res.status(201).json(physicalCondition);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar condição física' });
  }
});

// Rota para listar condições físicas
router.get('/', async (req, res) => {
  try {
    const physicalConditions = await PhysicalCondition.findAll();
    res.status(200).json(physicalConditions);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar condições físicas' });
  }
});

module.exports = router;
