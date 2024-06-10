// routes/technicalSpecifications.js
const express = require('express');
const router = express.Router();
const TechnicalSpecification = require('../models/TechnicalSpecification');

// Rota para adicionar especificação técnica
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    const technicalSpecification = await TechnicalSpecification.create({ name });
    res.status(201).json(technicalSpecification);
  } catch (error) {
    console.error('Erro ao adicionar especificação técnica:', error);
    res.status(500).json({ error: 'Falha ao adicionar especificação técnica' });
  }
});

// Rota para listar especificações técnicas
router.get('/', async (req, res) => {
  try {
    const technicalSpecifications = await TechnicalSpecification.findAll();
    res.status(200).json(technicalSpecifications);
  } catch (error) {
    console.error('Erro ao buscar especificações técnicas:', error);
    res.status(500).json({ error: 'Falha ao buscar especificações técnicas' });
  }
});

// Rota para atualizar especificação técnica
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const technicalSpecification = await TechnicalSpecification.findByPk(id);
    if (technicalSpecification) {
      technicalSpecification.name = name;
      await technicalSpecification.save();
      res.status(200).json(technicalSpecification);
    } else {
      res.status(404).json({ error: 'Especificação técnica não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar especificação técnica:', error);
    res.status(500).json({ error: 'Falha ao atualizar especificação técnica' });
  }
});

// Rota para excluir especificação técnica
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const technicalSpecification = await TechnicalSpecification.findByPk(id);
    if (technicalSpecification) {
      await technicalSpecification.destroy();
      res.status(204).json({ message: 'Especificação técnica deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Especificação técnica não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar especificação técnica:', error);
    res.status(500).json({ error: 'Falha ao deletar especificação técnica' });
  }
});

module.exports = router;
