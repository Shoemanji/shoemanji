const Sequelize = require('sequelize');
const db = require('../db');

const Products = db.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.00,
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {

});

module.exports = Products;

// TODO: write class method maybe for inventory subtraction

// TODO: talk about possible instance  methods with group
