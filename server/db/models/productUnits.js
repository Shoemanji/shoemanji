const Sequelize = require('sequelize');
const db = require('../db');

const ProductUnits = db.define('productunits', {
  quantity: {
      type: Sequelize.INTEGER,
  }
});

module.exports = ProductUnits;

// TODO: write class method maybe for inventory subtraction

// TODO: talk about possible instance  methods with group
