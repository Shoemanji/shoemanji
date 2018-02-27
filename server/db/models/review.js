const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    text: {
        type: Sequelize.TEXT,
    },
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
    },
})

module.exports = Review;
