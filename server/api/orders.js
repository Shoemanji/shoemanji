const orderRouter = require('express').Router();
const { Order } = require('../db/models')

orderRouter.get('/:userId', (req, res, next) => {
    console.log('BODY', req.params);
    Order.findAll({ where: { userId: req.params.userId }})
        .then(orders => res.json(orders))
})

orderRouter.get('/singleOrder/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(next);
})

module.exports = orderRouter; 
