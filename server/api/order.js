const orderRouter = require('express').Router();
const { Order } = require('../db/models');

orderRouter.post('/', (req, res, next) => {
  console.log('BODY', req.body);
  Order.create(req.body)
  .then(order => res.json(order))
  .catch(next);
});

module.exports = orderRouter;
