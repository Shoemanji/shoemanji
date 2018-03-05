const orderRouter = require('express').Router();
const { Order, LineItem, Product } = require('../db/models')

orderRouter.get('/', (req, res, next) => {
  Order.findAll()
  .then(orders => res.json(orders))
})

orderRouter.get('/:userId', (req, res, next) => {
  Order.findAll({ where: { userId: req.params.userId } })
    .then(orders => res.json(orders))
})

orderRouter.get('/singleOrder/:id', (req, res, next) => {
  LineItem.findAll({
    where: { orderId: req.params.id },
    include: [{model: Product}, {model: Order}],
  })
    .then(lineItem => res.json(lineItem))
})

orderRouter.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      req.body.cart.forEach(cartRow => {
        LineItem.create({
          quantity: cartRow.quantity,
          priceAtPurchase: cartRow.product.price,
        })
        .then(lineItem => {
          return lineItem.setOrder(order)
          .then(() => {
            return Product.findById(cartRow.product.id)
            .then(product => {
              return lineItem.setProduct(product)
            })
            .then(() => {
              return Product.update({inventory: (cartRow.product.inventory - cartRow.quantity)}, {
                where: {
                  id: cartRow.product.id
                }
              })
            })
            .then(() => {
              res.status(200).json(order)
            })
          })
        })
      })
    })
    // .then(order => {
    //   res.status(200).json(order)
    // })
    .catch(next);
});

orderRouter.put('/:id', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(([updatedOrderRows, updatedOrder]) => {
    res.status(200).json(updatedOrder);
  })
  .catch(next);
})

module.exports = orderRouter; 
