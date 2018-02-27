const User = require('./user')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')

Review.belongsTo(User)
Order.belongsTo(User)
User.hasMany(Review)
User.hasMany(Order)

Review.belongsTo(Product)
Product.hasMany(Review)

Product.belongsToMany(Order, { through: 'OrderedProducts' })

module.exports = {
  User,
  Order,
  Review,
  Product,
}
