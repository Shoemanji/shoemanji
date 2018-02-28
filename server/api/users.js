const userRouter = require('express').Router();
const { User } = require('../db/models');

// GET /users
userRouter.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
  .then(users => res.json(users))
  .catch(next);
});

module.exports = userRouter;
