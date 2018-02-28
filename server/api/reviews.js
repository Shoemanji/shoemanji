const reviewRouter = require('express').Router();
const { Review } = require('../db/models');

reviewRouter.get('/', (req, res, next) => {
  Review.findAll()
  .then(reviews => res.json(reviews))
  .catch(next);
});

reviewRouter.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
  .then(id => res.json(id))
  .catch(next);
})

module.exports = reviewRouter;
