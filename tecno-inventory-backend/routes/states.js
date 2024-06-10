const express = require('express');
const router = express.Router();
const State = require('../models/State');

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

// Rota para atualizar estado
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const state = await State.findByPk(id);
    if (state) {
      state.name = name;
      await state.save();
      res.status(200).json(state);
    } else {
      res.status(404).json({ error: 'Estado não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar estado' });
  }
});

// Rota para excluir estado
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);
    if (state) {
      await state.destroy();
      res.status(204).json({ message: 'Estado deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Estado não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar estado' });
  }
});

module.exports = router;
