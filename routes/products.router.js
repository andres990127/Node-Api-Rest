const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
  const products = service.find();
  res.send(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.send(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).send(service.create(body));
})

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  res.send(service.update(id, body));
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.json(service.delete(id));
})

module.exports = router;

