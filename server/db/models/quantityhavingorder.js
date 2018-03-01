const Sequelize = require('sequelize');
const db = require('../db');

// Maybe LineItem?
const QuantityHavingOrder = db.define('quantityhavingorder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 4,
    }
  },
  // Price at time of purchase
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.01,
    }
  }
})

QuantityHavingOrder.prototype.getPrice = function() {
  return this.price || (await this.getProduct()).price
}

module.exports = QuantityHavingOrder;
