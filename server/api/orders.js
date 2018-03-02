const orderRouter = require('express').Router();
const { Order } = require('../db/models')

orderRouter.get('/:id', (req, res, next) => {
    Order.findAll({where: {id: req.params.id}})
        .then(orders => res.json(orders))
})

module.exports = orderRouter; 