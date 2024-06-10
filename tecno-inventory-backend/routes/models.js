const express = require('express');
const router = express.Router();
const Model = require('../models/model');

// Rota para criação de modelo
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newModel = await Model.create({ name });
    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar o modelo' });
  }
});

// Rota para leitura de modelos
router.get('/', async (req, res) => {
  try {
    const models = await Model.findAll();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar modelos' });
  }
});

// Rota para atualização de modelo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const model = await Model.findByPk(id);
    if (model) {
      model.name = name;
      await model.save();
      res.status(200).json(model);
    } else {
      res.status(404).json({ error: 'Modelo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar o modelo' });
  }
});

// Rota para exclusão de modelo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findByPk(id);
    if (model) {
      await model.destroy();
      res.status(204).json({ message: 'Modelo deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Modelo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar o modelo' });
  }
});

module.exports = router;
