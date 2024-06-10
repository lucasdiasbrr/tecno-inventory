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

// Rota para atualizar responsável
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const responsible = await Responsible.findByPk(id);
    if (responsible) {
      responsible.name = name;
      await responsible.save();
      res.status(200).json(responsible);
    } else {
      res.status(404).json({ error: 'Responsável não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar responsável' });
  }
});

// Rota para excluir responsável
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const responsible = await Responsible.findByPk(id);
    if (responsible) {
      await responsible.destroy();
      res.status(204).json({ message: 'Responsável deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Responsável não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar responsável' });
  }
});

module.exports = router;
