const express = require('express');
const router = express.Router();
const State= require('../models/State');

// Rota para adicionar estado
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const state = await State.create({ name });
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar estado' });
  }
});

// Rota para listar estados
router.get('/', async (req, res) => {
  try {
    const states = await State.findAll();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar estados' });
  }
});

module.exports = router;
