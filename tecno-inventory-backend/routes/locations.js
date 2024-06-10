const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Rota para adicionar localização
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const location = await Location.create({ name });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar localização' });
  }
});

// Rota para listar localizações
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar localizações' });
  }
});

// Rota para atualizar localização
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const location = await Location.findByPk(id);
    if (location) {
      location.name = name;
      await location.save();
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar localização' });
  }
});

// Rota para excluir localização
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id);
    if (location) {
      await location.destroy();
      res.status(204).json({ message: 'Localização deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar localização' });
  }
});

module.exports = router;
