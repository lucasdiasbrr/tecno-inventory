const express = require('express');
const router = express.Router();
const Responsible = require('../models/Responsible');

// Rota para adicionar responsável
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const responsible = await Responsible.create({ name });
    res.status(201).json(responsible);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar responsável' });
  }
});

// Rota para listar responsáveis
router.get('/', async (req, res) => {
  try {
    const responsibles = await Responsible.findAll();
    res.status(200).json(responsibles);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar responsáveis' });
  }
});

module.exports = router;
