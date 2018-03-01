const Sequelize = require('sequelize');
const db = require('../db');

const QuantityHavingOrder = db.define('quantityhavingorder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 4,
    }
  }
})

module.exports = QuantityHavingOrder;
