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
  const review1 = () => {
    return Review.create({
      text: 'This shoe helped me dunk!',
      rating: 5,
    })
    .then(review => {
      return User.findById(1)
      .then(user => {
        return review.setUser(user);
      })
      .then(review => {
        return Product.findById(1)
        .then(product => {
          return review.setProduct(product)
        })
      })
    })
  }

  const review2 = () => {
    return Review.create({
      text: 'This shoe is sort of comfortable...',
      rating: 3,
    })
    .then(review => {
      return User.findById(2)
      .then(user => {
        return review.setUser(user);
      })
      .then(review => {
        return Product.findById(2)
        .then(product => {
          return review.setProduct(product)
        })
      })
    })
  }

  const review3 = () => {
    return Review.create({
      text: 'This shoe was made in China!',
      rating: 1,
    })
    .then(review => {
      return User.findById(3)
      .then(user => {
        return review.setUser(user);
      })
      .then(review => {
        return Product.findById(1)
        .then(product => {
          return review.setProduct(product)
        })
      })
    })
  }
  return Promise.all([review1(), review2(), review3()])
}

function generateOrders () {
  const order1 = () => {
    return Order.create({
      email: 'user1@gmail.com',
      shippingAddress: '1 User Lane',
      status: 'created',
    })
    .then(order => {
      return User.findById(1)
      .then(user => {
        return order.setUser(user)
      })
    })
  }

  const order2 = () => {
    return Order.create({
      email: 'user2@gmail.com',
      shippingAddress: '2 User Lane',
      status: 'processing',
    })
    .then(order => {
      return User.findById(2)
      .then(user => {
        return order.setUser(user)
      })
    })
  }

  const order3 = () => {
    return Order.create({
      email: 'user3@gmail.com',
      shippingAddress: '3 User Lane',
      status: 'cancelled',
    })
    .then(order => {
      return User.findById(3)
      .then(user => {
        return order.setUser(user)
      })
    })
  }

  const order4 = () => {
    return Order.create({
    email: 'guest@gmail.com',
    shippingAddress: '1 Guest Street',
    status: 'created'
  })
}

  return Promise.all([order1(), order2(), order3(), order4()])
}

function generateProductOrderedQuantities () {
  const poq1 = () => {
    return ProductOrderedQuantity.create({
      quantity: 1
    })
    .then(poq => {
      return Product.findById(1)
      .then(product => {
        return poq.setProduct(product)
      })
      .then(poq => {
        return Order.findById(1)
        .then(order => {
          return poq.addOrder(order);
        })
      })
    })
  }

  const poq2 = () => {
    return ProductOrderedQuantity.create({
      quantity: 1
    })
    .then(poq => {
      return Product.findById(1)
      .then(product => {
        return poq.setProduct(product)
      })
      .then(poq => {
        return Order.findById(2)
        .then(order => {
          return poq.addOrder(order);
        })
      })
    })
  }

  const poq3 = () => {
    return ProductOrderedQuantity.create({
      quantity: 1
    })
    .then(poq => {
      return Product.findById(2)
      .then(product => {
        return poq.setProduct(product)
      })
    })
    .then(poq => {
      return Order.findById(3)
      .then(order => {
        return poq.addOrder(order);
      })
    })
  }

  const poq4 = () => {
    return ProductOrderedQuantity.create({
      quantity: 4
    })
    .then(poq => {
      return Product.findById(3)
      .then(product => {
        return poq.setProduct(product)
      })
    })
    .then(poq => {
      return Order.findById(4)
      .then(order => {
        return poq.addOrder(order);
      })
    })
  }

  const poq5 = () => {
    return ProductOrderedQuantity.create({
      quantity: 2
    })
    .then(poq => {
      return Product.findById(2)
      .then(product => {
        return poq.setProduct(product)
      })
    })
    .then(poq => {
      return Order.findById(1)
      .then(order => {
        return poq.addOrder(order);
      })
    })
  }

  return Promise.all([poq1(), poq2(), poq3(), poq4(), poq5()])
}

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return Promise.all([
      generateUsers(),
      generateProducts(),
      generateProductOrderedQuantities(),
      generateReviews(),
      generateOrders(),
    ])
  })
  .then(() => {
    console.log('Seeding successful')
    db.close();
    return null;
  })
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
