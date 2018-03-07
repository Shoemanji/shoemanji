const db = require('./server/db');
const { User, Product, Review, Order, LineItem } = require('./server/db/models');

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
    title: 'Wild Jordans',
    description: "Whether you're tearin' up the hardwood, burnin' up the dancefloor, or stompin' up the Subway steps, these flashy kicks are sure to earn you an audience.",
    price: 200.00,
    image: '/jordans600x393.jpg',
    inventory: 2,
    categories: ['sport']
  })
  const product2 = Product.create({
    title: 'Pumpernickel Loafers',
    description: "If you know what's good for you, you know that comfort is king.",
    price: 50.00,
    image: '/loafers600x393.jpg',
    inventory: 10,
    categories: ['casual']
  })
  const product3 = Product.create({
    title: 'Hip Boots',
    description: "Your local barista's latte art may not be good enough for your inner aesthete, but these boots sure are good enough for whatever Mama Weather throws your way.",
    price: 75.00,
    image: '/boots600x393.jpg',
    inventory: 10,
    categories: ['winter']
  })
  const product4 = Product.create({
    title: 'Flawless Pumps',
    description: "Dayum gurl, where'dju find those?!",
    price: 100.00,
    image: '/pumps600x393.jpg',
    inventory: 10,
    categories: ['heels']
  })
  return Promise.all([product1, product2, product3, product4])
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
      text: 'This shoe is comfortable enough for the price.',
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
      text: 'I cancelled this order as soon as I learned that this shoe was made in China...',
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
  const review4 = () => {
    return Review.create({
      text: 'This shoe keeps my socks nice and dry.',
      rating: 4,
    })
    .then(review => {
      return User.findById(3)
      .then(user => {
        return review.setUser(user);
      })
      .then(review => {
        return Product.findById(3)
        .then(product => {
          return review.setProduct(product)
        })
      })
    })
  }
  const review5 = () => {
    return Review.create({
      text: 'I get so many compliments when I wear these!',
      rating: 5,
    })
    .then(review => {
      return User.findById(3)
      .then(user => {
        return review.setUser(user);
      })
      .then(review => {
        return Product.findById(4)
        .then(product => {
          return review.setProduct(product)
        })
      })
    })
  }
  return Promise.all([review1(), review2(), review3(), review4(), review5()])
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
const order5 = () => {
  return Order.create({
    email: 'user2@gmail.com',
    shippingAddress: '2 User Lane',
    status: 'created',
  })
  .then(order => {
    return User.findById(2)
    .then(user => {
      return order.setUser(user)
    })
  })
}

  return Promise.all([order1(), order2(), order3(), order4(), order5()])
}

function generateLineItems () {
  const lineItem1 = () => {
    return LineItem.create({
      quantity: 1,
      priceAtPurchase: 200
    })
    .then(lineItem => {
      return Product.findById(1)
      .then(product => {
        return lineItem.setProduct(product)
      })
      .then(lineItem => {
        return Order.findById(1)
        .then(order => {
          return lineItem.setOrder(order);
        })
      })
    })
  }
  const lineItem2 = () => {
    return LineItem.create({
      quantity: 1,
      priceAtPurchase: 200
    })
    .then(lineItem => {
      return Product.findById(1)
      .then(product => {
        return lineItem.setProduct(product)
      })
      .then(lineItem => {
        return Order.findById(2)
        .then(order => {
          return lineItem.setOrder(order);
        })
      })
    })
  }
  const lineItem3 = () => {
    return LineItem.create({
      quantity: 1,
      priceAtPurchase: 50
    })
    .then(lineItem => {
      return Product.findById(2)
      .then(product => {
        return lineItem.setProduct(product)
      })
    })
    .then(lineItem => {
      return Order.findById(3)
      .then(order => {
        return lineItem.setOrder(order);
      })
    })
  }
  const lineItem4 = () => {
    return LineItem.create({
      quantity: 4,
      priceAtPurchase: 75
    })
    .then(lineItem => {
      return Product.findById(3)
      .then(product => {
        return lineItem.setProduct(product)
      })
    })
    .then(lineItem => {
      return Order.findById(4)
      .then(order => {
        return lineItem.setOrder(order);
      })
    })
  }
  const lineItem5 = () => {
    return LineItem.create({
      quantity: 2,
      priceAtPurchase: 50
    })
    .then(lineItem => {
      return Product.findById(2)
      .then(product => {
        return lineItem.setProduct(product)
      })
    })
    .then(lineItem => {
      return Order.findById(1)
      .then(order => {
        return lineItem.setOrder(order);
      })
    })
  }
  const lineItem6 = () => {
    return LineItem.create({
      quantity: 1,
      priceAtPurchase: 75
    })
    .then(lineItem => {
      return Product.findById(3)
      .then(product => {
        return lineItem.setProduct(product)
      })
    })
    .then(lineItem => {
      return Order.findById(5)
      .then(order => {
        return lineItem.setOrder(order);
      })
    })
  }
  const lineItem7 = () => {
    return LineItem.create({
      quantity: 1,
      priceAtPurchase: 100
    })
    .then(lineItem => {
      return Product.findById(2)
      .then(product => {
        return lineItem.setProduct(product)
      })
    })
    .then(lineItem => {
      return Order.findById(5)
      .then(order => {
        return lineItem.setOrder(order);
      })
    })
  }
  return Promise.all([lineItem1(), lineItem2(), lineItem3(), lineItem4(), lineItem5(), lineItem6(), lineItem7()])
}

db.sync({force: true})
  .then(() => {
    console.log('Seeding users and products')
    return Promise.all([
      generateUsers(),
      generateProducts()
    ])
  })
  .then(() => {
    console.log('Seeding reviews and orders')
    return Promise.all([
      generateReviews(),
      generateOrders()
    ])
  })
  .then(() => {
    console.log('Seeding line items')
    return generateLineItems()
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
