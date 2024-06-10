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

// Rota para atualizar sistema operacional
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const operatingSystem = await OperatingSystem.findByPk(id);
    if (operatingSystem) {
      operatingSystem.name = name;
      await operatingSystem.save();
      res.status(200).json(operatingSystem);
    } else {
      res.status(404).json({ error: 'Sistema operacional não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar sistema operacional' });
  }
});

// Rota para excluir sistema operacional
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const operatingSystem = await OperatingSystem.findByPk(id);
    if (operatingSystem) {
      await operatingSystem.destroy();
      res.status(204).json({ message: 'Sistema operacional deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Sistema operacional não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar sistema operacional' });
  }
});

module.exports = router;
