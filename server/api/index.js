const router = require('express').Router();

const userRouter = require('./users');
const productRouter = require('./products');


router.use('/users', userRouter);
router.use('/products', productRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router;

// testing pro-new
