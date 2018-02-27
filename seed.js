const db = require('./server/db')
const { User, Product, Review, Order, ProductOrderedQuantity } = require('./server/db/models');

function generateUsers () {
  const user1 = User.create({
    email: 'user1@gmail.com',
    password: 'user1',
    googleId: 'user1',
    isAdmin: true,
    shippingAddress: '1 User Lane'
  })
  const user2 = User.create({
    email: 'user2@gmail.com',
    password: 'user2',
    googleId: 'user2',
    isAdmin: false,
    shippingAddress: '2 User Lane'
  })
  const user3 = User.create({
    email: 'user3@gmail.com',
    password: 'user3',
    googleId: 'user3',
    isAdmin: false,
    shippingAddress: '3 User Lane'
  })
  return Promise.all([user1, user2, user3])
}

function generateProducts () {
  const product1 = Product.create({
    title: 'Sky Jordan',
    description: 'Flashy Bizness',
    price: 180.00,
    inventory: 2,
    category: 'sport'
  })
  const product2 = Product.create({
    title: 'Grandpa Loafer',
    description: 'Comfort is King',
    price: 70.00,
    inventory: 40,
    category: 'casual'
  })
  const product3 = Product.create({
    title: 'Budget Bootsies',
    description: 'Good Enough For Any Weather',
    price: 30.00,
    inventory: 8,
    category: 'winter'
  })
  return Promise.all([product1, product2, product3])
}

function generateReviews () {
  const review1 = Review.create({
    text: 'This shoe helped me dunk!',
    rating: 5,
    // userId: 1,
    // productId: 1
  })
  .then( (review) => {
    User.findById(1)
    .then( (user) => {
      review.addUser(user)
    })
  })

  const review2 = Review.create({
    text: 'This shoe is sort of comfortable...',
    rating: 3,
    // userId: 2,
    // productId: 2
  })
  const review3 = Review.create({
    text: 'This shoe was made in China!',
    rating: 1,
    // userId: 3,
    // productId: 1
  })
  return Promise.all([review1, review2, review3])
}

function generateProductOrderedQuantities () {
  const poq1 = ProductOrderedQuantity.create({
    // productId: 1,
    quantity: 1
  })
  const poq2 = ProductOrderedQuantity.create({
    // productId: 1,
    quantity: 1
  })
  const poq3 = ProductOrderedQuantity.create({
    // productId: 2,
    quantity: 1
  })
  const poq4 = ProductOrderedQuantity.create({
    // productId: 3,
    quantity: 4
  })
  return Promise.all([poq1, poq2, poq3, poq4])
}

function generateOrders () {
  const order1 = Order.create({
    email: 'user1@gmail.com',
    shippingAddress: '1 User Lane',
    status: 'created',
    // userId: 1
  })
  const order2 = Order.create({
    email: 'user2@gmail.com',
    shippingAddress: '2 User Lane',
    status: 'processing',
    // userId: 2
  })
  const order3 = Order.create({
    email: 'user3@gmail.com',
    shippingAddress: '3 User Lane',
    status: 'cancelled',
    // userId: 3
  })
  const order4 = Order.create({
    email: 'user1@gmail.com',
    shippingAddress: '1 User Lane',
    status: 'completed',
    // userId: 1
  })
  const order5 = Order.create({
    email: 'user2@gmail.com',
    shippingAddress: '2 User Lane',
    status: 'completed',
    // userId: 2
  })
  const order6 = Order.create({
    email: 'user3@gmail.com',
    shippingAddress: '3 User Lane',
    status: 'completed',
    // userId: 3
  })
  const order7 = Order.create({
    email: 'guest@gmail.com',
    shippingAddress: '1 Guest Street',
    status: 'created'
  })
  return Promise.all([order1, order2, order3, order4, order5, order6, order7])
}

function seed () {
  return Promise.all([generateUsers(),
  generateProducts(),
  generateReviews(),
  generateProductOrderedQuantities(),
  generateOrders()])
}

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
