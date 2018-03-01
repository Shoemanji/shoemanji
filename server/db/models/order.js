const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    placedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        },
    },
    shippingAddress: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    }
});


Order.prototype.getTotal = async function() {
    const lines = LineItem.findAll({where: {orderId: this.id}})
    return lines.reduce(async (total, line) =>
        total + await this.getPrice(),
        0
    )
}

module.exports = Order;
