const orderRouter = require('express').Router();
const { Order, LineItem, Product } = require('../db/models')

orderRouter.get('/:userId', (req, res, next) => {
    Order.findAll({ where: { userId: req.params.userId }})
        .then(orders => res.json(orders))
})

orderRouter.get('/singleOrder/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(next);
})

orderRouter.post('/', (req, res, next) => {
    console.log('$$$$$', req.body)
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
