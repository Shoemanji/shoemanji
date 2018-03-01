const User = require('./user')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')
const QuantityHavingOrder = require('./quantityhavingorder')

Review.belongsTo(User)
User.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(Product)
Product.hasMany(Review)

QuantityHavingOrder.belongsTo(Product)
Product.hasMany(QuantityHavingOrder)

QuantityHavingOrder.belongsTo(Order)
Order.hasMany(QuantityHavingOrder)

module.exports = {
  User,
  Order,
  Review,
  Product,
  QuantityHavingOrder
}
