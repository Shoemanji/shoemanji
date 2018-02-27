const productRouter = require('express').Router();
const { Product } = require('../db/models');

// GET /products
productRouter.get('/', (req, res, next) => {
  Product.findAll({

  })
  .then(products => res.json(products))
  .catch(next);
});
productRouter.get('/:id', (req, res, next)=> {
  Product.findById(req.params.id)
  .then(id => res.json(id))
  .catch(next);
})

module.exports = productRouter;
