const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Rota para adicionar fornecedor
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const supplier = await Supplier.create({ name });
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao adicionar fornecedor' });
  }
});

// Rota para listar fornecedores
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar fornecedores' });
  }
});

// Rota para atualizar fornecedor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const supplier = await Supplier.findByPk(id);
    if (supplier) {
      supplier.name = name;
      await supplier.save();
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar fornecedor' });
  }
});

// Rota para excluir fornecedor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (supplier) {
      await supplier.destroy();
      res.status(204).json({ message: 'Fornecedor deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar fornecedor' });
  }
});

module.exports = router;
