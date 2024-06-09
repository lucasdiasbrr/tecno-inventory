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

module.exports = router;