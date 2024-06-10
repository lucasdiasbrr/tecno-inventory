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

// Rota para atualizar condição física
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const physicalCondition = await PhysicalCondition.findByPk(id);
    if (physicalCondition) {
      physicalCondition.name = name;
      await physicalCondition.save();
      res.status(200).json(physicalCondition);
    } else {
      res.status(404).json({ error: 'Condição física não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar condição física' });
  }
});

// Rota para excluir condição física
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const physicalCondition = await PhysicalCondition.findByPk(id);
    if (physicalCondition) {
      await physicalCondition.destroy();
      res.status(204).json({ message: 'Condição física deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Condição física não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar condição física' });
  }
});

module.exports = router;
