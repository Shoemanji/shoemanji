const User = require('./user')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')
const LineItem = require('./lineItem')

Review.belongsTo(User)
User.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(Product)
Product.hasMany(Review)

LineItem.belongsTo(Product)
Product.hasMany(LineItem)

LineItem.belongsTo(Order)
Order.hasMany(LineItem)

module.exports = {
  User,
  Order,
  Review,
  Product,
  LineItem
}
