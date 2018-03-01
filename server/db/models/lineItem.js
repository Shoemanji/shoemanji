const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 4,
    }
  }
})

module.exports = LineItem;
