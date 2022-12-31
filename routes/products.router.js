const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.send(products);
  } catch (error) {
    res.status(500).json({
      "message": error
    })
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'),  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  res.status(201).send(await service.create(body));
})

router.patch('/:id', validatorHandler(getProductSchema, 'params'),  validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    res.send(await service.update(id, body));
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    res.json(await service.delete(id));
  } catch (error) {
    next(error);
  }
})

module.exports = router;

