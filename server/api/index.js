const router = require('express').Router();

const userRouter = require('./users');
const productRouter = require('./products');

module.exports = {
  router,
}

router.use('/users', userRouter);
router.use('/products', productRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// testing pro-new
