const orderRouter = require('express').Router();
const { Order, LineItem, Product } = require('../db/models');

orderRouter.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => {
    req.body.cart.forEach(cartRow => {
      LineItem.create({
        quantity: cartRow.quantity,
      })
      .then(lineItem => {
        return lineItem.setOrder(order)
        .then(() => {
          return Product.findById(cartRow.product.id)
          .then(product => {
            return lineItem.setProduct(product)
          })
        })
      })
    })
  })
  .then(order => res.json(order))
  .catch(next);
});

module.exports = orderRouter;
