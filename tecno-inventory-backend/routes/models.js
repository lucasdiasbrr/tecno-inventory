const express = require('express');
const router = express.Router();
const Model = require('../models/model');

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const model = await Model.create({ name });
    res.status(201).json(model);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar modelo' });
  }
});

router.get('/', async (req, res) => {
  try {
    const models = await Model.findAll();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar modelos' });
  }
});

module.exports = router;
