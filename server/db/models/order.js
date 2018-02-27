const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    items: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    shippingAddress: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        },
    },
});

module.exports = Order;
