const router = require('express').Router();

const userRouter = require('./users');
const productRouter = require('./products');
const reviewRouter = require('./reviews');
const orderRouter = require('./orders');
const emailRouter = require('./email-router');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/reviews', reviewRouter);
router.use('/orders', orderRouter);
router.use('/sendmail', emailRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;

