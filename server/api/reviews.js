const reviewRouter = require('express').Router();
const { Review, User } = require('../db/models');

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

reviewRouter.get('/', (req, res, next) => {
  Review.findAll({
    include: [{model: User}]
  })
  .then(reviews => res.json(reviews))
  .catch(next);
});

reviewRouter.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
  .then(id => res.json(id))
  .catch(next);
})

reviewRouter.get('/user/:id', (req, res, next) => {
  Review.findAll({
    where: { userId: req.params.id } })
    .then(reviews => res.json(reviews))
})

reviewRouter.post('/', isLoggedIn, (req, res, next) => {
  console.log(req.body)
  Review.create(req.body)
  .then(instance => res.json(instance))
  .catch(next);
})

module.exports = reviewRouter;

// .then(review => {
//   return User.findById(1)
//   .then(user => {
//     return review.setUser(user);
//   })