const router = require('express').Router();

const userRouter = require('./users');
const productRouter = require('./products');
const reviewRouter = require('./reviews')

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/reviews', reviewRouter)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;

