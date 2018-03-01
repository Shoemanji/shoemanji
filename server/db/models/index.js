const User = require('./user')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')
const ProductOrderedQuantity = require('./productOrderedQuantity')

Review.belongsTo(User)
User.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(Product)
Product.hasMany(Review)

ProductOrderedQuantity.belongsTo(Product)
Product.hasMany(ProductOrderedQuantity)

// ProductOrderedQuantity.belongsTo(Order)
// Order.hasMany(ProductOrderedQuantity)

ProductOrderedQuantity.belongsToMany(Order, { through: 'OrderedProducts'})

module.exports = {
  User,
  Order,
  Review,
  Product,
  ProductOrderedQuantity
}
