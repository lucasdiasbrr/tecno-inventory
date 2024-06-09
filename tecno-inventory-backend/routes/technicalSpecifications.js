const express = require('express');
const router = express.Router();
const TechnicalSpecification = require('../models/TechnicalSpecification');

// Rota para adicionar especificação técnica
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const technicalSpecification = await TechnicalSpecification.create({ name });
    res.status(201).json(technicalSpecification);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar especificação técnica' });
  }
});

// Rota para listar especificações técnicas
router.get('/', async (req, res) => {
  try {
    const technicalSpecifications = await TechnicalSpecification.findAll();
    res.status(200).json(technicalSpecifications);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar especificações técnicas' });
  }
});

module.exports = router;
