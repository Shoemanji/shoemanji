const Sequelize = require('sequelize');
const db = require('../db');

const ProductOrderedQuantity = db.define('productOrderedQuantity', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 4,
    }
  }
})

module.exports = ProductOrderedQuantity;
