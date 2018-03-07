const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
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
      min: 0.01,
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.imgur.com/pXes8hO.jpg',
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    }
  },
  size: {
    type: Sequelize.STRING,
    defaultValue: '7'
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});

Product.prototype.updateInventory = function(quantity) {
  const oldInventory = this.getDataValue('inventory');
  const newInventory = oldInventory - quantity;
  this.setDataValue('inventory', newInventory);
}

module.exports = Product;
