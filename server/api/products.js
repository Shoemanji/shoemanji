const productRouter = require('express').Router();
const { Products } = require('../db/models');

// GET /products
productRouter.get('/', (req, res, next) => {
  Products.findAll({

  })
  .then(products => res.json(products))
  .catch(next);
});

module.exports = productRouter;
